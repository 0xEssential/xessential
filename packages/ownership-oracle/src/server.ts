import 'dotenv/config';

import * as rpc from 'json-rpc2';

import { OwnershipService } from './OwnershipService';

const server = rpc.Server.$create({
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

server.expose('durin_call', async ({ callData, to, abi }, _opt, callback) => {
  try {
    const ownershipService = new OwnershipService(
      abi,
      process.env.INFURA_API_KEY,
    );

    const proof = await ownershipService.processCall(callData, to);
    callback(null, proof);
  } catch (error) {
    callback(new rpc.Error.InternalError(error.message));
  }
});

server.listen(process.env.PORT);

export { server };
