import { AxiosError } from 'axios';
export interface IResultError {
    status: boolean | 0 | 1;
    message: string;
    response?: any;
}
export declare function onResponseError(error?: AxiosError): Promise<IResultError>;
export declare function convertStringResponseData<T = any>(str: string): T;
