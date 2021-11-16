"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStringResponseData = convertStringResponseData;
exports.onResponseError = onResponseError;

var _string = require("../../helpers/string");

async function onResponseError(error) {
  const response = error && (error === null || error === void 0 ? void 0 : error.response);
  const statusHttp = response && parseInt(`${(response === null || response === void 0 ? void 0 : response.status) || 0}`, 10);
  const result = {
    status: false,
    message: 'Timeout'
  };
  if (!response) return Promise.resolve({
    data: result
  });

  if (typeof response === 'string') {
    const data = Object.assign({}, result, convertStringResponseData(response));
    return Promise.resolve({
      data
    });
  }

  if (typeof (response === null || response === void 0 ? void 0 : response.data) === 'string') {
    const data = Object.assign({}, result, convertStringResponseData(response === null || response === void 0 ? void 0 : response.data));
    return Promise.resolve({
      data
    });
  }

  result.message = `httpError ${statusHttp}`;
  return Promise.resolve({
    data: result
  });
}

function convertStringResponseData(str) {
  const [result = {}] = (0, _string.extractJSON)(str);
  return { ...result,
    message: 'bad formatted'
  };
}