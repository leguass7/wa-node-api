"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJSON = exports.querystring = exports.isValidExt = exports.extractExtension = exports.replaceAll = void 0;
function replaceAll(str, needle, replacement) {
    if (!str)
        return '';
    if (Array.isArray(needle)) {
        let rtn = `${str}`;
        for (let i = 0; i < needle.length; i++) {
            rtn = replaceAll(rtn, needle[i], replacement);
        }
        return rtn;
    }
    return str.split(`${needle}`).join(replacement);
}
exports.replaceAll = replaceAll;
function extractExtension(url) {
    return replaceAll((url = url.substr(1 + url.lastIndexOf('/')).split('?')[0]).split('#')[0].substr(url.lastIndexOf('.')), '.', '');
}
exports.extractExtension = extractExtension;
function isValidExt(extension, allowedExt, type) {
    const ext = replaceAll(extension, '.', '');
    if (!type) {
        const testAll = Object.keys(allowedExt).reduce((all, key) => {
            allowedExt[key].forEach((e) => all.push(e));
            return all;
        }, []);
        return testAll.includes(ext);
    }
    return !!allowedExt[type].includes(ext);
}
exports.isValidExt = isValidExt;
function querystring(str) {
    if (typeof str === 'string') {
        const keys = `${str}`.split('&'); // ['key=value']
        const obj = keys.reduce((acc, keyValue) => {
            const [k, v] = `${keyValue}`.split('='); // [key, value]
            if (k) {
                acc[k] = v || '';
            }
            return acc;
        }, {});
        return obj;
    }
    else if (typeof str === 'object') {
        return Object.keys(str)
            .map(k => {
            return `${k}=${str[k]}`;
        })
            .join('&');
    }
}
exports.querystring = querystring;
function extractJSON(str) {
    let firstOpen;
    let firstClose;
    let candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
        firstClose = str.lastIndexOf('}');
        if (firstClose <= firstOpen)
            return [];
        do {
            candidate = str.substring(firstOpen, firstClose + 1);
            try {
                const res = JSON.parse(candidate);
                return [res, firstOpen, firstClose + 1];
            }
            catch (_e) { }
            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while (firstClose > firstOpen);
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while (firstOpen != -1);
}
exports.extractJSON = extractJSON;
