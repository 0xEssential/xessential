/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  EssentialERC2771Context,
  EssentialERC2771ContextInterface,
} from "../../../contracts/fwd/EssentialERC2771Context";

const _abi = [
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

export class EssentialERC2771Context__factory {
  static readonly abi = _abi;
  static createInterface(): EssentialERC2771ContextInterface {
    return new utils.Interface(_abi) as EssentialERC2771ContextInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EssentialERC2771Context {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as EssentialERC2771Context;
  }
}
