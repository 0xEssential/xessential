// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {EssentialForwarder} from "../contracts/fwd/EssentialForwarder.sol";
import "forge-std/Test.sol";
import "forge-std/console.sol";

interface ImmutableCreate2Factory {
    function safeCreate2(bytes32 salt, bytes calldata initCode) external payable returns (address deploymentAddress);

    function findCreate2Address(bytes32 salt, bytes calldata initCode)
        external
        view
        returns (address deploymentAddress);

    function findCreate2AddressViaHash(bytes32 salt, bytes32 initCodeHash)
        external
        view
        returns (address deploymentAddress);
}

contract Deploy is Script {
    ImmutableCreate2Factory immutable factory = ImmutableCreate2Factory(0x0000000000FFe8B47B3e2130213B802212439497);
    bytes byteCode = type(EssentialForwarder).creationCode;
    bytes initCode = abi.encodePacked(byteCode, abi.encode(0x2cE6BD653220436eB8f35E146B0Dd1a6013E97a7));

    bytes32 salt = 0x00000000000000000000000000000000000000009212e53f4f5bdb22054f31b1;

    function run() external {
        // deployChain("arbitrum-mainnet");
        // deployChain("arbitrum-nova");
        // deployChain("polygon-mainnet");
        // deployChain("avalanche-mainnet");
        deployChain("optimism-mainnet");
        // deployChain("mainnet");
    }

    function deployChain(string memory chain) internal {
        vm.createSelectFork(vm.rpcUrl(chain));
        vm.startBroadcast();

        try factory.safeCreate2(salt, initCode) returns (address forwarderAddress) {
            EssentialForwarder polygon = EssentialForwarder(forwarderAddress);
            console2.log(address(polygon));
        } catch Error(string memory reason) {
            console2.log(reason);
        }

        vm.stopBroadcast();
    }
}
