import { BigNumber, constants, Contract, providers, utils } from 'ethers';

import { OWNER_ABI } from './abis';
import { DelegationTree } from './DelegationTree';
import { NetworkProvider } from './NetworkProvider';
import { ProofGenerator } from './ProofGenerator';

export type RawCalldata = {
  from: string;
  authorizer: string;
  nonce: BigNumber;
  nftChainId: BigNumber;
  nftContract: string;
  nftTokenId: BigNumber;
  targetChainId: BigNumber;
  timestamp: BigNumber;
};

export const rawCallDataType = {
  from: 'address',
  authorizer: 'address',
  nonce: 'uint256',
  nftChainId: 'uint256',
  nftContract: 'address',
  nftTokenId: 'uint256',
  targetChainId: 'uint256',
  timestamp: 'uint256',
};

class OwnershipService {
  private abi: string;
  private networkProvider: NetworkProvider;
  private proofGenerator: ProofGenerator;

  constructor(private _abi: string, apiKey: string) {
    this.abi = _abi;
    this.networkProvider = new NetworkProvider(apiKey);
    this.proofGenerator = new ProofGenerator(this.networkProvider, this.abi);
  }

  public async processCall(callData: string, to: string): Promise<string> {
    const decodedCallData = this.decodeCalldata(callData);
    const { nftChainId, nftContract, nftTokenId, from, authorizer } =
      decodedCallData;

    let owner: string;
    try {
      if (
        nftChainId.eq(0) &&
        nftTokenId.eq(0) &&
        nftContract === constants.AddressZero
      ) {
        owner = from;
      } else {
        owner = await this.fetchCurrentOwnerOrDelegate(
          nftChainId,
          nftContract,
          nftTokenId,
          from,
          authorizer,
        );
      }
    } catch (e) {
      throw new Error('Error fetching owner');
    }

    return this.proofGenerator.generateProof(decodedCallData, owner, to);
  }

  private decodeCalldata(calldata: string): RawCalldata {
    const abi = new utils.AbiCoder();
    const decoded = abi.decode(Object.values(rawCallDataType), calldata);

    return Object.keys(rawCallDataType).reduce(
      (obj, key, index) => ({ ...obj, [key]: decoded[index] }),
      {},
    ) as RawCalldata;
  }

  private async fetchCurrentOwnerOrDelegate(
    nftChainId: BigNumber,
    nftContract: string,
    tokenId: BigNumber,
    from: string,
    authorizer: string,
  ): Promise<string> {
    const nftChainProvider = this.networkProvider.getProvider(
      nftChainId.toNumber(),
    );

    const owner = await this.fetchCurrentOwner(
      nftChainProvider,
      nftContract,
      tokenId,
    );

    console.warn('ONCHAIN OWNER: ', owner);

    // save calls by exiting early
    if (owner === from && from === authorizer) {
      console.warn('OWNER === AUTHORIZER === FROM');
      return owner;
    }

    const delegationTree = new DelegationTree(
      nftChainProvider,
      nftContract,
      tokenId,
      from,
    );

    const authorized = await delegationTree.hasDelegatedOwnership(owner);

    if (authorized) {
      console.warn(`${from} AUTHORIZED RECURSIVELY`);
      return authorizer;
    }

    throw new Error('Not owner or delegate');
  }

  private async fetchCurrentOwner(
    provider: providers.Provider,
    nftContract: string,
    tokenId: BigNumber,
  ): Promise<string> {
    const Erc721 = new Contract(nftContract, OWNER_ABI, provider);
    return Erc721.ownerOf(tokenId);
  }
}

export { OwnershipService };
