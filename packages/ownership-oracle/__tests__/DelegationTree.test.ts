import { BigNumber, providers, Wallet } from 'ethers';

import { DelegationTree } from '../src/DelegationTree';

const getAllDelegationsMock = jest.fn();
jest.mock('../src/DelegationRegistryInterface', () => {
  return {
    DelegationRegistryInterface: jest.fn().mockImplementation(() => {
      return {
        getAllDelegations: getAllDelegationsMock,
      };
    }),
  };
});

describe('DelegationTree', () => {
  const signer = Wallet.createRandom();
  const intermediary = Wallet.createRandom();
  const owner = Wallet.createRandom();

  const nftContract = '0xExampleNFTContract';
  const tokenId = BigNumber.from(1);
  const provider = new providers.JsonRpcProvider('');

  describe('hasDelegatedOwnership', () => {
    it('returns true when signer is owner', async () => {
      const tree = new DelegationTree(
        provider,
        nftContract,
        tokenId,
        signer.address,
      );

      const authorized = await tree.hasDelegatedOwnership(signer.address);
      expect(authorized).toBe(true);
    });

    it('returns false when signer has no delegations', async () => {
      getAllDelegationsMock.mockReturnValueOnce([]);

      const tree = new DelegationTree(
        provider,
        nftContract,
        tokenId,
        signer.address,
      );

      const authorized = await tree.hasDelegatedOwnership(owner.address);
      expect(authorized).toBe(false);
    });

    it('returns false when signer is not owner and no authorizer', async () => {
      getAllDelegationsMock.mockReturnValueOnce([
        {
          vault: owner.address,
          tokenId,
          contract_: nftContract,
          delegate: signer.address,
          type_: 1,
        },
      ]);

      const tree = new DelegationTree(
        provider,
        nftContract,
        tokenId,
        signer.address,
      );

      const authorized = await tree.hasDelegatedOwnership('');
      expect(authorized).toBe(false);
    });

    it('returns false when authorizer is not owner', async () => {
      getAllDelegationsMock.mockReturnValueOnce([
        {
          vault: owner.address,
          tokenId,
          contract_: nftContract,
          delegate: signer.address,
          type_: 1,
        },
      ]);

      const tree = new DelegationTree(
        provider,
        nftContract,
        tokenId,
        signer.address,
      );

      const authorized = await tree.hasDelegatedOwnership(
        Wallet.createRandom().address,
      );
      expect(authorized).toBe(false);
    });

    describe('with Wallet level delegations', () => {
      it('returns true when signer is directly authorized', async () => {
        getAllDelegationsMock.mockReturnValue([
          {
            vault: owner.address,
            tokenId,
            contract_: nftContract,
            delegate: signer.address,
            type_: 1,
          },
        ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns true when signer is authorized through intermediary', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 1,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 1,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });
    });

    describe('with Contract level delegations', () => {
      it('returns true when signer is directly authorized for NFT Contract', async () => {
        getAllDelegationsMock.mockReturnValueOnce([
          {
            vault: owner.address,
            tokenId,
            contract_: nftContract,
            delegate: signer.address,
            type_: 2,
          },
        ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns false when signer is directly authorized for unrelated NFT Contract', async () => {
        getAllDelegationsMock.mockReturnValueOnce([
          {
            vault: owner.address,
            tokenId,
            contract_: '0xUnrelatedNFTContract',
            delegate: signer.address,
            type_: 2,
          },
        ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(false);
      });

      it('returns true when signer is authorized for NFT Contract through intermediary with Wallet authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 2,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 1,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns true when signer is authorized for NFT Contract through intermediary with NFT contract authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 2,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 2,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns false when signer is authorized for NFT Contract through intermediary but with unrelated NFT contract authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 2,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: '0xUnrelatedNFTContract',
              delegate: intermediary.address,
              type_: 2,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(false);
      });
    });

    describe('with Token level delegations', () => {
      it('returns true when signer is directly authorized for NFT', async () => {
        getAllDelegationsMock.mockReturnValueOnce([
          {
            vault: owner.address,
            tokenId,
            contract_: nftContract,
            delegate: signer.address,
            type_: 3,
          },
        ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns false when signer is directly authorized for unrelated token', async () => {
        getAllDelegationsMock.mockReturnValueOnce([
          {
            vault: owner.address,
            tokenId: BigNumber.from(69),
            contract_: nftContract,
            delegate: signer.address,
            type_: 3,
          },
        ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(false);
      });

      it('returns true when signer is Token authorized for NFT through intermediary with Wallet authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 3,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 1,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns true when signer is Contract authorized for NFT through intermediary with NFT token authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              contract_: nftContract,
              delegate: signer.address,
              type_: 2,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 3,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      it('returns true when signer is Wallet authorized for NFT through intermediary with NFT token authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 1,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: nftContract,
              delegate: intermediary.address,
              type_: 3,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(true);
      });

      xit('returns false when signer is authorized for NFT Contract through intermediary but with unrelated NFT contract authorization from owner', async () => {
        getAllDelegationsMock
          .mockReturnValueOnce([
            {
              vault: intermediary.address,
              tokenId,
              contract_: nftContract,
              delegate: signer.address,
              type_: 2,
            },
          ])
          .mockReturnValueOnce([
            {
              vault: owner.address,
              tokenId,
              contract_: '0xUnrelatedNFTContract',
              delegate: intermediary.address,
              type_: 2,
            },
          ]);

        const tree = new DelegationTree(
          provider,
          nftContract,
          tokenId,
          signer.address,
        );

        const authorized = await tree.hasDelegatedOwnership(owner.address);
        expect(authorized).toBe(false);
      });
    });
  });
});
