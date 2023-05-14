/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace IForwardRequest {
  export type ERC721ForwardRequestStruct = {
    from: PromiseOrValue<string>;
    authorizer: PromiseOrValue<string>;
    to: PromiseOrValue<string>;
    nftContract: PromiseOrValue<string>;
    nftTokenId: PromiseOrValue<BigNumberish>;
    nftChainId: PromiseOrValue<BigNumberish>;
    targetChainId: PromiseOrValue<BigNumberish>;
    value: PromiseOrValue<BigNumberish>;
    gas: PromiseOrValue<BigNumberish>;
    nonce: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type ERC721ForwardRequestStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    from: string;
    authorizer: string;
    to: string;
    nftContract: string;
    nftTokenId: BigNumber;
    nftChainId: BigNumber;
    targetChainId: BigNumber;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
  };
}

export interface SignedOwnershipProofInterface extends utils.Interface {
  functions: {
    "createMessage(address,address,uint256,uint256,address,uint256,uint256)": FunctionFragment;
    "ownershipSigner()": FunctionFragment;
    "verifyOwnershipProof((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createMessage"
      | "ownershipSigner"
      | "verifyOwnershipProof"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createMessage",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ownershipSigner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verifyOwnershipProof",
    values: [
      IForwardRequest.ERC721ForwardRequestStruct,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownershipSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyOwnershipProof",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SignedOwnershipProof extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SignedOwnershipProofInterface;

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
    createMessage(
      signer: PromiseOrValue<string>,
      authorizer: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      nftChainId: PromiseOrValue<BigNumberish>,
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ownershipSigner(overrides?: CallOverrides): Promise<[string]>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  createMessage(
    signer: PromiseOrValue<string>,
    authorizer: PromiseOrValue<string>,
    nonce: PromiseOrValue<BigNumberish>,
    nftChainId: PromiseOrValue<BigNumberish>,
    nftContract: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    timestamp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  ownershipSigner(overrides?: CallOverrides): Promise<string>;

  verifyOwnershipProof(
    req: IForwardRequest.ERC721ForwardRequestStruct,
    signature: PromiseOrValue<BytesLike>,
    timestamp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    createMessage(
      signer: PromiseOrValue<string>,
      authorizer: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      nftChainId: PromiseOrValue<BigNumberish>,
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    ownershipSigner(overrides?: CallOverrides): Promise<string>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    createMessage(
      signer: PromiseOrValue<string>,
      authorizer: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      nftChainId: PromiseOrValue<BigNumberish>,
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownershipSigner(overrides?: CallOverrides): Promise<BigNumber>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createMessage(
      signer: PromiseOrValue<string>,
      authorizer: PromiseOrValue<string>,
      nonce: PromiseOrValue<BigNumberish>,
      nftChainId: PromiseOrValue<BigNumberish>,
      nftContract: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownershipSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: PromiseOrValue<BytesLike>,
      timestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}