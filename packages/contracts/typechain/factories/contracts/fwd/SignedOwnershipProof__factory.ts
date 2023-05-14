/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  SignedOwnershipProof,
  SignedOwnershipProofInterface,
} from "../../../contracts/fwd/SignedOwnershipProof";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "authorizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftChainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "createMessage",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownershipSigner",
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
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "authorizer",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftTokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nftChainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "targetChainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IForwardRequest.ERC721ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "verifyOwnershipProof",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e2d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312ce42fd146100465780635c0dfff6146100645780638190256414610094575b600080fd5b61004e6100c4565b60405161005b9190610552565b60405180910390f35b61007e600480360381019061007991906105e3565b6100ed565b60405161008b919061069e565b60405180910390f35b6100ae60048036038101906100a99190610931565b610131565b6040516100bb91906109d7565b60405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000878787878787468860405160200161010e989796959493929190610a01565b604051602081830303815290604052805190602001209050979650505050505050565b600061025882426101429190610aae565b10610182576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017990610b3f565b60405180910390fd5b60006101b46101af866000015187602001518861012001518960a001518a606001518b608001518a6100ed565b610221565b905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610200858361025190919063ffffffff16565b73ffffffffffffffffffffffffffffffffffffffff16149150509392505050565b6000816040516020016102349190610bd7565b604051602081830303815290604052805190602001209050919050565b60008060006102608585610278565b9150915061026d816102c9565b819250505092915050565b60008060418351036102b95760008060006020860151925060408601519150606086015160001a90506102ad8782858561042f565b945094505050506102c2565b60006002915091505b9250929050565b600060048111156102dd576102dc610bfd565b5b8160048111156102f0576102ef610bfd565b5b031561042c576001600481111561030a57610309610bfd565b5b81600481111561031d5761031c610bfd565b5b0361035d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161035490610c78565b60405180910390fd5b6002600481111561037157610370610bfd565b5b81600481111561038457610383610bfd565b5b036103c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103bb90610ce4565b60405180910390fd5b600360048111156103d8576103d7610bfd565b5b8160048111156103eb576103ea610bfd565b5b0361042b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042290610d76565b60405180910390fd5b5b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c111561046a576000600391509150610508565b60006001878787876040516000815260200160405260405161048f9493929190610db2565b6020604051602081039080840390855afa1580156104b1573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036104ff57600060019250925050610508565b80600092509250505b94509492505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061053c82610511565b9050919050565b61054c81610531565b82525050565b60006020820190506105676000830184610543565b92915050565b6000604051905090565b600080fd5b600080fd5b61058a81610531565b811461059557600080fd5b50565b6000813590506105a781610581565b92915050565b6000819050919050565b6105c0816105ad565b81146105cb57600080fd5b50565b6000813590506105dd816105b7565b92915050565b600080600080600080600060e0888a03121561060257610601610577565b5b60006106108a828b01610598565b97505060206106218a828b01610598565b96505060406106328a828b016105ce565b95505060606106438a828b016105ce565b94505060806106548a828b01610598565b93505060a06106658a828b016105ce565b92505060c06106768a828b016105ce565b91505092959891949750929550565b6000819050919050565b61069881610685565b82525050565b60006020820190506106b3600083018461068f565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610707826106be565b810181811067ffffffffffffffff82111715610726576107256106cf565b5b80604052505050565b600061073961056d565b905061074582826106fe565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff821115610774576107736106cf565b5b61077d826106be565b9050602081019050919050565b82818337600083830152505050565b60006107ac6107a784610759565b61072f565b9050828152602081018484840111156107c8576107c7610754565b5b6107d384828561078a565b509392505050565b600082601f8301126107f0576107ef61074f565b5b8135610800848260208601610799565b91505092915050565b600061016082840312156108205761081f6106b9565b5b61082b61016061072f565b9050600061083b84828501610598565b600083015250602061084f84828501610598565b602083015250604061086384828501610598565b604083015250606061087784828501610598565b606083015250608061088b848285016105ce565b60808301525060a061089f848285016105ce565b60a08301525060c06108b3848285016105ce565b60c08301525060e06108c7848285016105ce565b60e0830152506101006108dc848285016105ce565b610100830152506101206108f2848285016105ce565b6101208301525061014082013567ffffffffffffffff8111156109185761091761074a565b5b610924848285016107db565b6101408301525092915050565b60008060006060848603121561094a57610949610577565b5b600084013567ffffffffffffffff8111156109685761096761057c565b5b61097486828701610809565b935050602084013567ffffffffffffffff8111156109955761099461057c565b5b6109a1868287016107db565b92505060406109b2868287016105ce565b9150509250925092565b60008115159050919050565b6109d1816109bc565b82525050565b60006020820190506109ec60008301846109c8565b92915050565b6109fb816105ad565b82525050565b600061010082019050610a17600083018b610543565b610a24602083018a610543565b610a3160408301896109f2565b610a3e60608301886109f2565b610a4b6080830187610543565b610a5860a08301866109f2565b610a6560c08301856109f2565b610a7260e08301846109f2565b9998505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ab9826105ad565b9150610ac4836105ad565b9250828203905081811115610adc57610adb610a7f565b5b92915050565b600082825260208201905092915050565b7f5374616c65000000000000000000000000000000000000000000000000000000600082015250565b6000610b29600583610ae2565b9150610b3482610af3565b602082019050919050565b60006020820190508181036000830152610b5881610b1c565b9050919050565b600081905092915050565b7f19457468657265756d205369676e6564204d6573736167653a0a333200000000600082015250565b6000610ba0601c83610b5f565b9150610bab82610b6a565b601c82019050919050565b6000819050919050565b610bd1610bcc82610685565b610bb6565b82525050565b6000610be282610b93565b9150610bee8284610bc0565b60208201915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000610c62601883610ae2565b9150610c6d82610c2c565b602082019050919050565b60006020820190508181036000830152610c9181610c55565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000610cce601f83610ae2565b9150610cd982610c98565b602082019050919050565b60006020820190508181036000830152610cfd81610cc1565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000610d60602283610ae2565b9150610d6b82610d04565b604082019050919050565b60006020820190508181036000830152610d8f81610d53565b9050919050565b600060ff82169050919050565b610dac81610d96565b82525050565b6000608082019050610dc7600083018761068f565b610dd46020830186610da3565b610de1604083018561068f565b610dee606083018461068f565b9594505050505056fea2646970667358221220f2bcd7a918f0353337d7b512b8f2cdaccfcfbde3694fab9def723c17cae4cf9764736f6c63430008110033";

type SignedOwnershipProofConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignedOwnershipProofConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignedOwnershipProof__factory extends ContractFactory {
  constructor(...args: SignedOwnershipProofConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SignedOwnershipProof> {
    return super.deploy(overrides || {}) as Promise<SignedOwnershipProof>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SignedOwnershipProof {
    return super.attach(address) as SignedOwnershipProof;
  }
  override connect(signer: Signer): SignedOwnershipProof__factory {
    return super.connect(signer) as SignedOwnershipProof__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignedOwnershipProofInterface {
    return new utils.Interface(_abi) as SignedOwnershipProofInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignedOwnershipProof {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SignedOwnershipProof;
  }
}