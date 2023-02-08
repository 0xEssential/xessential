import { EssentialSigner } from '@xessential/signer';
import { JsonFragment } from '@ethersproject/abi';
import { TransactionReceipt } from '@ethersproject/providers';
import {
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
} from '@wagmi/core';
import { Abi } from 'abitype';
import { constants, Contract, Signer, utils } from 'ethers';
import * as React from 'react';
import { useSigner } from 'wagmi';

import { EssentialContext } from '../components/EssentialProvider.js';
import { useDelegatedAccount } from './useDelegatedAccount.js';

export function usePrepareContractWrite<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
>({
  address,
  abi,
  chainId,
  enabled,
  functionName,
  args,
  overrides,
  scopeKey,
  onSubmit,
  onError,
  onSettled,
  onSuccess,
  txMode,
}: PrepareWriteContractConfig<TAbi, TFunctionName> & {
  chainId: number;
  enabled?: boolean;
  onSubmit?: () => void;
  onSuccess?: (result: TransactionReceipt) => void;
  onError?: (error: Error) => void;
  onSettled?: (result: TransactionReceipt) => void;
  scopeKey?: string;
  txMode?: 'meta' | 'std';
}) {
  const {
    address: authorizer,
    signerAddress,
    vaultAddress,
  } = useDelegatedAccount();
  const { data: signer } = useSigner();
  const [metaRequest, setMetaRequest] = React.useState<any>();
  const [proof, setProof] = React.useState<any>();

  const { relayerUri, rpcUrl, forwarderAddress, domainName } =
    React.useContext(EssentialContext);

  const globalEntrySigner = React.useMemo(() => {
    if (!signer || !signerAddress) return;
    return new EssentialSigner(signerAddress, signer, {
      domainName,
      forwarderAddress,
      relayerUri,
      chainId,
      rpcUrl,
      onSubmit,
    });
  }, [signer, signerAddress, onSubmit]);

  // if standard tx, we need to call the preflight
  // if meta-tx, fetching the nonce now would be beneficial
  React.useEffect(() => {
    if (enabled === false) return;
    if (!globalEntrySigner || !signerAddress) return;
    if (!authorizer) return;
    const prepare = async () => {
      setProof(undefined);
      setMetaRequest(undefined);
      const nonce = (await globalEntrySigner?.fetchNonce())?.toNumber();

      const _overrides = {
        ...overrides?.customData,
        ...(nonce ? { nonce } : {}),
        authorizer: (vaultAddress || signerAddress) as string,
      };

      const implementationContract = new Contract(
        address,
        new utils.Interface(abi as JsonFragment[]),
      );

      if (txMode === 'std') {
        // get nonce

        // preflight native to do CCIP stuff
        const req = {
          abi,
          to: address,
          from: signerAddress as `0x${string}`,
          data: implementationContract.interface.encodeFunctionData(
            functionName,
            args as unknown[],
          ),
          value: 0,
          gas: 1e6,
          nonce: nonce,
          targetChainId: chainId,
          nftContract: constants.AddressZero,
          nftChainId: '0',
          nftTokenId: '0',
          ..._overrides,
        };

        await globalEntrySigner?.preflightNative(req).then((proof) => {
          setProof(proof);
        });

        // return sig as additional arg for direct req
      } else {
        const req = await globalEntrySigner?.prepareTransaction({
          to: address,
          from: signerAddress,
          data: implementationContract.interface.encodeFunctionData(
            functionName,
            args as unknown[],
          ),
          customData: _overrides,
        });

        setMetaRequest(req);
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
  ]);

  return {
    config: {
      abi,
      address,
      args,
      functionName,
      mode: 'prepared',
      overrides: {
        customData: {
          ...overrides?.customData,
          ...(proof ? { proof } : {}),
          authorizer: vaultAddress || signerAddress,
        },
      },
      request: undefined,
      metaRequest,
      nonce: metaRequest?.nonce,
      signer: globalEntrySigner,
      onError,
      onSettled,
      onSuccess,
    } as unknown as PrepareWriteContractResult<TAbi, TFunctionName> & {
      signer: Signer;
      onSuccess?: (result: TransactionReceipt) => void;
      onError?: (error: Error) => void;
      onSettled?: (result: TransactionReceipt) => void;
    },
  };
}
