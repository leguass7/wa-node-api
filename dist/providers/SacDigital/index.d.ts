import { AxiosRequestConfig } from 'axios';
import type { IResponseSending, IReponseDepartment, IReponseContacts, IReponseAttendants } from '../../interfaces/index';
import { BaseProvider, IResultError } from '../BaseProvider';
import type { ForWhoType, IProvider } from '../BaseProvider/IProvider';
import { ReqType } from './constants';
import type { SacDigitalOptions } from './types/api';
import type { ISacDigitalContactFilter } from './types/contact';
/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */
export declare class SacDigital extends BaseProvider implements IProvider {
    private authenticating;
    private config;
    private allowedExt;
    constructor(options: SacDigitalOptions);
    private authorize;
    private isValidPayload;
    private isExpiredToken;
    private init;
    private waitForAuthentication;
    isReady(force?: boolean): Promise<boolean>;
    apiPost(route: ReqType, payload: Record<string, any>, config?: AxiosRequestConfig): Promise<any>;
    apiGet(route: ReqType, query?: Record<string, any>, config?: AxiosRequestConfig): Promise<any>;
    private sendNotification;
    sendText(contactId: ForWhoType, text: string): Promise<IResponseSending | IResultError>;
    sendImage(contactId: ForWhoType, urlImage: string, text?: string): Promise<IResponseSending | IResultError>;
    sendFile(contactId: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError>;
    sendSound(contactId: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError>;
    sendVideo(contactId: ForWhoType, urlVideo: string): Promise<IResponseSending | IResultError>;
    getServiceSector(): Promise<IReponseDepartment | IResultError>;
    getContact(filter: ISacDigitalContactFilter): Promise<IReponseContacts | IResultError>;
    getAttendant(): Promise<IReponseAttendants | IResultError>;
}
