import { BigNumber } from 'ethers';

export type OffchainLookupData = {
  from: string;
  authorizer: string;
  nonce: BigNumber;
  nftChainId: BigNumber;
  nftContract: string;
  nftTokenId: BigNumber;
  targetChainId: BigNumber;
  timestamp: BigNumber;
};
