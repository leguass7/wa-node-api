import { AxiosInstance } from 'axios';
import type { IResponseSending, ForWhoType, ISender, IResultError } from '../../interfaces/index';
import { ReqType } from './constants';
import type { MaxbotOptions } from './types/api';
import type { IResponseStatus } from './types/status';
/**
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
export declare class Maxbot implements ISender {
    Api: AxiosInstance;
    private cancelSources;
    private config;
    private loggingPrefix;
    private ready;
    private allowedExt;
    constructor(options: MaxbotOptions);
    private log;
    private buildError;
    private getCancelToken;
    private addCancelSource;
    private removeCancelSource;
    private configureRequests;
    private configureResponses;
    private configureAxios;
    private isValidPayload;
    apiPost(type: ReqType, payload?: {}): Promise<any>;
    /**
     * Cancel all requests to `Maxbot` server
     * @method cancelAll
     */
    cancelAll(): this;
    getStatus(): Promise<IResponseStatus>;
    isReady(force?: boolean): Promise<boolean>;
    sendText(whatsapp: ForWhoType, text: string): Promise<IResponseSending | IResultError>;
    sendImage(whatsapp: ForWhoType, urlImage: string, _text?: string): Promise<IResponseSending | IResultError>;
    sendFile(whatsapp: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError>;
    sendSound(whatsapp: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError>;
    sendVideo(whatsapp: ForWhoType, urlVideo: string, _text?: string): Promise<IResponseSending | IResultError>;
}
