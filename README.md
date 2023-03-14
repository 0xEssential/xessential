# 0xEssential Tooling

0xEssential's tooling helps developers build apps in the Ethereum ecosystem with great user experience.

The core offering is **NFT Global Entry**, a full stack solution for building L2 contracts that depend on NFT ownership from other EVM chains. Instead of bridging NFTs to use them in games or other low-value transactions, Global Entry allows for _crosschain token gating_ - the token stays on the chain it belongs, and use a cheaper, faster chain as an execution layer for game, governance or other logic.

Our full-stack solution also supports:

- **MultiChain Connections** - build dapps that seamlessly use multiple chains
- **Gasless Transactions** - pay gas fees for your user's transactions
- **Burner Wallets** - skip wallet popups to keep users in flow when submitting gasless transactions
- **Account Delegation** - keep users in vault context when connected to a hot or burner wallet

You can mix and match these capabilities based on your needs, with or without Global Entry. Every component is free, permissionless, EIP-standards based and open-source. Our SDKs are built on top of the tools you already use for easy adoption and no vendor lock-in. You can use our deployed contracts and APIs, our deploy your own.

Visit our docs for a deeper introduction to NFT Global Entry and our other capabilities.

## Supported Chains

The `EssentialForwarder` contract is deployed on the following EVM chains at `0x000000000066b3aED7Ae8263588dA67fF381FfCa`.

### mainnets

- [Optimism](https://optimistic.etherscan.io/address/0x000000000066b3aED7Ae8263588dA67fF381FfCa)
- [Arbitrum One](https://arbiscan.io/address/0x000000000066b3aED7Ae8263588dA67fF381FfCa)
- [Arbitrum Nova](https://nova.arbiscan.io/address/0x000000000066b3aED7Ae8263588dA67fF381FfCa)
- [Avalanche C-Chain](https://snowtrace.io/address/0x000000000066b3aED7Ae8263588dA67fF381FfCa)
- [Polygon](https://polygonscan.com/address/0x000000000066b3aED7Ae8263588dA67fF381FfCa)

### testnets

- Ethereum goerli
- Optimism goerli
- Polygon Mumbai

### deploy yourself

The contracts package includes the source code and Foundry deployment scripts for deploying `EssentialForwarder` to additional EVM chains at the same address. You can also use the source code to deploy your own version at a new address and custom name - be sure to provide the address and name to the client SDK.

## Contract Integration

Depending on which features you plan to use, your contracts require certain capabilities. In some cases 0xEssential's tooling will work with contracts that are already deployed.

For NFT Global Entry, you must inherit `EssentialContext` in your Layer 2 contract. Global Entry supports any spec-compliant ERC-721 NFT from any EVM chain - NFT contracts do not require any changes.

Contract requirements for Gasless Transactions, Account Delegation and Burner Wallets depend on your specific use-case.

Frontend apps can also use the `react` package for functionality like reading blockchain or indexer state from a Delegated Account without any contract changes.

[View contracts Readme](./packages/contracts/README.md)

## Client Packages

The client tooling is split into two ESM packages - `@xessential/react` and `@xessential/signer`.

### react

The `react` package offers React hooks based on `wagmi` that superpower your dapp - make it easy for users to connect a hot wallet, use their vault's holdings with NFT Global Entry, submit network-agnostic meta-transactions, or choose to switch chains and submit direct transactions. No matter how you or your users want to transact `@xessential/react` has got your back.

[View react Readme](./packages/react/README.md)

### signer

The `signer` package offers a Signer based on `ethers` and utilities that can be used in any Node environment.

If you're using the `react` package you won't need to deal with the `signer` package directly.
