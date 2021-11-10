import { IAllowedExt } from '../interfaces';

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
