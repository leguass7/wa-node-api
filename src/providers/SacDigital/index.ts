import { AxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { isWebUri } from 'valid-url';

import { extractExtension, formatTokenExp, isExpiredToken, isValidExt, querystring } from '@helpers/string';
import type { IResponseSending, IReponseDepartment, IReponseContacts, IReponseAttendants } from '@interfaces/index';

import { BaseProvider, IResultError } from '../BaseProvider';
import type { ForWhoType, IAllowedExt, IProvider } from '../BaseProvider/IProvider';
import { baseURL, ReqType, ScopeType } from './constants';
import {
  forWhoFilterDto,
  queryContactFilterDto,
  responseAttendantsDto,
  responseContactsDto,
  responseDepartmentsDto,
  responseSendingDto,
} from './dto';
import type { SacDigitalOptions, ISacDigitalResponseAuth } from './types/api';
import type { ISacDigitalContactFilter } from './types/contact';
import type { ISacDigitalResponseDepartments } from './types/department';
import type { ISacDigitalRequestSend } from './types/sending';

const defaultScopes: ScopeType[] = [
  'edit',
  'write',
  'import',
  'remove',
  'send',
  'contact',
  'channel',
  'department',
  'group',
  'tag',
  'operator',
  'protocol',
  'notification',
  'manager',
];

/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */
export class SacDigital extends BaseProvider implements IProvider {
  private authenticating: boolean;
  private config: SacDigitalOptions;
  private allowedExt: IAllowedExt;

  constructor(options: SacDigitalOptions) {
    super({ loggingPrefix: 'SacDigital', baseURL, timeout: 10000, debug: false, maxMinutes: 1440, ...options });

    this.config = { scopes: [...defaultScopes], token: '', ...options };
    this.authenticating = false;

    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: ['mp4'],
    };

    this.init().then(() => this.log('INIT'));
  }

  private async authorize() {
    try {
      this.authenticating = true;
      const response = await this.Api.post<any, { data: ISacDigitalResponseAuth }>(
        'auth2/login',
        {
          client: this.config.clientId,
          password: this.config.clientSecret,
          scopes: this.config.scopes,
        },
        { timeout: this.config.timeout },
      );
      this.authenticating = false;
      return response && response?.data ? camelcaseKeys(response.data) : null;
    } catch {
      this.authenticating = false;
      return null;
    }
  }

  private isValidPayload(url: string, type?: keyof IAllowedExt): boolean {
    const extension = url && extractExtension(url);
    return !!(isWebUri(url) && isValidExt(extension, this.allowedExt, type));
  }

  private isExpiredToken() {
    return isExpiredToken(this.config?.tokenExpireDate, this.config.maxMinutes);
  }

  private async init(): Promise<this> {
    if (!this.config.token) {
      const auth = await this.authorize();
      if (auth && auth.token) {
        const tokenExpireDate = formatTokenExp(auth?.expiresIn);

        this.config.token = auth.token;
        this.config.tokenExpireDate = tokenExpireDate;
        this.setApiToken({ token: auth.token, expires: auth.expiresIn, tokenExpireDate });
      }
    } else if (this.config?.tokenExpireDate) {
      if (this.isExpiredToken()) {
        this.config.token = '';
        return this.init();
      }
    } else {
      this.setApiToken(this.config.token);
    }

    if (this.config.token) {
      return this.configureAxios(this.config.token);
    }

    throw new TypeError('not authorized');
  }

  private async waitForAuthentication() {
    const check = () => Boolean(this.authenticating);

    const waitFlag = (cb: (value: unknown) => void) => {
      if (check()) setTimeout(() => waitFlag(cb), 10);
      else cb(true);
    };
    return new Promise<boolean>(resolve => waitFlag(resolve));
  }

  public async isReady(force?: boolean) {
    if (this.isExpiredToken()) {
      await this.init();
    } else {
      if (!!this.authenticating) await this.waitForAuthentication();
      else if (force) await this.init();
    }

    return !!this.config.token;
  }

  async apiPost(route: ReqType, payload: Record<string, any>, config: AxiosRequestConfig = {}) {
    const ready = await this.isReady();
    if (ready) {
      const source = this.getCancelToken();
      const cancelToken = source.token;
      this.addCancelSource(source);

      const result = await this.Api.post(route, payload, { timeout: this.config.timeout, cancelToken, ...config });

      this.removeCancelSource(cancelToken);
      return result as any;
    }
    return this.buildError('API is not ready');
  }

  async apiGet(route: ReqType, query?: Record<string, any>, config: AxiosRequestConfig = {}) {
    const ready = await this.isReady();
    if (ready) {
      const source = this.getCancelToken();
      const cancelToken = source.token;
      this.addCancelSource(source);

      const queryRoute = query ? `${route}?${querystring(query)}` : route;

      const result = await this.Api.get(queryRoute, { timeout: this.config.timeout, cancelToken, ...config });

      this.removeCancelSource(cancelToken);
      return result as any;
    }
    return this.buildError('API is not ready');
  }

  private async sendNotification(payload: ISacDigitalRequestSend): Promise<IResponseSending | IResultError> {
    try {
      const res = await this.apiPost(ReqType.NOTIFICATION, payload);

      return responseSendingDto(res);
    } catch {
      return this.buildError('unexpected error');
    }
  }

  public async sendText(contactId: ForWhoType, text: string): Promise<IResponseSending | IResultError> {
    const contact = forWhoFilterDto(contactId);
    if (contact && text) {
      const payload: ISacDigitalRequestSend = { contact, type: 'text', text };
      const res = await this.sendNotification(payload);
      return res;
    }
    return this.buildError('invalid payload');
  }

  async sendImage(contactId: ForWhoType, urlImage: string, text?: string): Promise<IResponseSending | IResultError> {
    const contact = forWhoFilterDto(contactId);

    if (contact && this.isValidPayload(urlImage, 'image')) {
      const payload: ISacDigitalRequestSend = { contact, type: 'image', url: urlImage };
      if (text) payload.text = text;
      const res = await this.sendNotification(payload);
      return res;
    }
    return this.buildError('invalid payload');
  }

  async sendFile(contactId: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError> {
    const contact = forWhoFilterDto(contactId);
    if (contact && this.isValidPayload(urlFile, 'file')) {
      const payload: ISacDigitalRequestSend = { contact, type: 'file', url: urlFile };
      const res = await this.sendNotification(payload);
      return res;
    }
    return this.buildError('invalid payload');
  }

  async sendSound(contactId: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError> {
    const contact = forWhoFilterDto(contactId);
    if (contact && this.isValidPayload(urlSound, 'sound')) {
      const payload: ISacDigitalRequestSend = { contact, type: 'audio', url: urlSound };
      const res = await this.sendNotification(payload);
      return res;
    }
    return this.buildError('invalid payload');
  }

  async sendVideo(contactId: ForWhoType, urlVideo: string): Promise<IResponseSending | IResultError> {
    const contact = forWhoFilterDto(contactId);
    if (contact && this.isValidPayload(urlVideo, 'video')) {
      const payload: ISacDigitalRequestSend = { contact, type: 'video', url: urlVideo };
      const res = await this.sendNotification(payload);
      return res;
    }
    return this.buildError('invalid payload');
  }

  async getServiceSector(): Promise<IReponseDepartment | IResultError> {
    const res: ISacDigitalResponseDepartments = await this.apiGet(ReqType.DEPARTMENT);
    return responseDepartmentsDto(res);
  }

  async getContact(filter: ISacDigitalContactFilter): Promise<IReponseContacts | IResultError> {
    const query = queryContactFilterDto(filter);
    const res = await this.apiGet(ReqType.GETCONTACT, query);
    return responseContactsDto(res);
  }

  async getAttendant(): Promise<IReponseAttendants | IResultError> {
    const res = await this.apiGet(ReqType.GETATTENDANT);
    return responseAttendantsDto(res);
  }
}
