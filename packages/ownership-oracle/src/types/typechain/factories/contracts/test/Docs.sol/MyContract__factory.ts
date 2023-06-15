/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  MyContract,
  MyContractInterface,
} from "../../../../contracts/test/Docs.sol/MyContract";

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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "entrants",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "entries",
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
  {
    inputs: [],
    name: "tokenGatedFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c9d380380610c9d8339818101604052810190610032919061011e565b8033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505061014b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100eb826100c0565b9050919050565b6100fb816100e0565b811461010657600080fd5b50565b600081519050610118816100f2565b92915050565b600060208284031215610134576101336100bb565b5b600061014284828501610109565b91505092915050565b610b438061015a6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063572b6c05146100675780638da5cb5b146100975780638e0e5356146100b5578063da742228146100e5578063e7b4e5ab14610101578063fd4669a714610131575b600080fd5b610081600480360381019061007c919061066b565b61013b565b60405161008e91906106b3565b60405180910390f35b61009f610194565b6040516100ac91906106dd565b60405180910390f35b6100cf60048036038101906100ca919061083e565b6101ba565b6040516100dc91906106dd565b60405180910390f35b6100ff60048036038101906100fa919061066b565b610203565b005b61011b600480360381019061011691906108bd565b6102d6565b60405161012891906106dd565b60405180910390f35b610139610315565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6002818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610293576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028a90610947565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600381815481106102e657600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61031e3361013b565b61035d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610354906109b3565b60405180910390fd5b600061036761051b565b9050600081604001518260000151836020015160405160200161038c939291906109e2565b6040516020818303038152906040529050600073ffffffffffffffffffffffffffffffffffffffff166002826040516103c59190610a8a565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461044a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044190610aed565b60405180910390fd5b6000610454610588565b9050806002836040516104679190610a8a565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506003819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050565b6105236105c2565b60008060006105313361013b565b1561054f5760683603359250602836033560601c9050604836033591505b60405180606001604052808273ffffffffffffffffffffffffffffffffffffffff16815260200183815260200184815250935050505090565b60006105933361013b565b156105a757601436033560601c90506105b6565b6105af6105ba565b90506105b7565b5b90565b600033905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106388261060d565b9050919050565b6106488161062d565b811461065357600080fd5b50565b6000813590506106658161063f565b92915050565b60006020828403121561068157610680610603565b5b600061068f84828501610656565b91505092915050565b60008115159050919050565b6106ad81610698565b82525050565b60006020820190506106c860008301846106a4565b92915050565b6106d78161062d565b82525050565b60006020820190506106f260008301846106ce565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61074b82610702565b810181811067ffffffffffffffff8211171561076a57610769610713565b5b80604052505050565b600061077d6105f9565b90506107898282610742565b919050565b600067ffffffffffffffff8211156107a9576107a8610713565b5b6107b282610702565b9050602081019050919050565b82818337600083830152505050565b60006107e16107dc8461078e565b610773565b9050828152602081018484840111156107fd576107fc6106fd565b5b6108088482856107bf565b509392505050565b600082601f830112610825576108246106f8565b5b81356108358482602086016107ce565b91505092915050565b60006020828403121561085457610853610603565b5b600082013567ffffffffffffffff81111561087257610871610608565b5b61087e84828501610810565b91505092915050565b6000819050919050565b61089a81610887565b81146108a557600080fd5b50565b6000813590506108b781610891565b92915050565b6000602082840312156108d3576108d2610603565b5b60006108e1848285016108a8565b91505092915050565b600082825260208201905092915050565b7f3430330000000000000000000000000000000000000000000000000000000000600082015250565b60006109316003836108ea565b915061093c826108fb565b602082019050919050565b6000602082019050818103600083015261096081610924565b9050919050565b7f436f756e7465723a343239000000000000000000000000000000000000000000600082015250565b600061099d600b836108ea565b91506109a882610967565b602082019050919050565b600060208201905081810360008301526109cc81610990565b9050919050565b6109dc81610887565b82525050565b60006060820190506109f760008301866109d3565b610a0460208301856106ce565b610a1160408301846109d3565b949350505050565b600081519050919050565b600081905092915050565b60005b83811015610a4d578082015181840152602081019050610a32565b60008484015250505050565b6000610a6482610a19565b610a6e8185610a24565b9350610a7e818560208601610a2f565b80840191505092915050565b6000610a968284610a59565b915081905092915050565b7f416c726561647920456e74657265640000000000000000000000000000000000600082015250565b6000610ad7600f836108ea565b9150610ae282610aa1565b602082019050919050565b60006020820190508181036000830152610b0681610aca565b905091905056fea264697066735822122012ad702b44ad677fedbeea1fb9fe5a1b23394cded500066bdd13d4b644a47e3c64736f6c63430008110033";

type MyContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyContract__factory extends ContractFactory {
  constructor(...args: MyContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    trustedForwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MyContract> {
    return super.deploy(
      trustedForwarder,
      overrides || {}
    ) as Promise<MyContract>;
  }
  override getDeployTransaction(
    trustedForwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(trustedForwarder, overrides || {});
  }
  override attach(address: string): MyContract {
    return super.attach(address) as MyContract;
  }
  override connect(signer: Signer): MyContract__factory {
    return super.connect(signer) as MyContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyContractInterface {
    return new utils.Interface(_abi) as MyContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyContract {
    return new Contract(address, _abi, signerOrProvider) as MyContract;
  }
}