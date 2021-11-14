"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpiredToken = exports.formatTokenExp = exports.decamelcase = exports.createSacDigitalProvider = exports.createMaxbotProvider = exports.createProvider = exports.authScopes = exports.SacDigital = exports.Maxbot = void 0;
// Maxbot
var Maxbot_1 = require("./providers/Maxbot");
Object.defineProperty(exports, "Maxbot", { enumerable: true, get: function () { return Maxbot_1.Maxbot; } });
// SacDigital
var SacDigital_1 = require("./providers/SacDigital");
Object.defineProperty(exports, "SacDigital", { enumerable: true, get: function () { return SacDigital_1.SacDigital; } });
var constants_1 = require("./providers/SacDigital/constants");
Object.defineProperty(exports, "authScopes", { enumerable: true, get: function () { return constants_1.authScopes; } });
var createProvider_1 = require("./createProvider");
Object.defineProperty(exports, "createProvider", { enumerable: true, get: function () { return createProvider_1.createProvider; } });
Object.defineProperty(exports, "createMaxbotProvider", { enumerable: true, get: function () { return createProvider_1.createMaxbotProvider; } });
Object.defineProperty(exports, "createSacDigitalProvider", { enumerable: true, get: function () { return createProvider_1.createSacDigitalProvider; } });
//Helpers
var decamelcase_1 = require("./helpers/decamelcase");
Object.defineProperty(exports, "decamelcase", { enumerable: true, get: function () { return decamelcase_1.decamelcase; } });
var string_1 = require("./helpers/string");
Object.defineProperty(exports, "formatTokenExp", { enumerable: true, get: function () { return string_1.formatTokenExp; } });
Object.defineProperty(exports, "isExpiredToken", { enumerable: true, get: function () { return string_1.isExpiredToken; } });
