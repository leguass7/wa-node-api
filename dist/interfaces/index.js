"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IResponseSending = require("./IResponseSending");

Object.keys(_IResponseSending).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IResponseSending[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IResponseSending[key];
    }
  });
});

var _IResultError = require("./IResultError");

Object.keys(_IResultError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IResultError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IResultError[key];
    }
  });
});

var _ISender = require("./ISender");

Object.keys(_ISender).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ISender[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ISender[key];
    }
  });
});