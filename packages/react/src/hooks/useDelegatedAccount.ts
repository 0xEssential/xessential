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

export interface Delegation {
  type_: DELEGATION_TYPES;
  vault: `0x${string}`;
  delegate?: `0x${string}`;
  contract_?: `0x${string}`;
  tokenId?: BigNumber;
}
interface TreeNode {
  address: `0x${string}`;
  children: TreeNode[];
  delegation: Delegation;
}

type DelegatedAccountResult = {
  /* 
    The primary address for user context. If the user is connected to a delegated wallet,
    this will return the vault wallet. Useful for ENS names, NFT holdings and token balances. 
  */
  address?: `0x${string}`;

  /** Array of all addresses signerAddress can potentially use assets from through recursive delegations, ignoring DelegationArgs */
  allAddresses: `0x${string}`[];

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
      registryAddress: `0x${string}`;
    };
    transactionArgs: {
      onError: (e: Error) => void;
      onSubmit: (data: SendTransactionResult) => void;
      onValidated: (data: any) => void;
    };
  }) => Promise<void>;

  /** Returns true until delegation graph is complete. If using `allAddresses` to query blockchain state,
   ** wait for this to be false to ensure you load all potentially owned assets.
   **/
  loadingDelegates: boolean;

  /** Convenience function for the connected address having 0 balance */
  isBurner: boolean;

  /** Boolean for whether connected address is delegate of a vaultAddress */
  isDelegated: boolean;

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
};

interface DelegationArgs {
  chainId?: number;
  contract?: `0x${string}`;
  delegate?: `0x${string}`;
  tokenId?: BigNumberish;
  registryAddress: `0x${string}`;
  type: DELEGATION_TYPES;
}

export function useDelegatedAccount(
  {
    delegate,
    chainId,
    type,
    contract,
    tokenId,
    registryAddress,
  }: DelegationArgs = {
    chainId: 1,
    type: DELEGATION_TYPES.ALL,
    registryAddress: delegateCashAddress,
  },
): DelegatedAccountResult & GetAccountResult<Provider> {
  const { address: signerAddress, ...account } = useAccount();
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [isTreeBuilt, setIsTreeBuilt] = useState(false);
  const [allAddresses, setAllAddresses] = useState<Set<`0x${string}`>>(
    new Set(),
  );

  const [allDelegations, setAllDelegations] = useState<Delegation[]>([]);
  const [vaultAddress, setVaultAddress] = useState<`0x${string}`>();
  const [updateBlock, setUpdateBlock] = useState(0);
  const [loading, setLoading] = useState(true);

  const buildTree = async (
    address: `0x${string}`,
    addressSet: Set<`0x${string}`>,
    delegation: Delegation,
  ): Promise<[TreeNode, Set<`0x${string}`>]> => {
    const node: TreeNode = {
      address,
      children: [],
      delegation,
    };

    const delegations = await readContract({
      ...txConfig,
      functionName: 'getDelegationsByDelegate',
      args: [node.address],
    });

    if (delegations.length > 0) {
      for (const delegation of delegations) {
        const [childNode, updatedAddressSet] = await buildTree(
          delegation.vault,
          addressSet,
          delegation,
        );
        addressSet.add(node.address); // Update the addressSet with the latest data
        node.children.push(childNode);
      }
    } else {
      // This is a leaf node, add its address to the Set
      addressSet.add(node.address);
    }

    return [node, addressSet];
  };

  useEffect(() => {
    if (signerAddress) {
      const build = async (_signerAddress: `0x${string}`) => {
        setIsTreeBuilt(false);
        const [newTree, addressSet] = await buildTree(
          _signerAddress,
          new Set([signerAddress]),
          {
            type_: DELEGATION_TYPES.ALL,
            vault: signerAddress,
          },
        );
        setAllAddresses(addressSet);
        setTree(newTree);
        setIsTreeBuilt(true);
      };
      build(signerAddress);
    }
  }, [signerAddress]);

  const delegateAddress = useMemo(
    () => delegate || signerAddress,
    [delegate, signerAddress],
  );

  const txConfig = useMemo(
    () => ({
      address: registryAddress,
      abi,
      chainId,
      enabled: account.isConnected,
    }),
    [account.isConnected, chainId],
  );

  const createDelegation = async ({
    delegationArgs: {
      chainId,
      contract,
      delegate,
      tokenId,
      type,
      registryAddress = delegateCashAddress,
    },
    transactionArgs: { onError, onSubmit, onValidated },
  }: {
    delegationArgs: {
      chainId?: number;
      contract?: `0x${string}`;
      delegate: `0x${string}`;
      tokenId?: BigNumberish;
      registryAddress: `0x${string}`;
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
      address: registryAddress,
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
  const { data: directDelegations, isLoading } = useContractRead({
    ...txConfig,
    scopeKey: delegateAddress,
    functionName: 'getDelegationsByDelegate',
    args: [delegateAddress as `0x${string}`],
    enabled: Boolean(account.isConnected && delegateAddress),
  }) as { data: Delegation[]; isLoading: boolean };

  const { data: connectedBalance } = useBalance({
    address: signerAddress,
    chainId,
  });

  // const vaultAddresses = useMemo(
  //   () => validDelegations?.map((delegation) => delegation.vault) || [],
  //   [validDelegations],
  // );

  const isBurner = useMemo(() => {
    return connectedBalance?.decimals === 0;
  }, [connectedBalance]);

  // useEffect(() => {
  //   setVaultAddress(vaultAddresses?.[0]);
  // }, [vaultAddresses]);

  const findAddressesByDelegationType = useCallback(
    (
      type_: DELEGATION_TYPES,
      contractAddress?: `0x${string}`,
      tokenId?: BigNumberish,
    ): `0x${string}`[] => {
      if (!tree) return [];

      const addresses: `0x${string}`[] = [];

      const dfs = (node: TreeNode) => {
        // Check if the delegation node is valid based on the given type
        const {
          type_: nodeType,
          contract_: nodeContract,
          tokenId: nodeTokenId,
        } = node.delegation;

        const isValid =
          type_ === DELEGATION_TYPES.ALL ||
          (type_ === DELEGATION_TYPES.CONTRACT &&
            nodeType === type_ &&
            nodeContract === contractAddress) ||
          (type_ === DELEGATION_TYPES.TOKEN &&
            nodeType === type_ &&
            nodeContract === contractAddress &&
            nodeTokenId?.eq(tokenId!));

        // If the delegation node is valid, add the node's address to the addresses array and continue searching the children
        if (isValid) {
          addresses.push(node.address);
          for (const child of node.children) {
            dfs(child);
          }
        }
      };

      // Start the search from the root node
      dfs(tree);

      return addresses;
    },
    [tree],
  );

  const tokenDelegated = useCallback(
    ({
      tokenId,
      contractAddress,
      owner,
    }: {
      contractAddress: `0x${string}`;
      tokenId: BigNumberish;
      owner: `0x${string}`;
    }): boolean => {
      if (!tree) return false;

      const dfs = (node: TreeNode): boolean => {
        const { type_, contract_, tokenId: nodeTokenId } = node.delegation;

        const isValid =
          type_ === DELEGATION_TYPES.ALL ||
          (type_ === DELEGATION_TYPES.CONTRACT &&
            contract_ === contractAddress) ||
          (type_ === DELEGATION_TYPES.TOKEN &&
            contract_ === contractAddress &&
            nodeTokenId?.eq(tokenId));

        // If the delegation node is valid, continue searching the children
        if (isValid) {
          if (node.address.toLowerCase() === owner.toLowerCase()) {
            return true;
          }

          for (const child of node.children) {
            console.log({ child });
            if (dfs(child)) {
              return true;
            }
          }
        }

        return false;
      };

      // Start the search from the root node
      return dfs(tree);
    },
    [tree, isTreeBuilt],
  );

  const vaultAddresses = useMemo(() => {
    return [...allAddresses].slice(1);
  }, [allAddresses]);

  return {
    allAddresses: [...allAddresses],
    allDelegations,
    createDelegation,
    delegations: [],
    connectedBalance,
    delegatedAddresses: delegatedAddresses as `0x${string}`[],
    isBurner,
    isDelegated: true,
    signerAddress,
    setVaultAddress,
    vaultAddress,
    vaultAddresses,
    tokenDelegated,
    ...(account as GetAccountResult),
    address: vaultAddress || signerAddress,
    loadingDelegates: !Boolean(isTreeBuilt),
  } as DelegatedAccountResult & GetAccountResult<Provider>;
}
