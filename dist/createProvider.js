"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMaxbotProvider = createMaxbotProvider;
exports.createProvider = createProvider;
exports.createSacDigitalProvider = createSacDigitalProvider;

var _Maxbot = require("./providers/Maxbot");

var _SacDigital = require("./providers/SacDigital");

/**
 * Factory of new provider
 * @function createProvider
 */
// export function createProvider(provider: 'maxbot', options: MaxbotOptions): Maxbot | IProvider;
// export function createProvider(provider: 'sacdigital', options: SacDigitalOptions): SacDigital | IProvider;
function createProvider(provider, options) {
  if (provider === 'maxbot') return new _Maxbot.Maxbot(options);
  if (provider === 'sacdigital') return new _SacDigital.SacDigital(options);
  throw new TypeError('undefined provider');
}
/**
 * Factory of new Maxbot provider
 * @function createMaxbotProvider
 */


function createMaxbotProvider(options) {
  return new _Maxbot.Maxbot(options);
}
/**
 * Factory of new SacDigital provider
 * @function createSacDigitalProvider
 */


function createSacDigitalProvider(options) {
  return new _SacDigital.SacDigital(options);
}