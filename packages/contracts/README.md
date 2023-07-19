# @0xessential/contracts

This repo contains the Solidity source code for the contracts used in 0xEssential's [Cross-Chain Token Gating](https://0xessential.gitbook.io/cross-chain-token-gating/) meta-transaction stack.

The contracts are available as an NPM package and can also be installed as a Foundry dependency.

0xEssential provides deployed versions of `EssentialForwarder` on Polygon's Mumbai testnet and Matic mainnet.

Developers are also free to deploy their own versions of `EssentialForwarder` - you may want to deploy your own version so that you can change the `domainName` that is displayed to users when signing a meta-transaction with their wallet.

## Install

With NPM:

```bash
  yarn add @0xessential/contracts
```

With Foundry:

```bash

```

Then add the following line to your `remappings.txt`:

```txt
essential-contracts/=lib/essential-contracts/
```

## Use Deployed Instances

If you're building a layer 2 contract that uses Cross-Chain Token Gating and don't wish to customize the domain name displayed to users, you need to inherit `EssentialERC2771Context` in your contract. We also provide `EssentialERC2771ContextUpgradeable` if your contract is an upgradeable proxy.

```solidity
pragma solidity ^0.8.13;

import "essential-contracts/contracts/fwd/EssentialERC2771Context.sol";

contract MyContract is EssentialERC2771Context {}
```

Then add the `EssentialERC2771Context` constructor call:

```solidity
  constructor(address trustedForwarder) EssentialERC2771Context(trustedForwarder) {
```

The canonical `EssentialForwarder` is deployed at the same address across every chain we support.

The current initCode hash is `0x834bf54c861481fbb7ba3ceeef86d59b15b883a6d3253e970c5b7ca60609a96e` and the deployment salt is `0x00000000000000000000000000000000000000003db581b25d19d926ebb359e5`.


ssh into box and:

```bash
sudo apt install build-essential -y; curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y; source "$HOME/.cargo/env"; git clone https://github.com/0age/create2crunch && cd create2crunch; sed -i 's/0x4/0x40/g' src/lib.rs
```

Search code:

```bash
export FACTORY="0x0000000000ffe8b47b3e2130213b802212439497"; export CALLER="0x0000000000000000000000000000000000000000"; export INIT_CODE_HASH="0x834bf54c861481fbb7ba3ceeef86d59b15b883a6d3253e970c5b7ca60609a96e"; export LEADING=5; export TOTAL=7; cargo run --release $FACTORY $CALLER $INIT_CODE_HASH 0 $LEADING $TOTAL

```


| Salt | Address |
| ---- | ------- |
| `0x0000000000000000000000000000000000000000a042c0199a3d6239c5ccf27a` | `0x00000000004307Adf270507a12b88D3827DbfdFB` |


| Network | Address | name|
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Goerli  | [`0x00000000002679091dE1205C3938017357f3c99A`](https://goerli.etherscan.io/address/0x00000000002679091dE1205C3938017357f3c99A) |  EssentialForwarder |
| Mumbai  | [`0x00000000002679091dE1205C3938017357f3c99A`](https://mumbai.polygonscan.com/address/0x00000000002679091dE1205C3938017357f3c99A) |  EssentialForwarder |



Additional `EssentialForwarder` instances are available at the following addresses. You will need the `name` value in your frontend.

| Network | Address | name|
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Mumbai  | [`0x9928351FD354D4E45416fc53e90457a428960cF4`](https://mumbai.polygonscan.com/address/0x9928351FD354D4E45416fc53e90457a428960cF4) |  0xEssential Playsession |
| Mainnet | [`0x9bbb4217115B7296630183Bb23703DEC93E8edCf`](https://polygonscan.com/address/0x9bbb4217115B7296630183Bb23703DEC93E8edCf) |  0xEssential Playsession |

## Deploy Your Own

If you require customizing the name of the forwarder shown to users when signing meta-transactions, you need to deploy your own version of an `EssentialForwarder`.

You can do this by creating your own contract that inherits `EssentialForwarder` and calls its constructor with your custom name:

```solidity
pragma solidity ^0.8.13;

import "@0xessential/contracts/fwd/EssentialForwarder.sol";

contract MyCustomForwarder is EssentialForwarder {
  constructor(string[] memory _urls) 
  EssentialForwarder("My Custom Forwarder Name", _urls)
  {}
}

```

The `_urls` constructor argument is an array of HTTPS URLs that serve 0xEssential's open source Ownership Lookup RPC API.

You may specify the instance 0xEssential runs - `https://middleware.nfight.xyz` or see that repo for deploying your own version.



0x0000000000000000000000000000000000000000d8724606d6c6b206c677709a => 0x00000000001B9253e5a902C1faD28A38dC548189 => 0x000000000000000000000000000000000000000042c3e59ccf965e0df244eac9 => 0x0000000000D55106fB51fa554c01C42f34A479A0 => 000000000000000000000000000000000000000063d82632211b062e637c31d0 => 0xcdAbaf697D6a0000d577799100420061f9000000 => 579260x00000000000000000000000000000000000000003d00268426b90e1fb00307d6 => 0x0000000000d67908ba64Dc033b083B955fbb3040 => 655360x0000000000000000000000000000000000000000799364801a1bba3beb6e1993 => 0x0000000000C6370a95f3CbbA09Fa55c3DB7c3E55 => 655360x0000000000000000000000000000000000000000fd57bea649f44f1f90773462 => 0xe80000bd6F1187f2cBBb00Cc0000427929420000 => 57926
0x0000000000000000000000000000000000000000ebee31073f8def353f978a6a => 0x00000000009C8549957056De5C303DaB3A6475A4 => 655360x0000000000000000000000000000000000000000cdf2ae97e8f90a2de8798dba => 0x0000000000c9522Fd5C3C9b39D670A5c3aE302F5 => 655360x0000000000000000000000000000000000000000a6a3831796200727d909e00a => 0x8D99cd00CD00F700006ce8e6321CF70800000037 => 579260x000000000000000000000000000000000000000060ba24aab2701d03ad143173 => 0x00000000008E23b1cCA2433f1b113d1C83e71B12 => 655360x0000000000000000000000000000000000000000d104f38eea385a29243219f7 => 0x00Cf0097000ed29D735A00d2006a00003f8F75A4 => 1653500x00000000000000000000000000000000000000009212e53f4f5bdb22054f31b1 => 0x000000000066b3aED7Ae8263588dA67fF381FfCa => 655360x00000000000000000000000000000000000000006fc175e81d10c0220a1f6b1d => 0x009c34000093dB4f30b217BB000000e89C0047D5 => 1653500x00000000000000000000000000000000000000002cae954110fc2414973562cf => 0x140b4f838600030000794b5100000000e7db15D3 => 579260x0000000000000000000000000000000000000000e6605379c5571b1c353bcc7f => 0x535a0000f794007EAaD00007976200004D180055 => 579260x000000000000000000000000000000000000000011e15a891fcc3d16f4f8979b => 0x0000000000bAD0DA367CaFf515AB13780bED79d6 => 655360x00000000000000000000000000000000000000001dd4ecea00b8a13247d50c46 => 0xF6fc57000000f9860000882b69000B8f9bb90066 => 579260x000000000000000000000000000000000000000076751b0b4aa39908058b003d => 0x004E2D3C871600000200B4bD5c00005fC30fCC00 => 1653500x0000000000000000000000000000000000000000ed0342707c92c82022960016 => 0x39c40048a7006028b10000CcD171c30082080000 => 579260x0000000000000000000000000000000000000000ad709ede1c587b2f791a586b => 0xaf4700411Da50065C0b700917E0000007b082C00 => 57926
0x00000000000000000000000000000000000000008434a1ea79d55c3c98f0151b => 0x007734df340f00E4Ea000D008200004F2e0ff700 => 1653500x0000000000000000000000000000000000000000c8bda925ed31a833df7ff5d0 => 0x35426Ab9000c30000034005377001fFbDa3E0000 => 579260x00000000000000000000000000000000000000003513382bdadd4a367e7bd1cf => 0x0000000000cc6Db3fC501b64CecF177BD7B124e0 => 655360x000000000000000000000000000000000000000021590d8cfeccd60d56c91d56 => 0x82CE00004a97df8700004c003400E3a4B72C7B00 => 579260x0000000000000000000000000000000000000000f258d58e690c700728f70d3b => 0x001B009168854D00Ea00D03200430013e2c300eD => 165350
0x0000000000000000000000000000000000000000620149b1c7af1702efadaed8 => 0x00000000008c07E6045E2607351802EaBcF646DA => 65536
0x0000000000000000000000000000000000000000d1e068253a736710113ddc8c => 0x117800001418000039911BD137b0cE4E0000d700

0x0000000000000000000000000000000000000000a042c0199a3d6239c5ccf27a => 0x00000000004307Adf270507a12b88D3827DbfdFB

0x0000000000000000000000000000000000000000aa32dbc56439bc1e6cb0c2fc => 0x00FE0000C6677Fab8700770000a736AC008bb509 => 165350
0x0000000000000000000000000000000000000000c53d82c3cfc7a93fffa3091c => 0x000000000064726Fa6E8908659ffd79e82a3D4BB => 65536

0x0000000000000000000000000000000000000000ba4966ccb99b0d3b4d2ba993 => 0x0000000000612f432C402387610ea92954bcd35f => 65536