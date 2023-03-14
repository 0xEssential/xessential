/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  EssentialPlaySession,
  EssentialPlaySessionInterface,
} from "../../../contracts/fwd/EssentialPlaySession";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedForwarder",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "vault",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "DelegateForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "checkDelegateForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authorized",
        type: "address",
      },
    ],
    name: "createSignedSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "bool",
        name: "value",
        type: "bool",
      },
    ],
    name: "delegateForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authorizer",
        type: "address",
      },
    ],
    name: "getSession",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "authorized",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "expiresAt",
            type: "uint256",
          },
        ],
        internalType: "struct IForwardRequest.PlaySession",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedForwarder",
        type: "address",
      },
    ],
    name: "setTrustedForwarder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610b81380380610b818339818101604052810190610032919061011e565b8033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505061014b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100eb826100c0565b9050919050565b6100fb816100e0565b811461010657600080fd5b50565b600081519050610118816100f2565b92915050565b600060208284031215610134576101336100bb565b5b600061014284828501610109565b91505092915050565b610a278061015a6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638c8e13b91161005b5780638c8e13b9146100ea5780638da5cb5b1461011a5780639c395bc214610138578063da742228146101685761007d565b8063572b6c0514610082578063581df04c146100b2578063685ee3e8146100ce575b600080fd5b61009c600480360381019061009791906106c3565b610184565b6040516100a9919061070b565b60405180910390f35b6100cc60048036038101906100c791906106c3565b6101dd565b005b6100e860048036038101906100e39190610752565b610239565b005b61010460048036038101906100ff91906106c3565b61024e565b60405161011191906107e9565b60405180910390f35b610122610307565b60405161012f9190610813565b60405180910390f35b610152600480360381019061014d919061082e565b61032d565b60405161015f919061070b565b60405180910390f35b610182600480360381019061017d91906106c3565b610416565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b6101e633610184565b610225576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021c906108cb565b60405180910390fd5b610236816102316104e9565b61051b565b50565b801561024a57610249823261051b565b5b5050565b610256610630565b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060400160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815250509050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008273ffffffffffffffffffffffffffffffffffffffff16600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614801561040e575042600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015410155b905092915050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049d90610937565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006104f433610184565b1561050857601436033560601c9050610517565b610510610628565b9050610518565b5b90565b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff1681526020016301e13380426105529190610986565b815250600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101559050507f58781eab4a0743ab1c285a238be846a235f06cdb5b968030573a635e5f8c92fa8183600160405161061c939291906109ba565b60405180910390a15050565b600033905090565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061069082610665565b9050919050565b6106a081610685565b81146106ab57600080fd5b50565b6000813590506106bd81610697565b92915050565b6000602082840312156106d9576106d8610660565b5b60006106e7848285016106ae565b91505092915050565b60008115159050919050565b610705816106f0565b82525050565b600060208201905061072060008301846106fc565b92915050565b61072f816106f0565b811461073a57600080fd5b50565b60008135905061074c81610726565b92915050565b6000806040838503121561076957610768610660565b5b6000610777858286016106ae565b92505060206107888582860161073d565b9150509250929050565b61079b81610685565b82525050565b6000819050919050565b6107b4816107a1565b82525050565b6040820160008201516107d06000850182610792565b5060208201516107e360208501826107ab565b50505050565b60006040820190506107fe60008301846107ba565b92915050565b61080d81610685565b82525050565b60006020820190506108286000830184610804565b92915050565b6000806040838503121561084557610844610660565b5b6000610853858286016106ae565b9250506020610864858286016106ae565b9150509250929050565b600082825260208201905092915050565b7f436f756e7465723a343239000000000000000000000000000000000000000000600082015250565b60006108b5600b8361086e565b91506108c08261087f565b602082019050919050565b600060208201905081810360008301526108e4816108a8565b9050919050565b7f3430330000000000000000000000000000000000000000000000000000000000600082015250565b600061092160038361086e565b915061092c826108eb565b602082019050919050565b6000602082019050818103600083015261095081610914565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610991826107a1565b915061099c836107a1565b92508282019050808211156109b4576109b3610957565b5b92915050565b60006060820190506109cf6000830186610804565b6109dc6020830185610804565b6109e960408301846106fc565b94935050505056fea2646970667358221220c74885e118a5bd430f172293a399db14da46c456ddb4dcf0d85fd6d60702b85964736f6c63430008110033";

type EssentialPlaySessionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EssentialPlaySessionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EssentialPlaySession__factory extends ContractFactory {
  constructor(...args: EssentialPlaySessionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    trustedForwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EssentialPlaySession> {
    return super.deploy(
      trustedForwarder,
      overrides || {}
    ) as Promise<EssentialPlaySession>;
  }
  override getDeployTransaction(
    trustedForwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(trustedForwarder, overrides || {});
  }
  override attach(address: string): EssentialPlaySession {
    return super.attach(address) as EssentialPlaySession;
  }
  override connect(signer: Signer): EssentialPlaySession__factory {
    return super.connect(signer) as EssentialPlaySession__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EssentialPlaySessionInterface {
    return new utils.Interface(_abi) as EssentialPlaySessionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EssentialPlaySession {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as EssentialPlaySession;
  }
}
