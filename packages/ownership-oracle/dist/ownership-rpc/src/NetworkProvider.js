"use strict";
// src/NetworkProvider.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkProvider = exports.PROVIDERS = void 0;
var providers_1 = require("@ethersproject/providers");
var ethers_1 = require("ethers");
exports.PROVIDERS = {
    7700: 'https://canto.slingshot.finance/',
    740: 'https://eth.plexnode.wtf/',
    42170: 'https://nova.arbitrum.io/rpc',
};
var NetworkProvider = /** @class */ (function () {
    function NetworkProvider(apiKey) {
        this.infuraApiKey = apiKey;
    }
    NetworkProvider.prototype.getProvider = function (chainId) {
        var provider;
        switch (chainId) {
            case 7700:
            case 740:
            case 42170:
                provider = new ethers_1.providers.JsonRpcProvider(exports.PROVIDERS[chainId], chainId);
                break;
            default:
                provider = new providers_1.InfuraProvider(chainId, this.infuraApiKey);
                break;
        }
        return provider;
    };
    return NetworkProvider;
}());
exports.NetworkProvider = NetworkProvider;
