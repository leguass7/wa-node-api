import { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { IResponseSending, ISender, IResultError, ForWhoType } from '../../interfaces/index';
import { ReqType } from './constants';
import type { SacDigitalOptions } from './types/api';
/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */
export declare class SacDigital implements ISender {
    Api: AxiosInstance;
    private authenticating;
    private cancelSources;
    private config;
    private loggingPrefix;
    private allowedExt;
    constructor(options: SacDigitalOptions);
    private log;
    private buildError;
    private getCancelToken;
    private addCancelSource;
    private removeCancelSource;
    private authorize;
    private configureRequests;
    private configureResponses;
    private configureAxios;
    private isValidPayload;
    private init;
    /**
     * Cancel all requests to `Maxbot` server
     * @method cancelAll
     */
    cancelAll(): this;
    private waitAuth;
    isReady(force?: boolean): Promise<boolean>;
    apiPost(route: ReqType, payload?: {}, config?: AxiosRequestConfig): Promise<any>;
    private sendNotification;
    sendText(contactId: ForWhoType, text: string): Promise<IResponseSending | IResultError>;
    sendImage(contactId: ForWhoType, urlImage: string, text?: string): Promise<IResponseSending | IResultError>;
    sendFile(contactId: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError>;
    sendSound(contactId: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError>;
    sendVideo(contactId: ForWhoType, urlVideo: string): Promise<IResponseSending | IResultError>;
}
