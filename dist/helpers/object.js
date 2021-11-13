"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
function isObject(value) {
    return (typeof value === 'object' &&
        value !== null &&
        !(value instanceof RegExp) &&
        !(value instanceof Error) &&
        !(value instanceof Date) &&
        !Array.isArray(value));
}
exports.isObject = isObject;
