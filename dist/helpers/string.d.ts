import { IAllowedExt } from '../interfaces';
export declare function replaceAll(str: string, needle?: string | string[], replacement?: string): string;
export declare function extractExtension(url: string): string;
export declare function isValidExt(extension: string, allowedExt: IAllowedExt, type?: keyof IAllowedExt): boolean;
