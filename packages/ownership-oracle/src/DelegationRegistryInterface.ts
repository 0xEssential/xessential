import { Contract, providers } from 'ethers';

import { REGISTRY_ABI } from './abis';
import {
  DelegationRegistry,
  IDelegationRegistry,
} from './types/typechain/contracts/test/DelegationRegistry';

const REGISTRY_ADDRESS = '0x00000000000076A84feF008CDAbe6409d2FE638B';

class DelegationRegistryInterface {
  Registry: DelegationRegistry;

  constructor(provider: providers.Provider) {
    this.Registry = new Contract(
      REGISTRY_ADDRESS,
      REGISTRY_ABI,
      provider,
    ) as DelegationRegistry;
  }

  public async getAllDelegations(
    address: string,
  ): Promise<IDelegationRegistry.DelegationInfoStruct[]> {
    return this.Registry.getDelegationsByDelegate(address);
  }
}

export { DelegationRegistryInterface };
