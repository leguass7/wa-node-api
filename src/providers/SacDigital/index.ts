import axios, { AxiosInstance, AxiosRequestConfig, CancelToken, CancelTokenSource } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { isWebUri } from 'valid-url';

import decamelcase from '@helpers/decamelcase';
import { onResponseError } from '@helpers/onResponseError';
import { extractExtension, isValidExt } from '@helpers/string';
import type {
  IResponseSending,
  ISender,
  ICancelSource,
  IResultError,
  IAllowedExt,
  ForWhoType,
} from '@interfaces/index';

import { baseURL, ReqType } from './constants';
import { forWhoFilterDto, responseSendingDto } from './dto';
import type { SacDigitalOptions, ISacDigitalResponseAuth } from './types/api';
import type { ISacDigitalRequestSend } from './types/sending';

/**
 * Class to interact with SacDigital server
 * - https://sac.digital/
 * @see https://alertrack.docs.apiary.io/#introduction
 */
export class SacDigital implements ISender {
  public Api: AxiosInstance;
  private authenticating: boolean;
  private cancelSources: ICancelSource[];
  private config: SacDigitalOptions;
  private loggingPrefix: string;
  private allowedExt: IAllowedExt;

  constructor(options: SacDigitalOptions) {
    this.config = { token: '', timeout: 10000, debug: false, baseURL, ...options };
    this.authenticating = false;
    this.loggingPrefix = 'SacDigital';
    this.Api = axios.create({ baseURL });
    this.cancelSources = [];
    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: ['mp4'],
    };

    if (!this.config.token) this.init().then(() => this.log('INIT'));
  }

  private log(...args: any[]) {
    if (this.config.debug) {
      // eslint-disable-next-line no-console
      console.log(this.loggingPrefix, ...args, '\n');
    }
  }

  private buildError(message: string): IResultError {
    return { status: false, message };
  }

  private getCancelToken(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  private addCancelSource(source: CancelTokenSource) {
    this.cancelSources.push({
      idToken: source.token,
      source,
    });
    return this;
  }

  private removeCancelSource(idTokenSource?: string | CancelToken) {
    if (idTokenSource) {
      const newList = this.cancelSources.filter(({ idToken }) => idToken !== idTokenSource);
      this.cancelSources = newList || [];
      return this;
    }
    this.cancelSources = [];
    return this;
  }

  private async authorize() {
    try {
      this.authenticating = true;
      const response = await this.Api.post<any, { data: ISacDigitalResponseAuth }>(
        'auth2/login',
        {
          client: this.config.clientId,
          password: this.config.clientSecret,
          scopes: ['manager', 'send', 'contact', 'import', 'notification'],
        },
        { timeout: this.config.timeout },
      );
      this.authenticating = false;
      return response && response.data;
    } catch (error) {
      this.authenticating = false;
      return null;
    }
  }

  private configureRequests() {
    const token = `Bearer ${this.config.token}`;
    this.Api.interceptors.request.use(config => {
      config.headers['user-agent'] = `wa-node-api/1.0 (+https://github.com/leguass7/wa-node-api.git)`;
      if (token) config.headers['authorization'] = token;

      config.data = decamelcase(config.data);
      this.log('REQUEST:', config.data);
      return config;
    });
    return this;
  }

  private configureResponses() {
    this.Api.interceptors.response.use(response => {
      this.log('RESPONSE:', response.data || response);
      return camelcaseKeys(response.data, { deep: true });
    }, onResponseError);
    return this;
  }

  private configureAxios() {
    this.Api = axios.create({ baseURL: this.config.baseURL });
    return this.configureRequests().configureResponses();
  }

  private isValidPayload(url: string, type?: keyof IAllowedExt): boolean {
    const extension = url && extractExtension(url);
    return !!(isWebUri(url) && isValidExt(extension, this.allowedExt, type));
  }

  private async init() {
    const auth = await this.authorize();
    if (auth && auth.token) this.config.token = auth.token;
    return this.configureAxios();
  }

  /**
   * Cancel all requests to `Maxbot` server
   * @method cancelAll
   */
  public cancelAll() {
    this.cancelSources.forEach(({ source }) => source && source.cancel());
    this.removeCancelSource();
    return this;
  }

  private async waitAuth() {
    const check = () => Boolean(this.authenticating);

    const waitFlag = (cb: (value: unknown) => void) => {
      if (check()) setTimeout(() => waitFlag(cb), 10);
      else cb(true);
    };
    return new Promise<boolean>(resolve => waitFlag(resolve));
  }

  public async isReady(force?: boolean) {
    if (!!this.authenticating) await this.waitAuth();
    else if (force) await this.init();
    return !!this.config.token;
  }

  async apiPost(route: ReqType, payload = {}, config: AxiosRequestConfig = {}) {
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

  private async sendNotification(payload: ISacDigitalRequestSend): Promise<IResponseSending | IResultError> {
    try {
      const res = await this.apiPost(ReqType.NOTIFICATION, payload);
      return responseSendingDto(res);
    } catch (error) {
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
}
