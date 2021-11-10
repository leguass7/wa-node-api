import { ISacDigitalResponse } from './api';

export interface ISacDigitalResponseSendText extends ISacDigitalResponse {
  notificationId?: string;
}

export interface ISacDigitalRequestSend {
  contact: string;
  type: 'text' | 'file' | 'audio' | 'video' | 'image';
  text?: string;
  url?: string;
}
