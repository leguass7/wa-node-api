import { isObject } from '@helpers/object';
import type {
  IResponseSending,
  IDepartment,
  IReponseDepartment,
  IReponseContacts,
  IContact,
  IReponseAttendants,
  IAttendant,
  IContactFilter,
} from '@interfaces/index';

import type { ForWhoType } from '../BaseProvider/IProvider';
import type { ISacDigitalResponseContacts } from './types/contact';
import type { ISacDigitalResponseDepartments } from './types/department';
import type { ISacDigitalResponseOperators } from './types/operator';
import type { ISacDigitalResponseSendText } from './types/sending';

export function forWhoFilterDto(forWhoFilter: ForWhoType): string {
  const contactId = typeof forWhoFilter === 'string' ? forWhoFilter : forWhoFilter?.contactId;
  return contactId;
}

export function responseSendingDto(data?: ISacDigitalResponseSendText): IResponseSending {
  if (!data) return { status: false, message: 'no response data' };

  const { status, message, notificationId } = data;

  const result: IResponseSending = {
    status: status ? true : false,
    message: message || null,
    messageId: notificationId || null,
  };

  return result;
}

export function responseDepartmentsDto(data: ISacDigitalResponseDepartments): IReponseDepartment {
  const { list = [], ...rest } = data;
  const departments: IDepartment[] = list.map(department => {
    return { id: department.id, name: department.name };
  });

  return { ...rest, departments };
}

export function responseContactsDto(dataContacts: ISacDigitalResponseContacts): IReponseContacts {
  const { list = [], ...rest } = dataContacts;
  const contacts: IContact[] = list.map(({ id, name, gender, number, avatar = '', email = '', observation = '' }) => {
    return { id, name, gender, whatsapp: number, avatar, email, observation };
  });

  return { ...rest, contacts };
}

type QueryFilter = IContactFilter & { p: number; filter: number; search?: string };
export function queryContactFilterDto(filter: IContactFilter): QueryFilter {
  const result: QueryFilter = { p: 1, filter: 1 };
  if (filter?.email) {
    result.filter = 7;
    result.search = filter.email;
    return result;
  }

  const values = Object.values(filter);
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value && !isObject(value)) {
      result.search = value;
      return result;
    }
  }

  return result;
}

export function responseAttendantsDto(data: ISacDigitalResponseOperators): IReponseAttendants {
  const { list = [], ...rest } = data;
  const attendants: IAttendant[] = list.map(({ id, name, online, departments }) => {
    return { id, name, departmentId: departments.map(d => d.id), status: Boolean(online) };
  });

  return { attendants, status: rest?.status, message: rest?.message };
}
