import type { IResponseSending, IReponseContacts, IReponseAttendants, IReponseDepartment, IContactFilter } from '../../interfaces/index';
import { BaseProvider, IResultError } from '../BaseProvider';
import { ForWhoType, IProvider } from '../BaseProvider/IProvider';
import { ReqType } from './constants';
import type { MaxbotOptions } from './types/api';
import type { IResponseStatus } from './types/status';
/**
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
export declare class Maxbot extends BaseProvider implements IProvider {
    private config;
    private ready;
    private allowedExt;
    constructor(options: MaxbotOptions);
    private isValidPayload;
    apiPost(type: ReqType, payload?: {}): Promise<any>;
    getStatus(): Promise<IResponseStatus>;
    isReady(force?: boolean): Promise<boolean>;
    sendText(whatsapp: ForWhoType, text: string): Promise<IResponseSending | IResultError>;
    sendImage(whatsapp: ForWhoType, urlImage: string, _text?: string): Promise<IResponseSending | IResultError>;
    sendFile(whatsapp: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError>;
    sendSound(whatsapp: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError>;
    sendVideo(whatsapp: ForWhoType, urlVideo: string, _text?: string): Promise<IResponseSending | IResultError>;
    getServiceSector(): Promise<IReponseDepartment>;
    getContacts(filter: IContactFilter): Promise<IReponseContacts>;
    getAttendant(): Promise<IReponseAttendants>;
}
