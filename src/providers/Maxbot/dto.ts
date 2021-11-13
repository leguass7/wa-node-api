import type { IResponseSending, IReponseContacts, IDepartment, IReponseDepartment, IContact } from '@interfaces/index';

import type { IAttendant, IReponseAttendants } from '../../interfaces/IAttendant';
import type { ForWhoType } from '../BaseProvider/IProvider';
import type { IMaxbotResponseAttendant } from './types/attendant';
import type { IMaxbotResponseContacts } from './types/contact';
import type { IMaxbotRequestSend, IMaxbotResponseSending } from './types/sending';
import type { IMaxbotResponseServiceSector } from './types/servicesector';

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

export function responseServiceSectorDto(data: IMaxbotResponseServiceSector): IReponseDepartment {
  const { serviceSector = [], ...rest } = data;
  const departments: IDepartment[] = serviceSector.map(department => {
    return { id: department.id, name: department.name };
  });

  return { ...rest, departments };
}

export function responseContactsDto(dataContacts: IMaxbotResponseContacts): IReponseContacts {
  const { data = [], ...rest } = dataContacts;
  const contacts: IContact[] = data.map(({ id, name, gender, whatsapp, avatarUrl = '', email = '', obs = '' }) => {
    return { id, name, gender, whatsapp, avatar: avatarUrl, email, observation: obs };
  });

  return { ...rest, contacts };
}

export function responseAttendantsDto(data: IMaxbotResponseAttendant): IReponseAttendants {
  const { attendant = [], ...rest } = data;
  const attendants: IAttendant[] = attendant.map(({ id, name, serviceSectorId, status }) => {
    return { id, name, departmentId: serviceSectorId, status: Boolean(status) };
  });

  return { ...rest, attendants };
}
