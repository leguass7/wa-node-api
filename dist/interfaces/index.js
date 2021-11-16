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

var _IContact = require("./IContact");

Object.keys(_IContact).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IContact[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IContact[key];
    }
  });
});

var _IDepartment = require("./IDepartment");

Object.keys(_IDepartment).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IDepartment[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IDepartment[key];
    }
  });
});

var _IAttendant = require("./IAttendant");

Object.keys(_IAttendant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IAttendant[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IAttendant[key];
    }
  });
});