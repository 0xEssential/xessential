import { ContractInterface } from 'ethers';

import { abi } from '../abi/EssentialForwarder.js';

const MUMBAI_ADDRESS = '0x000000000066b3aed7ae8263588da67ff381ffca';
const MATIC_ADDRESS = '0x000000000066b3aed7ae8263588da67ff381ffca';

export interface EssentialForwarderDeployment {
  address: string;
  abi: ContractInterface;
}

export { abi };

export const EssentialForwarderDeployments: Record<
  string | number,
  EssentialForwarderDeployment
> = {
  matic: {
    address: MATIC_ADDRESS,
    abi,
  },
  mumbai: {
    address: MUMBAI_ADDRESS,
    abi,
  },
  137: {
    address: MATIC_ADDRESS,
    abi,
  },
  80001: {
    address: MUMBAI_ADDRESS,
    abi,
  },
  default: {
    address: '0x000000000066b3aed7ae8263588da67ff381ffca',
    abi,
  },
};
