"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORWARDER_ABI = exports.OWNER_ABI = exports.REGISTRY_ABI = void 0;
exports.REGISTRY_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'delegate',
                type: 'address',
            },
            { indexed: false, internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'DelegateForAll',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'delegate',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'contract_',
                type: 'address',
            },
            { indexed: false, internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'DelegateForContract',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'delegate',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'contract_',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            { indexed: false, internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'DelegateForToken',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
        ],
        name: 'RevokeAllDelegates',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'vault',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'delegate',
                type: 'address',
            },
        ],
        name: 'RevokeDelegate',
        type: 'event',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'address', name: 'vault', type: 'address' },
        ],
        name: 'checkDelegateForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'address', name: 'vault', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
        ],
        name: 'checkDelegateForContract',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'address', name: 'vault', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'checkDelegateForToken',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'delegateForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
            { internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'delegateForContract',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bool', name: 'value', type: 'bool' },
        ],
        name: 'delegateForToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
        name: 'getContractLevelDelegations',
        outputs: [
            {
                components: [
                    { internalType: 'address', name: 'contract_', type: 'address' },
                    { internalType: 'address', name: 'delegate', type: 'address' },
                ],
                internalType: 'struct IDelegationRegistry.ContractDelegation[]',
                name: 'contractDelegations',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
        name: 'getDelegatesForAll',
        outputs: [
            { internalType: 'address[]', name: 'delegates', type: 'address[]' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'vault', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
        ],
        name: 'getDelegatesForContract',
        outputs: [
            { internalType: 'address[]', name: 'delegates', type: 'address[]' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'vault', type: 'address' },
            { internalType: 'address', name: 'contract_', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'getDelegatesForToken',
        outputs: [
            { internalType: 'address[]', name: 'delegates', type: 'address[]' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'delegate', type: 'address' }],
        name: 'getDelegationsByDelegate',
        outputs: [
            {
                components: [
                    {
                        internalType: 'enum IDelegationRegistry.DelegationType',
                        name: 'type_',
                        type: 'uint8',
                    },
                    { internalType: 'address', name: 'vault', type: 'address' },
                    { internalType: 'address', name: 'delegate', type: 'address' },
                    { internalType: 'address', name: 'contract_', type: 'address' },
                    { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                ],
                internalType: 'struct IDelegationRegistry.DelegationInfo[]',
                name: 'info',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
        name: 'getTokenLevelDelegations',
        outputs: [
            {
                components: [
                    { internalType: 'address', name: 'contract_', type: 'address' },
                    { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                    { internalType: 'address', name: 'delegate', type: 'address' },
                ],
                internalType: 'struct IDelegationRegistry.TokenDelegation[]',
                name: 'tokenDelegations',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'revokeAllDelegates',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'delegate', type: 'address' }],
        name: 'revokeDelegate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'vault', type: 'address' }],
        name: 'revokeSelf',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
];
exports.OWNER_ABI = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'idsToRights',
        outputs: [
            { internalType: 'address', name: 'depositor', type: 'address' },
            { internalType: 'uint96', name: 'expiration', type: 'uint96' },
            { internalType: 'address', name: 'contract_', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
exports.FORWARDER_ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'initialOwner',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'InternalTransactionFailure',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidOwnership',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidSignature',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'string[]',
                name: 'urls',
                type: 'string[]',
            },
            {
                internalType: 'bytes',
                name: 'callData',
                type: 'bytes',
            },
            {
                internalType: 'bytes4',
                name: 'callbackFunction',
                type: 'bytes4',
            },
            {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
            },
        ],
        name: 'OffchainLookup',
        type: 'error',
    },
    {
        inputs: [],
        name: 'Unauthorized',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'previousAdminRole',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'newAdminRole',
                type: 'bytes32',
            },
        ],
        name: 'RoleAdminChanged',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
        ],
        name: 'RoleGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
        ],
        name: 'RoleRevoked',
        type: 'event',
    },
    {
        inputs: [],
        name: 'ADMIN_ROLE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'DelegationRegistry',
        outputs: [
            {
                internalType: 'contract IDelegationRegistry',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: '_domainSeparatorV4',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'signer',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'authorizer',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'nftChainId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'nftContract',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
        ],
        name: 'createMessage',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'authorizer',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'targetChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gas',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IForwardRequest.ForwardRequest',
                name: 'req',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
        ],
        name: 'execute',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'response',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
            },
        ],
        name: 'executeWithProof',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'response',
                type: 'bytes',
            },
            {
                internalType: 'bytes',
                name: 'extraData',
                type: 'bytes',
            },
        ],
        name: 'executeWithProofNative',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getChainId',
        outputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
        ],
        name: 'getNonce',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
        ],
        name: 'getRoleAdmin',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'hasRole',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'ownershipSigner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'authorizer',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'nftContract',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftTokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'targetChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gas',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IForwardRequest.ERC721ForwardRequest',
                name: 'req',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
        ],
        name: 'preflight',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'authorizer',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'nftContract',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftTokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'targetChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gas',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IForwardRequest.ERC721ForwardRequest',
                name: 'req',
                type: 'tuple',
            },
        ],
        name: 'preflightNative',
        outputs: [],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'registry',
                type: 'address',
            },
        ],
        name: 'setDelegationRegistry',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newSigner',
                type: 'address',
            },
        ],
        name: 'setOwnershipSigner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string[]',
                name: '_urls',
                type: 'string[]',
            },
        ],
        name: 'setUrls',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4',
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'urls',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'authorizer',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'targetChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gas',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IForwardRequest.ForwardRequest',
                name: 'req',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
        ],
        name: 'verify',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'from',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'authorizer',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'to',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'nftContract',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftTokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nftChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'targetChainId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gas',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'nonce',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                internalType: 'struct IForwardRequest.ERC721ForwardRequest',
                name: 'req',
                type: 'tuple',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
            },
        ],
        name: 'verifyOwnershipProof',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
