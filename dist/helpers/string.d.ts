import { IAllowedExt } from '../providers/BaseProvider/IProvider';
export declare function replaceAll(str: string, needle?: string | string[], replacement?: string): string;
export declare function extractExtension(url: string): string;
export declare function isValidExt(extension: string, allowedExt: IAllowedExt, type?: keyof IAllowedExt): boolean;
export declare function querystring(str?: Record<string, any>): string;
export declare function querystring(str?: string): Record<string, string>;
export declare function extractJSON(str: string): [any, ...number[]] | [];
