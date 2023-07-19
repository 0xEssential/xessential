import * as http from 'http';

import { server } from './server';

export const testServer = () => {
  const rpcMiddleware = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): void => {
    server.handleHttp(req, res);
  };

  return http.createServer(rpcMiddleware);
};
