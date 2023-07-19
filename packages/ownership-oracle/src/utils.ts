// src/utils.ts
import { ethers } from 'ethers';

import { rawCallDataType } from './OwnershipService';
import { OffchainLookupData } from './types';

export const mockOffchainLookupData = (data: OffchainLookupData): string => {
  const abi = new ethers.utils.AbiCoder();
  return abi.encode(Object.values(rawCallDataType), Object.values(data));
};
