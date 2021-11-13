import { isWebUri } from 'valid-url';

import { extractExtension, isValidExt } from '@helpers/string';
import type { IResponseSending, IReponseContacts, IReponseAttendants, IReponseDepartment } from '@interfaces/index';

import { BaseProvider, IResultError } from '../BaseProvider';
import { ForWhoType, IAllowedExt, IProvider } from '../BaseProvider/IProvider';
import { ReqType, baseURL } from './constants';
import {
  forWhoFilterDto,
  responseAttendantsDto,
  responseContactsDto,
  responseSendingDto,
  responseServiceSectorDto,
} from './dto';
import type {
  IMaxbotRequestSendFile,
  IMaxbotRequestSendImage,
  IMaxbotRequestSendSound,
  IMaxbotRequestSendText,
  IMaxbotRequestSendVideo,
} from './types';
import type { MaxbotOptions } from './types/api';
import type { IMaxbotContactFilter } from './types/contact';
import type { IResponseStatus } from './types/status';

/**
 * Class to interact with maxbot server
 * @see https://mbr.maxbot.com.br/doc-api-v1.php
 */
export class Maxbot extends BaseProvider implements IProvider {
  private config: MaxbotOptions;
  private ready: boolean;
  private allowedExt: IAllowedExt;

  constructor(options: MaxbotOptions) {
    super({ loggingPrefix: 'Maxbot', baseURL, timeout: 10000, debug: false, ...options });
    this.config = { token: '', timeout: 5000, baseURL, debug: false, ...options };
    this.ready = false;

    this.allowedExt = {
      file: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'],
      image: ['jpg', 'jpeg', 'png', 'gif'],
      sound: ['mp3'],
      video: [],
    };

    this.setApiToken(this.config.token);
    return this.configureAxios();
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
    const validPayload = this.isValidPayload(urlVideo, 'video');
    if (filter && validPayload) {
      const payload: Partial<IMaxbotRequestSendVideo> = {
        ...filter,
        videoUrl: urlVideo,
        videoExtension: validPayload.extension,
      };
      const res = await this.apiPost(ReqType.SENDVIDEO, payload);
      return responseSendingDto(res);
    }
    return this.buildError('invalid payload');
  }

  async getServiceSector(): Promise<IReponseDepartment> {
    const res = await this.apiPost(ReqType.GETSERVICESECTOR);
    return responseServiceSectorDto(res);
  }

  async getContact(filter: IMaxbotContactFilter): Promise<IReponseContacts> {
    const res = await this.apiPost(ReqType.GETCONTACT, filter);
    return responseContactsDto(res);
  }

  async getAttendant(): Promise<IReponseAttendants> {
    const res = await this.apiPost(ReqType.GETATTENDANT);
    return responseAttendantsDto(res);
  }
}
