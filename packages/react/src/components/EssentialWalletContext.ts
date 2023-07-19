import commonPassworList from 'fxa-common-password-list';
import { Hedgehog } from '@audius/hedgehog';
import axios, { AxiosRequestConfig } from 'axios';
import type Wallet from 'ethereumjs-wallet';

function underscore(obj: Record<string, unknown>) {
  return Object.entries(obj).reduce(
    (camelized, [key, val]) => ({
      ...camelized,
      [key.replace(/([A-Z])/g, '_$1').toLowerCase()]: val,
    }),
    {},
  );
}
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type EssentialWalletContextValues = {
  address: `0x${string}` | undefined;
  createAccount: ({
    username,
    password,
    passwordConfirmation,
  }: {
    username: string;
    password: string;
    passwordConfirmation: string;
  }) => Promise<void>;
  error: Error | undefined;
  isConnected: boolean;
  loading: boolean;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void> | undefined;
  wallet?: Wallet | null;
};

const EssentialWalletContext = createContext(
  {} as EssentialWalletContextValues,
);

const EssentialWalletContextProvider = ({
  apiKey,
  baseUrl,
  children,
}: {
  apiKey: string;
  baseUrl: string;
  children?: ReactElement | ReactNode;
}): ReactElement => {
  const [hedgehog, setHedgehog] = useState<Hedgehog>();
  const [address, setAddress] = useState<`0x${string}`>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const checkWalletStatus = () => {
    if (hedgehog?.isLoggedIn() || hedgehog?.wallet) {
      const _address = hedgehog?.getWallet()?.getAddressString();
      setAddress(_address as `0x${string}`);
    }
  };

  useEffect(() => {
    if (!hedgehog) return;
    const setup = async () =>
      hedgehog?.restoreLocalWallet().then(checkWalletStatus);
    setup();
  }, [hedgehog]);

  const client = useMemo(() => {
    const client = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: { 'API-KEY': apiKey },
    });
    return client;
  }, [baseUrl, apiKey]);

  const makeRequestToService = useCallback(
    async (axiosRequestObj: AxiosRequestConfig<any>) => {
      try {
        const resp = await client(axiosRequestObj);
        if (resp.status === 200) {
          return resp.data;
        } else {
          throw new Error(
            `Server returned error: ${resp.status.toString()} ${
              resp.data['error']
            }`,
          );
        }
      } catch (e: any) {
        console.error(e);
        throw new Error(
          `Server returned error: ${e.response.status.toString()} ${
            e.response.data['error']
          }`,
        );
      }
    },
    [client],
  );

  useEffect(() => {
    const setAuthFn = async (obj: {
      iv: string;
      cipherText: string;
      lookupKey: string;
    }) =>
      await makeRequestToService({
        url: `authentications`,
        method: 'post',
        data: underscore(obj),
      });

    const setUserFn = async (obj: {
      walletAddress: string;
      username: string;
    }) =>
      await makeRequestToService({
        url: `users`,
        method: 'post',
        data: underscore(obj),
      });

    const getFn = async (obj: { lookupKey: string }) => {
      return await makeRequestToService({
        url: 'authentications',
        method: 'get',
        params: underscore(obj),
      });
    };

    const _hedgehog = new Hedgehog(getFn, setAuthFn, setUserFn, true);
    setHedgehog(_hedgehog);
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setError(undefined);
    setLoading(true);
    hedgehog
      ?.login(username, password)
      .then(() => checkWalletStatus())
      .catch((e: Error) => {
        console.error(e);
        setError(new Error('Bad login. Create a new burner?'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setAddress(undefined);
    return hedgehog?.logout();
  };

  const createAccount = async ({
    username,
    password,
    passwordConfirmation,
  }: {
    username: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    if (password !== passwordConfirmation) {
      setError(Error('Password does not match'));
      return;
    }

    if (commonPassworList.test(password)) {
      setError(Error('Password is common'));
      return;
    }

    if (!password || !username || !passwordConfirmation) {
      setError(Error('Missing value'));
      return;
    }
    setLoading(true);
    setError(undefined);

    hedgehog
      ?.signUp(username, password)
      .then(() => {
        checkWalletStatus();
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return React.createElement(
    EssentialWalletContext.Provider,
    {
      value: {
        address,
        createAccount,
        error,
        isConnected: Boolean(hedgehog?.isLoggedIn()),
        loading,
        login,
        logout,
        wallet: hedgehog?.wallet,
      },
    },
    children,
  );
};

export default EssentialWalletContextProvider;
export { EssentialWalletContext };
