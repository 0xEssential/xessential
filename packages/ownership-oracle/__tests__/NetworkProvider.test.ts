// src/__tests__/NetworkProvider.test.ts
import { providers } from 'ethers';

import { NetworkProvider, PROVIDERS } from '../src/NetworkProvider';

// Replace with your valid Infura API key for testing purposes
const apiKey = 'your_infura_api_key';

describe('NetworkProvider class', () => {
  const networkProvider = new NetworkProvider(apiKey);

  it('should return the correct provider for chain ID 7700', () => {
    const chainId = 7700;
    const provider = networkProvider.getProvider(chainId);

    expect(provider).toBeInstanceOf(providers.JsonRpcProvider);
    expect(provider['connection'].url).toBe(PROVIDERS[chainId]);
  });

  it('should return the correct provider for chain ID 740', () => {
    const chainId = 740;
    const provider = networkProvider.getProvider(chainId);

    expect(provider).toBeInstanceOf(providers.JsonRpcProvider);
    expect(provider['connection'].url).toBe(PROVIDERS[chainId]);
  });

  it('should return the correct InfuraProvider for an unknown or unlisted chain ID', () => {
    const chainId = 1;
    const provider = networkProvider.getProvider(chainId);

    expect(provider).toBeInstanceOf(providers.InfuraProvider);
    expect(provider['network'].chainId).toBe(chainId);
  });
});
