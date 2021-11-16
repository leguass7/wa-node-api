import { AxiosRequestConfig } from 'axios';
import type { IResponseSending, IReponseDepartment, IReponseContacts, IReponseAttendants, IContactFilter } from '../../interfaces/index';
import { BaseProvider } from '../BaseProvider';
import type { ForWhoType, IProvider } from '../BaseProvider/IProvider';
import { ReqType } from './constants';
import type { SacDigitalOptions } from './types/api';
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
    sendText(contactId: ForWhoType, text: string): Promise<IResponseSending>;
    sendImage(contactId: ForWhoType, urlImage: string, text?: string): Promise<IResponseSending>;
    sendFile(contactId: ForWhoType, urlFile: string): Promise<IResponseSending>;
    sendSound(contactId: ForWhoType, urlSound: string): Promise<IResponseSending>;
    sendVideo(contactId: ForWhoType, urlVideo: string): Promise<IResponseSending>;
    getServiceSector(): Promise<IReponseDepartment>;
    getContacts(filter: IContactFilter): Promise<IReponseContacts>;
    getAttendant(): Promise<IReponseAttendants>;
}
