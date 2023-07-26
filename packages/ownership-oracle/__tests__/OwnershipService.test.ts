import { utils, Wallet } from 'ethers';

import { FORWARDER_ABI } from '../src/abis';
import { OwnershipService, rawCallDataType } from '../src/OwnershipService';

const hasDelegatedOwnershipMock = jest.fn();
jest.mock('../src/DelegationTree', () => {
  return {
    DelegationTree: jest.fn().mockImplementation(() => {
      return {
        hasDelegatedOwnership: hasDelegatedOwnershipMock,
      };
    }),
  };
});

const generateProofMock = jest.fn();
jest.mock('../src/ProofGenerator', () => {
  return {
    ProofGenerator: jest.fn().mockImplementation(() => {
      return {
        generateProof: generateProofMock,
      };
    }),
  };
});

describe('OwnershipService', () => {
  const ownershipService = new OwnershipService(
    JSON.stringify(FORWARDER_ABI),
    '',
  );

  const signer = Wallet.createRandom();
  const owner = Wallet.createRandom();

  const NFTContract = Wallet.createRandom();
  const GameContract = Wallet.createRandom();

  const abiCoder = new utils.AbiCoder();
  const to = GameContract.address;

  const callParams = {
    from: signer.address,
    authorizer: signer.address,
    nonce: 1,
    nftChainId: 1,
    nftContract: NFTContract.address,
    nftTokenId: 123,
    targetChainId: 1,
    timestamp: Math.floor(Date.now() / 1000),
  };
  const callData = abiCoder.encode(
    Object.values(rawCallDataType),
    Object.values(callParams),
  );

  let ownerSpy;

  describe('processCall', () => {
    beforeEach(() => {
      ownerSpy = jest
        .spyOn(Object.getPrototypeOf(ownershipService), 'fetchCurrentOwner')
        .mockImplementation(() => {
          return owner.address;
        });
    });

    it('should throw an error when not authorized', async () => {
      hasDelegatedOwnershipMock.mockResolvedValue(false);

      await expect(
        ownershipService.processCall(callData, to),
      ).rejects.toThrowError();

      ownerSpy.mockRestore();
    });

    it('should return a proof when authorized', async () => {
      hasDelegatedOwnershipMock.mockResolvedValue(true);
      generateProofMock.mockResolvedValue('gud proof');
      const proof = await ownershipService.processCall(callData, to);

      expect(proof).toEqual('gud proof');

      ownerSpy.mockRestore();
    });
  });
});
