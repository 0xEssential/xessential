import {
  Account,
  Address,
  ParseAccount,
  Transport,
  WalletClient,
  WalletClientConfig,
  createClient,
  walletActions,
} from "viem";
import { Chain } from "viem/chains";
import {
  CustomSendTransactionParameters,
  sendTransaction,
} from "./sendTransaction";

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
  const client = createClient({
    account,
    chain,
    key,
    name,
    pollingInterval,
    transport: (opts) => transport({ ...opts, retryCount: 0 }),
    type: "walletClient",
  }).extend((client) => ({
    ...walletActions(client),
    sendTransaction: (args: CustomSendTransactionParameters) =>
      sendTransaction(client, args),
  }));

  return client as WalletClient<
    TTransport,
    TChain,
    ParseAccount<TAccountOrAddress>
  >;
}
