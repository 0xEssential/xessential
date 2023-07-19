"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnershipService = exports.rawCallDataType = void 0;
var ethers_1 = require("ethers");
var abis_1 = require("./abis");
var DelegationTree_1 = require("./DelegationTree");
var NetworkProvider_1 = require("./NetworkProvider");
var ProofGenerator_1 = require("./ProofGenerator");
exports.rawCallDataType = {
    from: 'address',
    authorizer: 'address',
    nonce: 'uint256',
    nftChainId: 'uint256',
    nftContract: 'address',
    nftTokenId: 'uint256',
    targetChainId: 'uint256',
    timestamp: 'uint256',
};
var OwnershipService = /** @class */ (function () {
    function OwnershipService(_abi, apiKey) {
        this._abi = _abi;
        this.abi = _abi;
        this.networkProvider = new NetworkProvider_1.NetworkProvider(apiKey);
        this.proofGenerator = new ProofGenerator_1.ProofGenerator(this.networkProvider, this.abi);
    }
    OwnershipService.prototype.processCall = function (callData, to) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedCallData, nftChainId, nftContract, nftTokenId, from, authorizer, owner, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decodedCallData = this.decodeCalldata(callData);
                        nftChainId = decodedCallData.nftChainId, nftContract = decodedCallData.nftContract, nftTokenId = decodedCallData.nftTokenId, from = decodedCallData.from, authorizer = decodedCallData.authorizer;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(nftChainId.eq(0) &&
                            nftTokenId.eq(0) &&
                            nftContract === ethers_1.constants.AddressZero)) return [3 /*break*/, 2];
                        owner = from; // ???
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.fetchCurrentOwnerOrDelegate(nftChainId, nftContract, nftTokenId, from, authorizer)];
                    case 3:
                        owner = _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        throw new Error('Error fetching owner');
                    case 6: return [2 /*return*/, this.proofGenerator.generateProof(decodedCallData, owner, to)];
                }
            });
        });
    };
    OwnershipService.prototype.decodeCalldata = function (calldata) {
        var abi = new ethers_1.utils.AbiCoder();
        var decoded = abi.decode(Object.values(exports.rawCallDataType), calldata);
        return Object.keys(exports.rawCallDataType).reduce(function (obj, key, index) {
            var _a;
            return (__assign(__assign({}, obj), (_a = {}, _a[key] = decoded[index], _a)));
        }, {});
    };
    OwnershipService.prototype.fetchCurrentOwnerOrDelegate = function (nftChainId, nftContract, tokenId, from, authorizer) {
        return __awaiter(this, void 0, void 0, function () {
            var nftChainProvider, owner, delegationTree, authorizedRecursively;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nftChainProvider = this.networkProvider.getProvider(nftChainId.toNumber());
                        return [4 /*yield*/, this.fetchCurrentOwner(nftChainProvider, nftContract, tokenId)];
                    case 1:
                        owner = _a.sent();
                        console.warn('ONCHAIN OWNER: ', owner);
                        if (owner === from && from === authorizer) {
                            console.warn('OWNER === AUTHORIZER === FROM');
                            return [2 /*return*/, owner];
                        }
                        delegationTree = new DelegationTree_1.DelegationTree(nftChainProvider, nftContract, tokenId, from);
                        return [4 /*yield*/, delegationTree.hasDelegatedOwnership(authorizer)];
                    case 2:
                        authorizedRecursively = _a.sent();
                        if (authorizedRecursively) {
                            console.warn('AUTHORIZED RECURSIVELY');
                            return [2 /*return*/, authorizer];
                        }
                        throw new Error('Not owner or delegate');
                }
            });
        });
    };
    OwnershipService.prototype.fetchCurrentOwner = function (provider, nftContract, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var Erc721;
            return __generator(this, function (_a) {
                Erc721 = new ethers_1.Contract(nftContract, abis_1.OWNER_ABI, provider);
                return [2 /*return*/, Erc721.ownerOf(tokenId)];
            });
        });
    };
    return OwnershipService;
}());
exports.OwnershipService = OwnershipService;
