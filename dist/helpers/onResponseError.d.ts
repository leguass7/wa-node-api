import { AxiosError } from 'axios';
import type { IResultError } from '../interfaces/IResultError';
export declare function onResponseError(error?: AxiosError): Promise<IResultError>;
