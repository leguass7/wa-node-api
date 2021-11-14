import { parse, isValid, differenceInMinutes, addSeconds, format } from 'date-fns';

import { IAllowedExt } from '../providers/BaseProvider/IProvider';

export function isExpiredToken(expiresDate?: string, maxMinutes = 1440): boolean {
  if (!expiresDate) return false;
  const dateExp = parse(expiresDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  if (!isValid(dateExp)) return true;
  const diff = differenceInMinutes(dateExp, new Date());
  return !!(diff < maxMinutes);
}

export function formatTokenExp(expires = 0): string {
  const date = addSeconds(new Date(), expires);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

export function replaceAll(str: string, needle?: string | string[], replacement?: string): string {
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

export function extractExtension(url: string): string {
  return replaceAll(
    (url = url.substr(1 + url.lastIndexOf('/')).split('?')[0]).split('#')[0].substr(url.lastIndexOf('.')),
    '.',
    '',
  );
}

export function isValidExt(extension: string, allowedExt: IAllowedExt, type?: keyof IAllowedExt) {
  const ext = replaceAll(extension, '.', '');
  if (!type) {
    const testAll: string[] = Object.keys(allowedExt).reduce((all, key) => {
      allowedExt[key].forEach((e: string) => all.push(e));
      return all;
    }, [] as string[]);
    return testAll.includes(ext);
  }
  return !!allowedExt[type].includes(ext);
}

export function querystring(str?: Record<string, any>): string;
export function querystring(str?: string): Record<string, string>;
export function querystring(str?: any): any {
  if (typeof str === 'string') {
    const keys = `${str}`.split('&'); // ['key=value']
    const obj = keys.reduce((acc: Record<string, string>, keyValue) => {
      const [k, v] = `${keyValue}`.split('='); // [key, value]
      if (k) {
        acc[k] = v || '';
      }
      return acc;
    }, {});
    return obj;
  } else if (typeof str === 'object') {
    return Object.keys(str)
      .map(k => {
        return `${k}=${str[k]}`;
      })
      .join('&');
  }
}

export function extractJSON(str: string): [any, ...number[]] | [] {
  let firstOpen: number;
  let firstClose: number;
  let candidate: string;

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
