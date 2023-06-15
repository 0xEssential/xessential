import { EssentialSigner } from '@xessential/signer';
import { JsonFragment } from '@ethersproject/abi';
import {
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  SendTransactionResult,
  Signer,
} from '@wagmi/core';
import { Abi } from 'abitype';
import { constants, Contract, providers, utils, Wallet } from 'ethers';
import * as React from 'react';
import { UsePrepareContractWriteConfig, useSigner } from 'wagmi';

import { EssentialContext } from '../components/EssentialProvider.js';
import { useDelegatedAccount } from './useDelegatedAccount.js';
import { EssentialWalletContext } from '../components/EssentialWalletContext.js';

type TAbi = Abi | readonly {}[];

export type EssentialContractWriteConfig<> = UsePrepareContractWriteConfig<
  TAbi,
  string,
  number,
  Signer
> &
  PrepareWriteContractConfig & {
    chainId: number;
    onSubmit?: () => void;
    onSuccess?: (data: SendTransactionResult) => void;
    txMode?: 'meta' | 'std';
    address: `0x${string}` | string;
  };

export type EssentialPrepareWriteContractResult =
  PrepareWriteContractResult<TAbi> & {
    onSubmit?: () => void;
    onSuccess?: (data: SendTransactionResult) => void;
    signer: EssentialSigner;
  };

export function usePrepareContractWrite({
  address,
  abi,
  functionName,
  chainId,
  args,
  overrides,
  enabled,
  scopeKey,
  onError,
  onSettled,
  onSubmit,
  onSuccess,
  txMode,
}: EssentialContractWriteConfig) {
  const {
    address: authorizer,
    signerAddress,
    vaultAddress,
  } = useDelegatedAccount();
  const { data: signer } = useSigner();
  const [request, setRequest] = React.useState<any>();

  const { relayerUri, forwarderAddress, domainName, readProvider } =
    React.useContext(EssentialContext);

  const { wallet } = React.useContext(EssentialWalletContext);
  const walletAddress = wallet?.getChecksumAddressString();

  const globalEntrySigner = React.useMemo(() => {
    if (!signerAddress || !signer) return;
    let signerArgs: [string, Signer | Wallet] = [signerAddress, signer];

    if (txMode === 'meta' && wallet && walletAddress) {
      const _wallet = new Wallet(
        wallet.getPrivateKey(),
        readProvider({ chainId }),
      );
      signerArgs = [walletAddress, _wallet as unknown as Wallet];
    }

    return new EssentialSigner(...signerArgs, {
      domainName,
      forwarderAddress,
      relayerUri,
      chainId,
      readProvider,
      onSubmit,
    });
  }, [signer, signerAddress, onSubmit, walletAddress]);

  // if standard tx, we need to call the preflight
  // if meta-tx, fetching the nonce now would be beneficial
  React.useEffect(() => {
    if (enabled === false) return;
    if (!globalEntrySigner || !signerAddress) return;
    if (!authorizer) return;

    const prepare = async () => {
      setRequest(undefined);
      const nonce = (await globalEntrySigner?.fetchNonce())?.toNumber();

      const _overrides = {
        authorizer: (vaultAddress || signerAddress) as string,
        ...(nonce ? { nonce } : {}),
        ...overrides?.customData,
      };

      const implementationContract = new Contract(
        address,
        new utils.Interface(abi as JsonFragment[]),
      );

      if (txMode === 'std') {
        const req = {
          abi,
          to: address,
          from: signerAddress as `0x${string}`,
          data: implementationContract.interface.encodeFunctionData(
            functionName,
            args,
          ),
          value: 0,
          gas: 1e6,
          nonce: nonce,
          targetChainId: chainId || 1,
          nftContract: constants.AddressZero,
          nftChainId: '0',
          nftTokenId: '0',
          ..._overrides,
        };

        const proof = await globalEntrySigner?.preflightNative(req);
        setRequest({ ...req, proof, to: forwarderAddress });
      } else {
        const req = await globalEntrySigner?.prepareTransaction({
          to: address,
          from: walletAddress || signerAddress,
          data: implementationContract.interface.encodeFunctionData(
            functionName,
            args as unknown[],
          ),
          customData: _overrides,
        });
        setRequest(req);
      }
    };

    prepare();
  }, [
    txMode,
    JSON.stringify(args),
    authorizer,
    signer,
    signerAddress,
    scopeKey,
    enabled,
    overrides,
  ]);

  return {
    config: {
      abi,
      address,
      args,
      functionName,
      mode: 'prepared',
      request: request,
      signer: globalEntrySigner,
      // status: '',
      onError,
      onSettled,
      onSuccess,
      onSubmit,
    } as EssentialPrepareWriteContractResult,
  };
}
