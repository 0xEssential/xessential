import { BigNumber, Wallet } from 'ethers';
import request from 'supertest';

import { testServer } from '../src/testServer';
import { OffchainLookupData } from '../src/types';
import { mockOffchainLookupData } from '../src/utils';

const server = testServer();
const signer = Wallet.createRandom();
const authorizer = Wallet.createRandom();
const NFTContract = Wallet.createRandom();

const processCallMock = jest.fn();
jest.mock('../src/OwnershipService', () => {
  const originalModule = jest.requireActual('../src/OwnershipService');

  return {
    ...originalModule,
    OwnershipService: jest.fn().mockImplementation(() => {
      return {
        processCall: processCallMock,
      };
    }),
  };
});

const offchainLookupData: OffchainLookupData = {
  from: signer.address,
  authorizer: authorizer.address,
  nonce: BigNumber.from(1),
  nftChainId: BigNumber.from(1),
  nftContract: NFTContract.address,
  nftTokenId: BigNumber.from(1),
  targetChainId: BigNumber.from(1),
  timestamp: BigNumber.from(Math.floor(Date.now() / 1000)),
};

describe('durin_call endpoint', () => {
  it('returns a proof if signer is owner or authorized', async () => {
    processCallMock.mockResolvedValue('gud proof');

    const callData = mockOffchainLookupData(offchainLookupData);
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'durin_call',
      params: {
        callData,
        to: '',
        abi: '',
      },
    });

    const response = await request(server).post('/durin_call').send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('result', 'gud proof');
  });

  it('returns an error if signer is neither owner nor authorized', async () => {
    processCallMock.mockRejectedValue(new Error('bad proof'));

    const callData = mockOffchainLookupData(offchainLookupData);
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'durin_call',
      params: {
        callData,
        to: '',
        abi: '',
      },
    });

    const response = await request(server).post('/durin_call').send(body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('error.message', 'bad proof');
  });
});
