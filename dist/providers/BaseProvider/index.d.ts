import { AxiosInstance, CancelToken, CancelTokenSource } from 'axios';
import { IResultError } from './onResponseError';
export { IResultError };
export interface BaseProviderOptions {
    loggingPrefix: string;
    baseURL: string;
    debug?: boolean;
    timeout: number;
}
export declare class BaseProvider {
    private debug;
    private loggingPrefix;
    private cancelSources;
    readonly Api: AxiosInstance;
    constructor(options: BaseProviderOptions);
    protected log(...args: any[]): void;
    protected buildError(message: string): IResultError;
    protected getCancelToken(): CancelTokenSource;
    protected addCancelSource(source: CancelTokenSource): void;
    protected removeCancelSource(idTokenSource?: string | CancelToken): this;
    protected configureResponses(): this;
    protected configureRequests(token?: string): this;
    protected configureAxios(token?: string): this;
    setApiToken(token: string): void;
    /**
     * Cancel all requests to `Maxbot` server
     * @method cancelAll
     */
    cancelAll(): void;
}
