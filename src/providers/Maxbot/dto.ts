import type { ForWhoType, IResponseSending } from '@interfaces/index';

import type { IMaxbotRequestSend, IMaxbotResponseSending } from './types/sending';

export function forWhoFilterDto(forWhoFilter: ForWhoType): Partial<IMaxbotRequestSend> {
  const { externalId, whatsapp, brCpf } =
    typeof forWhoFilter === 'string'
      ? { whatsapp: forWhoFilter, brCpf: undefined, externalId: undefined }
      : forWhoFilter;

  const result: Partial<IMaxbotRequestSend> = {};
  if (externalId) {
    result.ctExternalId = externalId;
  } else if (whatsapp) {
    result.ctWhatsapp = whatsapp;
  } else if (brCpf) {
    result.ctBrCpf = brCpf;
  }
  return result;
}

export function responseSendingDto(data: IMaxbotResponseSending): IResponseSending {
  const { status, msg, msgId } = data;

  const result: IResponseSending = {
    status: status ? true : false,
    message: msg || null,
    messageId: msgId || null,
  };

  return result;
}
