import {
  SendTransactionResult,
  prepareWriteContract,
  readContract,
  writeContract,
} from '@wagmi/core';
import { FetchBalanceResult, GetAccountResult, Provider } from '@wagmi/core';
import { BigNumber, BigNumberish } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Tree from '../utils/tree/index.js';
import { useAccount, useBalance, useContractRead } from 'wagmi';

import { abi, address as delegateCashAddress } from '../abis/DelegateCash.js';

export enum DELEGATION_TYPES {
  NONE,
  ALL,
  CONTRACT,
  TOKEN,
}

export type Delegation = {
  type_: DELEGATION_TYPES;
  vault: `0x${string}`;
  delegate: `0x${string}`;
  contract_?: `0x${string}`;
  tokenId?: BigNumberish;
};

type TreeNode = Delegation & {
  id: number;
};

type DelegatedAccountResult = {
  /* 
    The primary address for user context. If the user is connected to a delegated wallet,
    this will return the vault wallet. Useful for ENS names, NFT holdings and token balances. 
  */
  address?: `0x${string}`;

  /** Array of recursive tree Delegations from signerAddress root, ignoring DelegationArgs */
  allDelegations: Delegation[];

  /** Gas token balance for connected address */
  connectedBalance?: FetchBalanceResult;

  /** Array of addresses to which the connected address has delegated authority */
  delegatedAddresses: `0x${string}`[];

  /** Array of direct Delegations where signerAddress is delegate, respecting DelegationArgs */
  delegations: Delegation[];

  // Function for submitting a delegation to DelegateCash
  createDelegation: ({
    delegationArgs,
    transactionArgs,
  }: {
    delegationArgs: {
      chainId?: number;
      contract?: `0x${string}`;
      delegate: `0x${string}`;
      tokenId?: BigNumberish;
      type: DELEGATION_TYPES;
    };
    transactionArgs: {
      onError: (e: Error) => void;
      onSubmit: (data: SendTransactionResult) => void;
      onValidated: (data: any) => void;
    };
  }) => Promise<void>;

  /** Convenience function for the connected address having 0 balance */
  isBurner: boolean;

  /** Boolean for whether connected address is delegate of a vaultAddress */
  isDelegated: boolean;

  /** Boolean for whether allAddresses is completely loaded for signerAddress */
  loadingDelegates: boolean;

  /** Connected address used for transaction signing.  */
  signerAddress?: `0x${string}`;

  setVaultAddress: (address: `0x${string}`) => void;

  tokenDelegated: (args: {
    owner: `0x${string}`;
    contractAddress: `0x${string}`;
    tokenId?: BigNumberish;
  }) => boolean;

  /*
    Current selected vault address. If connected address is delegate of > 1 vaults, 
    a best guess default is selected. See `setVaultAddress`.
  */
  vaultAddress?: `0x${string}`;

  /** Array of addresses that have directly delegated to connected address, respecting DelegationArgs */
  vaultAddresses: `0x${string}`[];

  /** Array of all addresses signerAddress can potentially use assets from through recursive delegations, ignoring DelegationArgs */
  allAddresses: `0x${string}`[];
};

interface DelegationArgs {
  chainId?: number;
  contract?: `0x${string}`;
  delegate?: `0x${string}`;
  tokenId?: BigNumberish;
  type: DELEGATION_TYPES;
}

export function useDelegatedAccount(
  { delegate, chainId, type, contract, tokenId }: DelegationArgs = {
    chainId: 1,
    type: DELEGATION_TYPES.ALL,
  },
): DelegatedAccountResult & GetAccountResult<Provider> {
  const { address: signerAddress, ...account } = useAccount();
  const [allDelegations, setAllDelegations] = useState<Delegation[]>([]);
  const [vaultAddress, setVaultAddress] = useState<`0x${string}`>();
  const [updateBlock, setUpdateBlock] = useState(0);
  const [loadingDelegates, setLoadingDelegates] = useState(true);

  const delegateAddress = useMemo(
    () => delegate || signerAddress,
    [delegate, signerAddress],
  );

  // Delegates for current connected address
  // Useful for instructing a user to switch to a delegated wallet
  // with a valid delegation for the application context
  const txConfig = useMemo(
    () => ({
      address: delegateCashAddress,
      abi,
      chainId,
      enabled: account.isConnected,
    }),
    [account.isConnected, chainId],
  );

  const createDelegation = async ({
    delegationArgs: { chainId, contract, delegate, tokenId, type },
    transactionArgs: { onError, onSubmit, onValidated },
  }: {
    delegationArgs: {
      chainId?: number;
      contract?: `0x${string}`;
      delegate: `0x${string}`;
      tokenId?: BigNumberish;
      type: DELEGATION_TYPES;
    };
    transactionArgs: {
      onError: (e: Error) => void;
      onSubmit: (data: SendTransactionResult) => void;
      onValidated: (data: any) => void;
    };
  }): Promise<void> => {
    let typedConfig: {
      functionName:
        | 'delegateForAll'
        | 'delegateForContract'
        | 'delegateForToken';
      args: (`0x${string}` | BigNumberish | boolean)[];
    };

    switch (type) {
      case DELEGATION_TYPES.ALL:
        typedConfig = {
          functionName: 'delegateForAll',
          args: [delegate, true],
        };
        break;
      case DELEGATION_TYPES.CONTRACT:
        typedConfig = {
          functionName: 'delegateForContract',
          args: [delegate, contract!, true],
        };
        break;

      case DELEGATION_TYPES.TOKEN:
        typedConfig = {
          functionName: 'delegateForToken',
          args: [delegate, contract!, tokenId!, true],
        };
        break;

      default:
        typedConfig = {
          functionName: 'delegateForAll',
          args: [delegate, true],
        };
        break;
    }

    const config = await prepareWriteContract({
      abi,
      chainId,
      address: delegateCashAddress,
      functionName: typedConfig.functionName as any,
      args: typedConfig.args as any,
    });

    writeContract({ ...config })
      .then((data) => {
        onSubmit(data);
        return data.wait();
      })
      .then((receipt) => {
        onValidated(receipt);
        setUpdateBlock(receipt.blockNumber);
      })
      .catch((e) => {
        onError(e);
      });
  };

  const delegationArgs = useMemo(() => {
    const DELEGATION_ARGS = {
      [DELEGATION_TYPES.ALL]: {
        functionName: 'getDelegatesForAll',
        args: [delegateAddress],
      },
      [DELEGATION_TYPES.CONTRACT]: {
        functionName: 'getDelegatesForContract',
        args: [delegateAddress, contract],
      },
      [DELEGATION_TYPES.TOKEN]: {
        functionName: 'getDelegatesForToken',
        args: [delegateAddress, contract, BigNumber.from(tokenId || 0)],
      },
    } as Record<DELEGATION_TYPES, any>;

    return {
      ...txConfig,
      ...DELEGATION_ARGS[type],
    };
  }, [delegateAddress, contract, tokenId, txConfig, type]);

  const fetchTreeDelegations = async (nodeDelegation: Delegation) => {
    const metaDelegations = await readContract({
      ...txConfig,
      functionName: 'getDelegationsByDelegate',
      args: [nodeDelegation.vault],
    });

    setAllDelegations((curr) => [
      ...(curr ? curr : []),
      ...metaDelegations.map((branchDelegation) => ({
        ...branchDelegation,
      })),
    ]);

    if (metaDelegations?.length > 0) {
      metaDelegations?.forEach((branchDelegation) => {
        if (branchDelegation.delegate === branchDelegation.vault) return;
        return fetchTreeDelegations({
          ...branchDelegation,
        });
      });
    } else {
      setLoadingDelegates(false);
    }
  };

  // Delegates for current connected address
  // Useful for showing user the hot wallets they can switch to while
  // maintaining full user context
  const { data: delegatedAddresses } = useContractRead({
    ...txConfig,
    ...delegationArgs,
    functionName: 'getDelegatesForAll',
    scopeKey: `${delegateAddress}-${updateBlock}`,
    enabled: account.isConnected,
  });

  // Vaults for current connected address
  // Useful for showing user identity context when connected to a hot wallet
  // i.e. display a user's ENS name and avatar for a vault when connected
  // to a delegated wallet
  const { data: directDelegations } = useContractRead({
    ...txConfig,
    scopeKey: delegateAddress,
    functionName: 'getDelegationsByDelegate',
    args: [delegateAddress as `0x${string}`],
    enabled: Boolean(account.isConnected && delegateAddress),
  }) as { data: Delegation[] };

  useEffect(() => {
    directDelegations?.forEach((del) => {
      fetchTreeDelegations({
        ...del,
        vault: del.delegate,
      });
    });
  }, [directDelegations]);

  const validDelegations = useMemo(() => {
    if (type === DELEGATION_TYPES.ALL) return directDelegations;
    return directDelegations.reduce((vd: any[], delegation) => {
      if (type === DELEGATION_TYPES.TOKEN && tokenId !== delegation.tokenId)
        return vd;

      if (contract !== delegation.contract_) return vd;

      return [delegation, ...vd];
    }, []);
  }, [type, contract, tokenId, directDelegations]);

  const isDelegated = useMemo(
    () =>
      Boolean(
        validDelegations?.find(
          (delegation) => delegation.delegate === delegateAddress,
        ),
      ),
    [delegateAddress, validDelegations],
  );

  const { data: connectedBalance } = useBalance({
    address: signerAddress,
    chainId,
  });

  const vaultAddresses = useMemo(
    () => validDelegations?.map((delegation) => delegation.vault) || [],
    [validDelegations],
  );

  const allAddresses = useMemo(
    () => [
      ...new Set([
        signerAddress,
        ...(allDelegations?.map((delegation) => delegation.vault) || []),
      ]),
    ],
    [allDelegations],
  );

  const isBurner = useMemo(() => {
    return connectedBalance?.decimals === 0;
  }, [connectedBalance]);

  useEffect(() => {
    setVaultAddress(vaultAddresses?.[0]);
  }, [vaultAddresses]);

  const delegationGraph = useMemo(() => {
    if (!signerAddress) return;
    const tree = new Tree();
    const root = tree.parse({
      id: 0,
      vault: signerAddress,
      delegate: signerAddress,
      type_: DELEGATION_TYPES.ALL,
      children: [],
    });

    allDelegations?.forEach((del, index) => {
      const parent = root.first((node) => del.delegate === node?.model?.vault);
      parent?.addChild({
        id: index + 1,
        delegate: del.delegate,
        vault_: del.vault,
        type_: del.type_,
        contract_: del.contract_,
        tokenId: del.tokenId,
        children: [],
      } as any);
    });

    return { tree, root };
  }, [allDelegations, signerAddress]);

  const tokenDelegated = useCallback(
    ({
      chainId,
      tokenId,
      contractAddress,
      owner,
    }: {
      chainId?: number;
      contractAddress?: `0x${string}`;
      tokenId?: BigNumberish;
      owner: `0x${string}`;
    }) => {
      const root = delegationGraph?.root;
      let valid = true;
      const leaf = root?.first((node: Delegation | TreeNode | any) => {
        const { vault } = node as TreeNode;
        return owner === vault;
      });

      leaf?.walk((node: TreeNode | any) => {
        if (node.type_ === DELEGATION_TYPES.TOKEN && tokenId !== node.tokenId) {
          return false;
        }
        if (
          node.type_ === DELEGATION_TYPES.CONTRACT &&
          contractAddress !== node.contract_
        ) {
          return false;
        }

        if (node.isRoot()) {
          valid = true;
        }

        return true;
      });

      return Boolean(valid);
    },
    [delegationGraph],
  );

  return {
    allAddresses,
    allDelegations,
    createDelegation,
    delegations: validDelegations,
    connectedBalance,
    delegatedAddresses: delegatedAddresses as `0x${string}`[],
    isBurner,
    isDelegated,
    loadingDelegates,
    signerAddress,
    setVaultAddress,
    vaultAddress,
    vaultAddresses,
    tokenDelegated,
    ...(account as GetAccountResult),
    address: vaultAddress || signerAddress,
  } as DelegatedAccountResult & GetAccountResult<Provider>;
}
