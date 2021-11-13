"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSacDigitalProvider = exports.createMaxbotProvider = exports.createProvider = void 0;
const Maxbot_1 = require("./providers/Maxbot");
const SacDigital_1 = require("./providers/SacDigital");
/**
 * Factory of new provider
 * @function createProvider
 */
// export function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot | IProvider;
// export function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital | IProvider;
function createProvider(provider, options) {
    if (provider === 'maxbot')
        return new Maxbot_1.Maxbot(options);
    if (provider === 'sacdigital')
        return new SacDigital_1.SacDigital(options);
    throw new TypeError('undefined provider');
}
exports.createProvider = createProvider;
/**
 * Factory of new Maxbot provider
 * @function createMaxbotProvider
 */
function createMaxbotProvider(options) {
    return new Maxbot_1.Maxbot(options);
}
exports.createMaxbotProvider = createMaxbotProvider;
/**
 * Factory of new SacDigital provider
 * @function createSacDigitalProvider
 */
function createSacDigitalProvider(options) {
    return new SacDigital_1.SacDigital(options);
}
exports.createSacDigitalProvider = createSacDigitalProvider;
