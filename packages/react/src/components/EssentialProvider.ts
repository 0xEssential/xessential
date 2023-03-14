import React, { createContext, ReactNode } from 'react';

import {
  address as forwarderAddress,
  domainName,
} from '../abis/GlobalEntryForwarder.js';
import EssentialWalletContextProvider from './EssentialWalletContext.js';

type EssentialReactConfig = {
  forwarderAddress?: string;
  domainName?: string;
  relayerUri: string;
  rpcUrl: string;
  burnerApiUrl?: string;
  burnerApiKey?: string;
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
  const { burnerApiKey, burnerApiUrl } = config;

  const _children = burnerApiKey && burnerApiUrl ? React.createElement(
    EssentialWalletContextProvider,
    { apiKey: burnerApiKey, baseUrl: burnerApiUrl },
    children,
  ) : children;

  return React.createElement(
    EssentialContext.Provider,
    {
      value: { ...defaultValue, ...config },
    },
    _children,
  );
};

export { EssentialProvider, EssentialContext };
