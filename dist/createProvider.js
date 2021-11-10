"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProvider = createProvider;

var _Maxbot = require("./providers/Maxbot");

var _SacDigital = require("./providers/SacDigital");

function createProvider(provider, options) {
  if (provider === 'maxbot') return new _Maxbot.Maxbot(options);
  if (provider === 'sacdigital') return new _SacDigital.SacDigital(options);
  throw new TypeError('undefined provider');
}