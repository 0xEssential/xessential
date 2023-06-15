import { BigNumber, providers } from 'ethers';

import { DelegationRegistryInterface } from './DelegationRegistryInterface';

interface DelegationTreeNode {
  address: string;
  fetchAuthorizers?: () => Promise<DelegationTreeNode[]>;
}

enum DELEGATION_TYPES {
  NONE,
  ALL,
  CONTRACT,
  TOKEN,
}

class DelegationTree {
  private readonly rootNode: DelegationTreeNode;
  private readonly Registry: DelegationRegistryInterface;

  constructor(
    provider: providers.Provider,
    private nftContract: string,
    private tokenId: BigNumber,
    rootAddress: string,
  ) {
    this.Registry = new DelegationRegistryInterface(provider);

    this.rootNode = {
      address: rootAddress,
      fetchAuthorizers: () =>
        this.fetchAuthorizersAsync({ address: rootAddress }),
    };
  }

  public async hasDelegatedOwnership(authorizer: string): Promise<boolean> {
    try {
      await this.findNodeAsync(
        this.rootNode,
        (node) => node.address === authorizer,
      );
      return true;
    } catch (error) {
      console.warn('ERROR: ', error);
      return false;
    }
  }

  private async findNodeAsync(
    root: DelegationTreeNode,
    condition: (node: DelegationTreeNode) => boolean,
  ): Promise<DelegationTreeNode | null> {
    if (condition(root)) return root;

    if (root.fetchAuthorizers) {
      const children = await root.fetchAuthorizers();
      for (const child of children) {
        const foundNode = await this.findNodeAsync(child, condition);
        if (foundNode) return foundNode;
      }
    }
    throw new Error('Node not found');
  }

  private async fetchAuthorizersAsync(
    node: DelegationTreeNode,
  ): Promise<DelegationTreeNode[]> {
    const allDelegations = await this.Registry.getAllDelegations(node.address);

    const validDelegations = allDelegations
      .filter((node) => {
        if (node.type_ === DELEGATION_TYPES.ALL) return true;
        if (node.type_ === DELEGATION_TYPES.CONTRACT) {
          return node.contract_ === this.nftContract;
        }
        return (
          node.contract_ === this.nftContract && node.tokenId === this.tokenId
        );
      })
      .map(({ vault }) => ({
        address: vault as string,
        fetchAuthorizers: () =>
          this.fetchAuthorizersAsync({
            address: vault as string,
          }),
      }));

    return validDelegations;
  }
}

export { DelegationTree };
