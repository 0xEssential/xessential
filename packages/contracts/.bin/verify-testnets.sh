#!/bin/sh
source .env
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 5 $1 EssentialForwarder $ETHERSCAN_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 420 $1 EssentialForwarder $OPTIMISM_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 43113 $1 EssentialForwarder $AVAX_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 80001 $1 EssentialForwarder $POLYGONSCAN_API_KEY
forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 421613 --verifier-url https://api-goerli.arbiscan.io/api $1 EssentialForwarder $ARBISCAN_API_KEY
# forge verify-contract --constructor-args 0000000000000000000000002ce6bd653220436eb8f35e146b0dd1a6013e97a7 --watch --chain 421613 --verifier-url https://api-goerli.basescan.org/api $1 EssentialForwarder $ARBISCAN_API_KEY