import React, { createContext, ReactNode, useCallback, useMemo } from 'react';

import {
  address as forwarderAddress,
  domainName,
} from '../abis/GlobalEntryForwarder.js';
import EssentialWalletContextProvider from './EssentialWalletContext.js';
import { providers } from 'ethers';

type EssentialReactConfig = {
  forwarderAddress?: string;
  domainName?: string;
  relayerUri: string;
  readProvider: ({ chainId }: { chainId: number }) => providers.Provider;
  burnerApiUrl?: string;
  burnerApiKey?: string;
  gaslessApiKey?: string;
};

const defaultValue = {
  burnerApiUrl: 'https://burner.nfight.xyz/',
  domainName,
  forwarderAddress,
};

const EssentialContext = createContext<EssentialReactConfig>(
  defaultValue as EssentialReactConfig,
);

const EssentialProvider = ({
  config,
  children,
}: {
  config: EssentialReactConfig;
  children: ReactNode;
}): JSX.Element => {
  const { burnerApiKey, burnerApiUrl } = { ...defaultValue, ...config };

  const _children = useCallback(
    (__children: ReactNode) => {
      if (burnerApiKey)
        return React.createElement(
          EssentialWalletContextProvider,
          { apiKey: burnerApiKey, baseUrl: burnerApiUrl },
          __children,
        );

      return __children;
    },
    [burnerApiKey, burnerApiUrl],
  );

  return React.createElement(
    EssentialContext.Provider,
    {
      value: { ...defaultValue, ...config },
    },
    _children(children),
  );
};

export { EssentialProvider, EssentialContext };
