import { ReqType } from '../constants';
import { IMaxbotResponse } from './api';

export interface IMaxbotRequestSend {
  token: string;
  cmd: ReqType;
  ctWhatsapp: string;
  ctExternalId: string | number;
  ctBrCpf: string;
}

export interface IMaxbotRequestSendText extends IMaxbotRequestSend {
  msg: string;
}

export interface IMaxbotRequestSendImage extends IMaxbotRequestSend {
  imageUrl: string;
  imageExtension: string;
}

export interface IMaxbotRequestSendFile extends IMaxbotRequestSend {
  fileUrl: string;
  fileExtension: string;
}

export interface IMaxbotRequestSendSound extends IMaxbotRequestSend {
  soundUrl: string;
  soundExtension: string;
}

export interface IMaxbotRequestSendVideo extends IMaxbotRequestSend {
  videoUrl: string;
  videoExtension: string;
}

export interface IMaxbotResponseSending extends IMaxbotResponse {
  msgId?: string;
}
