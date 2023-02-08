import { ContractInterface } from 'ethers';
import { abi } from '../abi/EssentialForwarder.js';
export interface EssentialForwarderDeployment {
    address: string;
    abi: ContractInterface;
}
export { abi };
export declare const EssentialForwarderDeployments: Record<string | number, EssentialForwarderDeployment>;
