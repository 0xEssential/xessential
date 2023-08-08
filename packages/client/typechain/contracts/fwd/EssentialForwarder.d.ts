import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common.js";
export declare namespace IForwardRequest {
    type ERC721ForwardRequestStruct = {
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
    type ERC721ForwardRequestStructOutput = [
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
export interface EssentialForwarderInterface extends utils.Interface {
    functions: {
        "ADMIN_ROLE()": FunctionFragment;
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "DelegationRegistry()": FunctionFragment;
        "_domainSeparatorV4()": FunctionFragment;
        "createMessage(address,address,uint256,uint256,address,uint256,uint256)": FunctionFragment;
        "createSession(address)": FunctionFragment;
        "execute((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)": FunctionFragment;
        "executeWithProof(bytes,bytes)": FunctionFragment;
        "executeWithProofNative(bytes,bytes)": FunctionFragment;
        "getChainId()": FunctionFragment;
        "getNonce(address)": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "isAuthorized(address,address)": FunctionFragment;
        "ownershipSigner()": FunctionFragment;
        "preflight((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)": FunctionFragment;
        "preflightNative((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes))": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "setDelegationRegistry(address)": FunctionFragment;
        "setOwnershipSigner(address)": FunctionFragment;
        "setUrls(string[])": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "urls(uint256)": FunctionFragment;
        "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)": FunctionFragment;
        "verifyOwnershipProof((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ADMIN_ROLE" | "DEFAULT_ADMIN_ROLE" | "DelegationRegistry" | "_domainSeparatorV4" | "createMessage" | "createSession" | "execute" | "executeWithProof" | "executeWithProofNative" | "getChainId" | "getNonce" | "getRoleAdmin" | "grantRole" | "hasRole" | "isAuthorized" | "ownershipSigner" | "preflight" | "preflightNative" | "renounceRole" | "revokeRole" | "setDelegationRegistry" | "setOwnershipSigner" | "setUrls" | "supportsInterface" | "urls" | "verify" | "verifyOwnershipProof"): FunctionFragment;
    encodeFunctionData(functionFragment: "ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DelegationRegistry", values?: undefined): string;
    encodeFunctionData(functionFragment: "_domainSeparatorV4", values?: undefined): string;
    encodeFunctionData(functionFragment: "createMessage", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "createSession", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "execute", values: [
        IForwardRequest.ERC721ForwardRequestStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "executeWithProof", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "executeWithProofNative", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getNonce", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isAuthorized", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "ownershipSigner", values?: undefined): string;
    encodeFunctionData(functionFragment: "preflight", values: [
        IForwardRequest.ERC721ForwardRequestStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "preflightNative", values: [IForwardRequest.ERC721ForwardRequestStruct]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setDelegationRegistry", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setOwnershipSigner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setUrls", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "urls", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "verify", values: [
        IForwardRequest.ERC721ForwardRequestStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "verifyOwnershipProof", values: [
        IForwardRequest.ERC721ForwardRequestStruct,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DelegationRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "_domainSeparatorV4", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createMessage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createSession", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeWithProofNative", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAuthorized", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownershipSigner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preflight", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preflightNative", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDelegationRegistry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOwnershipSigner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUrls", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "urls", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyOwnershipProof", data: BytesLike): Result;
    events: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "Session(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Session"): EventFragment;
}
export interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
export type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
export interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
export interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
export type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
export interface SessionEventObject {
    owner: string;
    authorized: string;
    length: BigNumber;
}
export type SessionEvent = TypedEvent<[
    string,
    string,
    BigNumber
], SessionEventObject>;
export type SessionEventFilter = TypedEventFilter<SessionEvent>;
export interface EssentialForwarder extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: EssentialForwarderInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        DelegationRegistry(overrides?: CallOverrides): Promise<[string]>;
        _domainSeparatorV4(overrides?: CallOverrides): Promise<[string]>;
        createMessage(signer: PromiseOrValue<string>, authorizer: PromiseOrValue<string>, nonce: PromiseOrValue<BigNumberish>, nftChainId: PromiseOrValue<BigNumberish>, nftContract: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        createSession(authorized: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        execute(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        executeWithProof(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        executeWithProofNative(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getChainId(overrides?: CallOverrides): Promise<[BigNumber] & {
            id: BigNumber;
        }>;
        getNonce(from: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isAuthorized(vault: PromiseOrValue<string>, delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        ownershipSigner(overrides?: CallOverrides): Promise<[string]>;
        preflight(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[void]>;
        preflightNative(req: IForwardRequest.ERC721ForwardRequestStruct, overrides?: CallOverrides): Promise<[void]>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setDelegationRegistry(registry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setOwnershipSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUrls(_urls: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        urls(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        verify(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        verifyOwnershipProof(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    DelegationRegistry(overrides?: CallOverrides): Promise<string>;
    _domainSeparatorV4(overrides?: CallOverrides): Promise<string>;
    createMessage(signer: PromiseOrValue<string>, authorizer: PromiseOrValue<string>, nonce: PromiseOrValue<BigNumberish>, nftChainId: PromiseOrValue<BigNumberish>, nftContract: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    createSession(authorized: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    execute(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    executeWithProof(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    executeWithProofNative(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getChainId(overrides?: CallOverrides): Promise<BigNumber>;
    getNonce(from: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isAuthorized(vault: PromiseOrValue<string>, delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    ownershipSigner(overrides?: CallOverrides): Promise<string>;
    preflight(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
    preflightNative(req: IForwardRequest.ERC721ForwardRequestStruct, overrides?: CallOverrides): Promise<void>;
    renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setDelegationRegistry(registry: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setOwnershipSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUrls(_urls: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    urls(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    verify(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    verifyOwnershipProof(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        DelegationRegistry(overrides?: CallOverrides): Promise<string>;
        _domainSeparatorV4(overrides?: CallOverrides): Promise<string>;
        createMessage(signer: PromiseOrValue<string>, authorizer: PromiseOrValue<string>, nonce: PromiseOrValue<BigNumberish>, nftChainId: PromiseOrValue<BigNumberish>, nftContract: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        createSession(authorized: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        execute(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean, string]>;
        executeWithProof(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean, string]>;
        executeWithProofNative(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean, string]>;
        getChainId(overrides?: CallOverrides): Promise<BigNumber>;
        getNonce(from: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isAuthorized(vault: PromiseOrValue<string>, delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        ownershipSigner(overrides?: CallOverrides): Promise<string>;
        preflight(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        preflightNative(req: IForwardRequest.ERC721ForwardRequestStruct, overrides?: CallOverrides): Promise<void>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setDelegationRegistry(registry: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setOwnershipSigner(newSigner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setUrls(_urls: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        urls(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        verify(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        verifyOwnershipProof(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        RoleGranted(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        RoleRevoked(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        "Session(address,address,uint256)"(owner?: PromiseOrValue<string> | null, authorized?: PromiseOrValue<string> | null, length?: PromiseOrValue<BigNumberish> | null): SessionEventFilter;
        Session(owner?: PromiseOrValue<string> | null, authorized?: PromiseOrValue<string> | null, length?: PromiseOrValue<BigNumberish> | null): SessionEventFilter;
    };
    estimateGas: {
        ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        DelegationRegistry(overrides?: CallOverrides): Promise<BigNumber>;
        _domainSeparatorV4(overrides?: CallOverrides): Promise<BigNumber>;
        createMessage(signer: PromiseOrValue<string>, authorizer: PromiseOrValue<string>, nonce: PromiseOrValue<BigNumberish>, nftChainId: PromiseOrValue<BigNumberish>, nftContract: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        createSession(authorized: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        execute(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        executeWithProof(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        executeWithProofNative(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getChainId(overrides?: CallOverrides): Promise<BigNumber>;
        getNonce(from: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isAuthorized(vault: PromiseOrValue<string>, delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        ownershipSigner(overrides?: CallOverrides): Promise<BigNumber>;
        preflight(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        preflightNative(req: IForwardRequest.ERC721ForwardRequestStruct, overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setDelegationRegistry(registry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setOwnershipSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUrls(_urls: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        urls(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        verify(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        verifyOwnershipProof(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DelegationRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        _domainSeparatorV4(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createMessage(signer: PromiseOrValue<string>, authorizer: PromiseOrValue<string>, nonce: PromiseOrValue<BigNumberish>, nftChainId: PromiseOrValue<BigNumberish>, nftContract: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        createSession(authorized: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        execute(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        executeWithProof(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        executeWithProofNative(response: PromiseOrValue<BytesLike>, extraData: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNonce(from: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isAuthorized(vault: PromiseOrValue<string>, delegate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownershipSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        preflight(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        preflightNative(req: IForwardRequest.ERC721ForwardRequestStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setDelegationRegistry(registry: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setOwnershipSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUrls(_urls: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        urls(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verifyOwnershipProof(req: IForwardRequest.ERC721ForwardRequestStruct, signature: PromiseOrValue<BytesLike>, timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
