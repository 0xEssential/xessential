// src/NetworkProvider.ts

import { InfuraProvider } from '@ethersproject/providers';
import { providers } from 'ethers';

export const PROVIDERS = {
  7700: 'https://canto.slingshot.finance/',
  740: 'https://eth.plexnode.wtf/',
  42170: 'https://nova.arbitrum.io/rpc',
  7777777: 'https://rpc.zora.energy/',
};

class NetworkProvider {
  private infuraApiKey: string;

  constructor(apiKey: string) {
    this.infuraApiKey = apiKey;
  }

  public getProvider(chainId: number): providers.Provider {
    let provider: providers.Provider;
    switch (chainId) {
      case 7700:
      case 740:
      case 42170:
      case 7777777:
        provider = new providers.JsonRpcProvider(PROVIDERS[chainId], chainId);
        break;
      default:
        provider = new InfuraProvider(chainId, this.infuraApiKey);
        break;
    }
    return provider;
  }
}

export { NetworkProvider };
