import {
  Account,
  Address,
  ParseAccount,
  SendTransactionParameters,
  Transport,
  WalletClient,
  WalletClientConfig,
  createClient,
  walletActions,
} from "viem";
import { Chain } from "viem/chains";

export function createEssentialClient<
  TTransport extends Transport,
  TChain extends Chain | undefined = undefined,
  TAccountOrAddress extends Account | Address | undefined = undefined
>({
  account,
  chain,
  transport,
  key = "wallet",
  name = "Essential Client",
  pollingInterval,
}: WalletClientConfig<TTransport, TChain, TAccountOrAddress>): WalletClient<
  TTransport,
  TChain,
  ParseAccount<TAccountOrAddress>
> {
  return createClient({
    account,
    chain,
    key,
    name,
    pollingInterval,
    transport: (opts) => transport({ ...opts, retryCount: 0 }),
    type: "walletClient",
  }).extend((client) => ({
    ...walletActions(client),
    sendTransaction: async (
      args: SendTransactionParameters<TChain, Account, Chain> & {
        proof?: string;
      }
    ) => {
      if (args?.proof) {
        return this.connectedSigner instanceof Signer
          ? this.connectedSigner.sendTransaction({
              to: this.forwarder.address,
              data: args.proof,
            })
          : this.connectedSigner.sponsorTransaction(
              this.forwarder.address,
              args.proof
            );
      }

      const _signer = this.privateKey || this.provider;

      if (!_signer) return;
      const result = await signMetaTxRequest(
        _signer,
        args as ForwardRequestInput,
        this.forwarder,
        this.domainName
      );

      this.onSubmit && this.onSubmit();

      const txResult = await fetch(this.relayerUri, {
        method: "POST",
        body: JSON.stringify({
          ...result,
          forwarder: {
            address: this.forwarder.address,
            abi,
          },
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          if (resp.status === 500) {
            throw new Error("Relayer API Error");
          } else {
            return resp.json();
          }
        })
        .then(({ result, status }) => {
          if (status === "success") {
            return JSON.parse(result);
          }
        });

      return {
        hash: txResult?.txHash,
        confirmations: 0,
        from: transaction.from,
        wait: async (_confirmations?: number) =>
          Promise.reject("EssentialSigner does not support wait()"),
      };
    },
  }));
}
