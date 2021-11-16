import type { CancelToken, CancelTokenSource } from 'axios';

import type { IContactFilter, IReponseContacts, IReponseDepartment, IResponseSending } from '@interfaces/index';

import { TokenStore } from '.';

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

export type ForWhoType = IForWhoFilter | string;

export interface IAllowedExt {
  file: string[];
  image: string[];
  sound: string[];
  video: string[];
}

export interface IProvider {
  /** Cancel all pending requests */
  cancelAll: () => void;

  /** Force a token for API */
  setApiToken: (token: string) => void;
  getApiToken: () => TokenStore;

  /**
   * @param force Force interaction with API server
   * @method isReady
   */
  isReady: (force?: boolean) => Promise<boolean>;
  sendFile: (forWho: IForWhoFilter | string, urlFile: string) => Promise<IResponseSending>;
  sendSound: (forWho: IForWhoFilter | string, urlSound: string) => Promise<IResponseSending>;
  /**
   * Send plain text to recipient
   * @method sendText
   */
  sendText: (forWho: IForWhoFilter | string, text: string) => Promise<IResponseSending>;

  /**
   * Send single image
   * - Maxbot does not support image with text
   * @method sendText
   */
  sendImage: (forWho: IForWhoFilter | string, urlImage: string, text?: string) => Promise<IResponseSending>;

  /**
   * Send single video
   * - Maxbot does not support image with text
   * @method sendText
   */
  sendVideo: (forWho: IForWhoFilter | string, urlVideo: string, text?: string) => Promise<IResponseSending>;

  getServiceSector: () => Promise<IReponseDepartment>;
  getContacts: (filter: IContactFilter) => Promise<IReponseContacts>;
}
