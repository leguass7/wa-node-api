"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseURL = exports.ReqType = void 0;
const baseURL = 'https://api.sac.digital/v2/client';
exports.baseURL = baseURL;
let ReqType;
exports.ReqType = ReqType;

(function (ReqType) {
  ReqType["NOTIFICATION"] = "notification/contact";
})(ReqType || (exports.ReqType = ReqType = {}));