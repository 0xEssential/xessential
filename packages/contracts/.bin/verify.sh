#!/bin/sh
source .env
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 1 $1 EssentialForwarder $ETHERSCAN_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 10 $1 EssentialForwarder $OPTIMISM_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 43114 $1 EssentialForwarder $AVAX_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 137 $1 EssentialForwarder $POLYGONSCAN_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 42161 --verifier-url https://arbiscan.io/api $1 EssentialForwarder $ARBISCAN_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 42170 --verifier-url https://api-nova.arbiscan.io/api $1 EssentialForwarder $ARBISCAN_NOVA_API_KEY