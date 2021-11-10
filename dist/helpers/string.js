"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractExtension = extractExtension;
exports.isValidExt = isValidExt;
exports.replaceAll = replaceAll;

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