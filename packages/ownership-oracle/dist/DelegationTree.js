"use strict";
// src/DelegationTree.ts
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
exports.DelegationTree = void 0;
var ethers_1 = require("ethers");
var abis_1 = require("./abis");
var REGISTRY_ADDRESS = '0x00000000000076A84feF008CDAbe6409d2FE638B';
var DELEGATION_TYPES;
(function (DELEGATION_TYPES) {
    DELEGATION_TYPES[DELEGATION_TYPES["NONE"] = 0] = "NONE";
    DELEGATION_TYPES[DELEGATION_TYPES["ALL"] = 1] = "ALL";
    DELEGATION_TYPES[DELEGATION_TYPES["CONTRACT"] = 2] = "CONTRACT";
    DELEGATION_TYPES[DELEGATION_TYPES["TOKEN"] = 3] = "TOKEN";
})(DELEGATION_TYPES || (DELEGATION_TYPES = {}));
var DelegationTree = /** @class */ (function () {
    function DelegationTree(provider, nftContract, tokenId, rootAddress) {
        var _this = this;
        this.nftContract = nftContract;
        this.tokenId = tokenId;
        this.Registry = new ethers_1.Contract(REGISTRY_ADDRESS, abis_1.REGISTRY_ABI, provider);
        this.rootNode = {
            address: rootAddress,
            fetchAuthorizers: function () {
                return _this.fetchAuthorizersAsync({ address: rootAddress });
            },
        };
    }
    DelegationTree.prototype.hasDelegatedOwnership = function (authorizer) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.findNodeAsync(this.rootNode, function (node) { return node.address === authorizer; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DelegationTree.prototype.findNodeAsync = function (root, condition) {
        return __awaiter(this, void 0, void 0, function () {
            var children, _i, children_1, child, foundNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (condition(root))
                            return [2 /*return*/, root];
                        if (!root.fetchAuthorizers) return [3 /*break*/, 5];
                        return [4 /*yield*/, root.fetchAuthorizers()];
                    case 1:
                        children = _a.sent();
                        _i = 0, children_1 = children;
                        _a.label = 2;
                    case 2:
                        if (!(_i < children_1.length)) return [3 /*break*/, 5];
                        child = children_1[_i];
                        return [4 /*yield*/, this.findNodeAsync(child, condition)];
                    case 3:
                        foundNode = _a.sent();
                        if (foundNode)
                            return [2 /*return*/, foundNode];
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: throw new Error('Node not found');
                }
            });
        });
    };
    DelegationTree.prototype.fetchAuthorizersAsync = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var allDelegations, promises, validDelegations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Registry.getDelegationsByDelegate(node.address)];
                    case 1:
                        allDelegations = _a.sent();
                        allDelegations.filter(function (node) {
                            if (node.type === DELEGATION_TYPES.ALL)
                                return true;
                            if (node.type === DELEGATION_TYPES.CONTRACT) {
                                return node.contract_ === _this.nftContract;
                            }
                            return node.tokenId === _this.tokenId;
                        });
                        promises = allDelegations.map(function (delegation) { return __awaiter(_this, void 0, void 0, function () {
                            var vault, nodeDelegated;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        vault = delegation.vault;
                                        return [4 /*yield*/, this.Registry.checkDelegateForToken(node.address, vault, this.nftContract, this.tokenId)];
                                    case 1:
                                        nodeDelegated = _a.sent();
                                        if (nodeDelegated) {
                                            return [2 /*return*/, {
                                                    address: vault,
                                                    fetchAuthorizers: function () {
                                                        return _this.fetchAuthorizersAsync({
                                                            address: vault,
                                                        });
                                                    },
                                                }];
                                        }
                                        return [2 /*return*/, null];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        validDelegations = (_a.sent()).filter(Boolean);
                        console.warn('VALID DELEGATIONS: ', allDelegations.map(function (d) { return ({
                            vault: d.vault,
                        }); }));
                        return [2 /*return*/, validDelegations];
                }
            });
        });
    };
    return DelegationTree;
}());
exports.DelegationTree = DelegationTree;
