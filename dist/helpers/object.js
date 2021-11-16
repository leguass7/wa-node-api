"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;

function isObject(value) {
  return typeof value === 'object' && value !== null && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date) && !Array.isArray(value);
}