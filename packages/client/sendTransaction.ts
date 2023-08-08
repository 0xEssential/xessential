import {
  Account,
  BaseError,
  Client,
  Hash,
  SendTransactionParameters,
  SendTransactionReturnType,
  TransactionRequest,
  TransactionSerializable,
  Transport,
  createPublicClient,
  http,
} from "viem";
import { Chain } from "viem/chains";
import { getChainId } from "viem/public";

import {
  assertRequest,
  assertCurrentChain,
  extract,
  formatTransactionRequest,
  getTransactionError,
  parseAccount,
  prepareRequest,
} from "viem/utils";

import forwarderContractConfig from "./abi/EssentialForwarder";

export type CustomSendTransactionParameters = SendTransactionParameters & {
  proof?: string;
  from?: string;
};

/**
 * Creates, signs, and sends a new transaction to the network.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/sendTransaction.html
 * - Examples: https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/transactions/sending-transactions
 * - JSON-RPC Methods:
 *   - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
 *   - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
 *
 * @param client - Client to use
 * @param parameters - {@link SendTransactionParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms.html#transaction) hash. {@link SendTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const hash = await sendTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { sendTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const hash = await sendTransaction(client, {
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 */
export async function sendTransaction<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined
>(
  client: Client<Transport, TChain, TAccount>,
  args: CustomSendTransactionParameters
): Promise<SendTransactionReturnType> {
  const {
    account: account_ = client.account,
    chain = client.chain,
    accessList,
    data,
    from,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    proof,
    to,
    value,
    ...rest
  } = args;

  if (!account_) throw new BaseError("Account not found");
  const account = parseAccount(account_);

  try {
    assertRequest(args);

    let chainId;
    if (chain !== null) {
      chainId = await getChainId(client);
      assertCurrentChain({
        currentChainId: chainId,
        chain,
      });
    }

    if (account.type === "local") {
      // Prepare the request for signing (assign appropriate fees, etc.)
      const request = await prepareRequest(client, {
        account,
        accessList,
        chain,
        data,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        to,
        value,
        ...rest,
      });

      if (!chainId) chainId = await getChainId(client);

      const serializer = chain?.serializers?.transaction;

      const signedRequest = (await account.signTransaction(
        {
          ...request,
          chainId,
        } as TransactionSerializable,
        { serializer }
      )) as Hash;
      return await client.request({
        method: "eth_sendRawTransaction",
        params: [signedRequest],
      });
    }

    const readClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: client.chain,
      transport: http(),
    });

    const forwarderNonce = await readClient.readContract({
      ...forwarderContractConfig,
      functionName: "getNonce",
      args: [account.address],
    });

    const format =
      chain?.formatters?.transactionRequest?.format || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format }),
      accessList,
      data,
      from: account.address,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value,
    } as TransactionRequest);
    return await client.request({
      method: "eth_sendTransaction",
      params: [request],
    });
  } catch (err) {
    throw getTransactionError(err as BaseError, {
      ...args,
      account,
      chain: args.chain || undefined,
    });
  }
}
