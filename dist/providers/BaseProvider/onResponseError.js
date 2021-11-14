"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringResponseData = exports.onResponseError = void 0;
const string_1 = require("../../helpers/string");
async function onResponseError(error) {
    const response = error && error?.response;
    const statusHttp = response && parseInt(`${response?.status || 0}`, 10);
    const result = { status: false, message: 'Timeout' };
    if (!response)
        return Promise.resolve({ data: result });
    if (typeof response === 'string') {
        const data = Object.assign({}, result, convertStringResponseData(response));
        return Promise.resolve({ data });
    }
    result.message = `httpError ${statusHttp}`;
    return Promise.resolve({ data: result });
}
exports.onResponseError = onResponseError;
function convertStringResponseData(str) {
    const [result = {}] = (0, string_1.extractJSON)(str);
    return { ...result, message: 'bad formatted' };
}
exports.convertStringResponseData = convertStringResponseData;
