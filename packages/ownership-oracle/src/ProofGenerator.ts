import { BigNumber, Contract, utils, Wallet } from 'ethers';

import { NetworkProvider } from './NetworkProvider';
import { RawCalldata } from './OwnershipService';

class ProofGenerator {
  constructor(private networkProvider: NetworkProvider, private abi: string) {}

  public async generateProof(
    decodedCallData: RawCalldata,
    owner: string,
    to: string,
  ): Promise<string> {
    const {
      nftChainId,
      nftContract,
      nftTokenId,
      from,
      targetChainId,
      timestamp,
      nonce,
    } = decodedCallData;

    const targetProvider = this.networkProvider.getProvider(
      targetChainId.toNumber(),
    );

    const forwarder = new Contract(to, this.abi, targetProvider);

    await this.verifyNonce(forwarder, from, nonce);

    const message = await forwarder.createMessage(
      from,
      owner,
      nonce,
      nftChainId,
      nftContract,
      nftTokenId,
      timestamp,
    );

    const ownershipSigner = new Wallet(
      process.env.OWNERSHIP_SIGNER_PRIVATE_KEY,
    );
    return ownershipSigner.signMessage(utils.arrayify(message));
  }

  private async verifyNonce(
    forwarder: Contract,
    from: string,
    nonce: BigNumber,
  ): Promise<void> {
    const currentNonce = await forwarder.getNonce(from);

    if (!nonce.eq(currentNonce)) throw new Error('Invalid nonce');
  }
}

export { ProofGenerator };
