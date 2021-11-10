import axios, { AxiosInstance, CancelToken, CancelTokenSource } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { isWebUri } from 'valid-url';

import decamelcase from '@helpers/decamelcase';
import { onResponseError } from '@helpers/onResponseError';
import { extractExtension, isValidExt } from '@helpers/string';
import type {
  IResponseSending,
  ICancelSource,
  ForWhoType,
  ISender,
  IResultError,
  IAllowedExt,
} from '@interfaces/index';

import { ReqType, baseURL } from './constants';
import { forWhoFilterDto, responseSendingDto } from './dto';
import type {
  IMaxbotRequestSendFile,
  IMaxbotRequestSendImage,
  IMaxbotRequestSendSound,
  IMaxbotRequestSendText,
  IMaxbotRequestSendVideo,
} from './types';
import type { MaxbotOptions } from './types/api';
import type { IResponseStatus } from './types/status';

/**
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
export class Maxbot implements ISender {
  public Api: AxiosInstance;
  private cancelSources: ICancelSource[];
  private config: MaxbotOptions;
  private loggingPrefix: string;
  private ready: boolean;
  private allowedExt: IAllowedExt;

  constructor(options: MaxbotOptions) {
    this.config = { token: '', timeout: 5000, baseURL, debug: false, ...options };
    this.ready = false;
    this.loggingPrefix = 'Maxbot';
    this.Api = axios.create();
    this.cancelSources = [];

    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: [],
    };

    return this.configureAxios();
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

  private configureRequests() {
    this.Api.interceptors.request.use(config => {
      config.headers['user-agent'] = `wa-node-api/1.0 (+https://github.com/leguass7/wa-node-api.git)`;

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

  private isValidPayload(url: string, type?: keyof IAllowedExt): { extension: string; url: string } {
    const extension = url && extractExtension(url);
    return !!(isWebUri(url) && isValidExt(extension, this.allowedExt, type)) ? { extension, url } : null;
  }

  async apiPost(type: ReqType, payload = {}) {
    const source = this.getCancelToken();
    const cancelToken = source.token;
    this.addCancelSource(source);

    const result = await this.Api.post(
      null,
      { cmd: type, token: this.config.token, ...payload },
      { timeout: this.config.timeout, cancelToken },
    );

    this.removeCancelSource(cancelToken);
    return result as any;
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

  public async getStatus(): Promise<IResponseStatus> {
    const res = await this.apiPost(ReqType.GETSTATUS);
    return res as IResponseStatus;
  }

  async isReady(force?: boolean) {
    if (!this.config.token) return false;
    const check = async () => {
      try {
        const result = await this.getStatus();
        return !!(result && result.status);
      } catch (error) {
        return false;
      }
    };
    if (!!force || !this.ready) this.ready = await check();
    return !!this.ready;
  }

  async sendText(whatsapp: ForWhoType, text: string): Promise<IResponseSending | IResultError> {
    const filter = forWhoFilterDto(whatsapp);
    if (filter && text) {
      const payload: Partial<IMaxbotRequestSendText> = { ...filter, msg: text };
      const res = await this.apiPost(ReqType.SENDTEXT, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }

  async sendImage(whatsapp: ForWhoType, urlImage: string, _text?: string): Promise<IResponseSending | IResultError> {
    const filter = forWhoFilterDto(whatsapp);
    const validPayload = this.isValidPayload(urlImage, 'image');
    if (filter && validPayload) {
      const payload: Partial<IMaxbotRequestSendImage> = {
        ...filter,
        imageUrl: urlImage,
        imageExtension: validPayload.extension,
      };
      const res = await this.apiPost(ReqType.SENDIMAGE, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }

  async sendFile(whatsapp: ForWhoType, urlFile: string): Promise<IResponseSending | IResultError> {
    const filter = forWhoFilterDto(whatsapp);
    const validPayload = this.isValidPayload(urlFile, 'file');
    if (filter && validPayload) {
      const payload: Partial<IMaxbotRequestSendFile> = {
        ...filter,
        fileUrl: urlFile,
        fileExtension: validPayload.extension,
      };
      const res = await this.apiPost(ReqType.SENDFILE, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }

  async sendSound(whatsapp: ForWhoType, urlSound: string): Promise<IResponseSending | IResultError> {
    const filter = forWhoFilterDto(whatsapp);
    const validPayload = this.isValidPayload(urlSound, 'sound');
    if (filter && validPayload) {
      const payload: Partial<IMaxbotRequestSendSound> = {
        ...filter,
        soundUrl: urlSound,
        soundExtension: validPayload.extension,
      };
      const res = await this.apiPost(ReqType.SENDSOUND, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }

  async sendVideo(whatsapp: ForWhoType, urlVideo: string, _text?: string): Promise<IResponseSending | IResultError> {
    const filter = forWhoFilterDto(whatsapp);
    const validPayload = this.isValidPayload(urlVideo, 'sound');
    if (filter && validPayload) {
      const payload: Partial<IMaxbotRequestSendVideo> = {
        ...filter,
        videoUrl: urlVideo,
        videoExtension: validPayload.extension,
      };
      const res = await this.apiPost(ReqType.SENDSOUND, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }
}
