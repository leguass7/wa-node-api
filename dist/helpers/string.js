"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractExtension = extractExtension;
exports.extractJSON = extractJSON;
exports.formatTokenExp = formatTokenExp;
exports.isExpiredToken = isExpiredToken;
exports.isValidExt = isValidExt;
exports.querystring = querystring;
exports.replaceAll = replaceAll;

var _dateFns = require("date-fns");

function isExpiredToken(expiresDate, maxMinutes = 1440) {
  if (!expiresDate) return false;
  const dateExp = (0, _dateFns.parse)(expiresDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  if (!(0, _dateFns.isValid)(dateExp)) return true;
  const diff = (0, _dateFns.differenceInMinutes)(dateExp, new Date());
  return !!(diff < maxMinutes);
}

function formatTokenExp(expires = 0) {
  const date = (0, _dateFns.addSeconds)(new Date(), expires);
  return (0, _dateFns.format)(date, 'yyyy-MM-dd HH:mm:ss');
}

function replaceAll(str, needle, replacement) {
  if (!str) return '';

  if (Array.isArray(needle)) {
    let rtn = `${str}`;

    for (let i = 0; i < needle.length; i++) {
      rtn = replaceAll(rtn, needle[i], replacement);
    }

    return rtn;
  }

  return str.split(`${needle}`).join(replacement);
}

function extractExtension(url) {
  return replaceAll((url = url.substr(1 + url.lastIndexOf('/')).split('?')[0]).split('#')[0].substr(url.lastIndexOf('.')), '.', '');
}

function isValidExt(extension, allowedExt, type) {
  const ext = replaceAll(extension, '.', '');

  if (!type) {
    const testAll = Object.keys(allowedExt).reduce((all, key) => {
      allowedExt[key].forEach(e => all.push(e));
      return all;
    }, []);
    return testAll.includes(ext);
  }

  return !!allowedExt[type].includes(ext);
}

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
  } else if (typeof str === 'object') {
    return Object.keys(str).map(k => {
      return `${k}=${str[k]}`;
    }).join('&');
  }
}

function extractJSON(str) {
  let firstOpen;
  let firstClose;
  let candidate;
  firstOpen = str.indexOf('{', firstOpen + 1);

  do {
    firstClose = str.lastIndexOf('}');
    if (firstClose <= firstOpen) return [];

    do {
      candidate = str.substring(firstOpen, firstClose + 1);

      try {
        const res = JSON.parse(candidate);
        return [res, firstOpen, firstClose + 1];
      } catch (_e) {}

      firstClose = str.substr(0, firstClose).lastIndexOf('}');
    } while (firstClose > firstOpen);

    firstOpen = str.indexOf('{', firstOpen + 1);
  } while (firstOpen != -1);
}