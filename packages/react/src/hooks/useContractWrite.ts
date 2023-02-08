import { IForwardRequest } from '@xessential/signer';
import { Interface } from '@ethersproject/abi';
import { TransactionResponse } from '@ethersproject/providers';
import { Abi } from 'abitype';
import { Contract, Signer } from 'ethers';
import * as React from 'react';
import { UseContractWriteConfig, WriteContractMode } from 'wagmi';

import { useDelegatedAccount } from './useDelegatedAccount.js';

export function useContractWrite<
  TMode extends WriteContractMode,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  address,
  args,
  abi,
  functionName,
  metaRequest,
  overrides,
  proof,
  onError,
  onSuccess,
  signer,
}: UseContractWriteConfig<TMode, TAbi, TFunctionName> & {
  signer: Signer;
  metaRequest?: IForwardRequest.ERC721ForwardRequestStruct;
  proof?: `0x${string}`;
}) {
  const [data, setData] = React.useState<TransactionResponse>();
  const { address: authorizer } = useDelegatedAccount();
  const [isLoading, setLoading] = React.useState(false);

  const defaultValues = {
    error: false,
    isError: false,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
  };

  const write = React.useCallback(() => {
    const implementationContract = new Contract(
      address!,
      new Interface(abi! as any),
      signer,
    );

    const {
      nonce: _nonce,
      authorizer,
      nftChainId,
      nftContract,
      nftTokenId,
    } = metaRequest || {};

    const _overrides = overrides
      ? [overrides]
      : [
          {
            customData: {
              authorizer,
              ...(nftContract ? { nftContract } : {}),
              ...(nftTokenId ? { nftTokenId } : {}),
              ...(nftChainId ? { nftChainId } : {}),
              ...(_nonce ? { nonce: _nonce } : {}),
              ...(proof ? { proof } : {}),
            },
          },
        ];

    const flatArgs = [...(args ? (args as any) : [null]), ..._overrides];

    setLoading(true);

    return implementationContract[functionName as string]
      .apply(null, flatArgs)
      .then((resp: TransactionResponse) => {
        setData(resp);
        onSuccess?.(resp as any, {} as any, null);
        setLoading(false);
      })
      .catch((e: Error) => {
        onError?.(e, {} as any, null);
        setLoading(false);
      });
  }, [
    address,
    abi,
    signer,
    args,
    overrides,
    authorizer,
    functionName,
    onSuccess,
    onError,
  ]);

  return {
    // error,
    // isError,
    // isIdle,
    // isSuccess,
    // reset,
    // status,
    // variables,
    ...defaultValues,
    isLoading,
    data,
    write,
  };
}
