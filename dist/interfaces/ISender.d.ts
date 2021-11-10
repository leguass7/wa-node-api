import type { CancelToken, CancelTokenSource } from 'axios';
import { IResultError } from '.';
import type { IResponseSending } from './IResponseSending';
export interface ICancelSource {
    idToken: CancelToken | string;
    source: CancelTokenSource;
}
export interface IForWhoFilter {
    whatsapp?: string;
    contactId?: string;
    externalId?: number | string;
    brCpf?: string;
}
export declare type ForWhoType = IForWhoFilter | string;
export interface IAllowedExt {
    file: string[];
    image: string[];
    sound: string[];
    video: string[];
}
export interface ISender {
    /**
     * @param force Force interaction with API server
     * @method isReady
     */
    isReady: (force?: boolean) => Promise<boolean>;
    sendFile: (forWho: IForWhoFilter | string, urlFile: string) => Promise<IResponseSending | IResultError>;
    sendSound: (forWho: IForWhoFilter | string, urlSound: string) => Promise<IResponseSending | IResultError>;
    /**
     * Send plain text to recipient
     * @method sendText
     */
    sendText: (forWho: IForWhoFilter | string, text: string) => Promise<IResponseSending | IResultError>;
    /**
     * Send single image
     * - Maxbot does not support image with text
     * @method sendText
     */
    sendImage: (forWho: IForWhoFilter | string, urlImage: string, text?: string) => Promise<IResponseSending | IResultError>;
    /**
     * Send single video
     * - Maxbot does not support image with text
     * @method sendText
     */
    sendVideo: (forWho: IForWhoFilter | string, urlVideo: string, text?: string) => Promise<IResponseSending | IResultError>;
}
