/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface CounterInterface extends utils.Interface {
  functions: {
    "collectionCount(address)": FunctionFragment;
    "count(address)": FunctionFragment;
    "increment()": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "lastCaller()": FunctionFragment;
    "minimalRequest()": FunctionFragment;
    "owner()": FunctionFragment;
    "setTrustedForwarder(address)": FunctionFragment;
    "totalCount()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "collectionCount"
      | "count"
      | "increment"
      | "isTrustedForwarder"
      | "lastCaller"
      | "minimalRequest"
      | "owner"
      | "setTrustedForwarder"
      | "totalCount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "collectionCount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "count",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "increment", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastCaller",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimalRequest",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "collectionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "increment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastCaller", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimalRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalCount", data: BytesLike): Result;

  events: {
    "Counted(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Counted"): EventFragment;
}

export interface CountedEventObject {
  contractAddress: string;
  tokenId: BigNumber;
  counter: string;
}
export type CountedEvent = TypedEvent<
  [string, BigNumber, string],
  CountedEventObject
>;

export type CountedEventFilter = TypedEventFilter<CountedEvent>;

export interface Counter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CounterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    collectionCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    count(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    increment(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    lastCaller(overrides?: CallOverrides): Promise<[string]>;

    minimalRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setTrustedForwarder(
      trustedForwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalCount(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  collectionCount(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  count(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  increment(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  lastCaller(overrides?: CallOverrides): Promise<string>;

  minimalRequest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  setTrustedForwarder(
    trustedForwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    collectionCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    count(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increment(overrides?: CallOverrides): Promise<void>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    lastCaller(overrides?: CallOverrides): Promise<string>;

    minimalRequest(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    setTrustedForwarder(
      trustedForwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Counted(address,uint256,address)"(
      contractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      counter?: PromiseOrValue<string> | null
    ): CountedEventFilter;
    Counted(
      contractAddress?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      counter?: PromiseOrValue<string> | null
    ): CountedEventFilter;
  };

  estimateGas: {
    collectionCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    count(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increment(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastCaller(overrides?: CallOverrides): Promise<BigNumber>;

    minimalRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setTrustedForwarder(
      trustedForwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    collectionCount(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    count(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increment(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastCaller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimalRequest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTrustedForwarder(
      trustedForwarder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
