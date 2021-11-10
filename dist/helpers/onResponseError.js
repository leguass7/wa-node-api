"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onResponseError = onResponseError;

async function onResponseError(error) {
  const response = error && (error === null || error === void 0 ? void 0 : error.response);
  const statusHttp = response && parseInt(`${(response === null || response === void 0 ? void 0 : response.status) || 0}`, 10);
  const result = {
    status: false,
    message: 'Timeout',
    response: response && (response === null || response === void 0 ? void 0 : response.data) || null
  };
  if (!response) return Promise.resolve(result);
  result.message = `httpError ${statusHttp}`;
  return Promise.resolve(result);
}