"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decamelcaseStr = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const object_1 = require("./object");
function decamelcaseStr(text, separator = '_') {
    if (typeof text === 'string') {
        return text
            .replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, `$1${separator}$2`)
            .replace(/(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu, `$1${separator}$2`)
            .toLowerCase();
    }
    return text;
}
exports.decamelcaseStr = decamelcaseStr;
function decamelcase(input) {
    function mapObject(obj) {
        const ret = {};
        Object.keys(obj).forEach(key => {
            const k = decamelcaseStr(key);
            // @ts-ignore
            ret[k] = (0, object_1.isObject)(obj[key]) ? mapObject(obj[key]) : obj[key];
        });
        return ret;
    }
    if (Array.isArray(input)) {
        // @ts-ignore
        return input.map(obj => decamelcase(obj));
    }
    if (!(0, object_1.isObject)(input))
        return decamelcaseStr(`${input}`);
    return mapObject(input);
}
exports.default = decamelcase;
