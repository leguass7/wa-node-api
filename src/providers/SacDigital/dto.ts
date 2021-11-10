import { ForWhoType, IResponseSending } from '@interfaces/index';

import { ISacDigitalResponseSendText } from './types/sending';

export function forWhoFilterDto(forWhoFilter: ForWhoType): string {
  const contactId = typeof forWhoFilter === 'string' ? forWhoFilter : forWhoFilter?.contactId;
  return contactId;
}

export function responseSendingDto(data: ISacDigitalResponseSendText): IResponseSending {
  const { status, message, notificationId } = data;

  const result: IResponseSending = {
    status: status ? true : false,
    message: message || null,
    messageId: notificationId || null,
  };

  return result;
}
