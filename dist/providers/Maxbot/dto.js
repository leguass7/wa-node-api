"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forWhoFilterDto = forWhoFilterDto;
exports.responseAttendantsDto = responseAttendantsDto;
exports.responseContactsDto = responseContactsDto;
exports.responseSendingDto = responseSendingDto;
exports.responseServiceSectorDto = responseServiceSectorDto;

function forWhoFilterDto(forWhoFilter) {
  const {
    externalId,
    whatsapp,
    brCpf
  } = typeof forWhoFilter === 'string' ? {
    whatsapp: forWhoFilter,
    brCpf: undefined,
    externalId: undefined
  } : forWhoFilter;
  const result = {};

  if (externalId) {
    result.ctExternalId = externalId;
  } else if (whatsapp) {
    result.ctWhatsapp = whatsapp;
  } else if (brCpf) {
    result.ctBrCpf = brCpf;
  }

  return result;
}

function responseSendingDto(data) {
  const {
    status,
    msg,
    msgId
  } = data;
  const result = {
    status: status ? true : false,
    message: msg || null,
    messageId: msgId || null
  };
  return result;
}

function responseServiceSectorDto(data) {
  const {
    serviceSector = [],
    ...rest
  } = data;
  const departments = serviceSector.map(department => {
    return {
      id: department.id,
      name: department.name
    };
  });
  return { ...rest,
    departments
  };
}

function responseContactsDto(dataContacts) {
  const {
    data = [],
    ...rest
  } = dataContacts;
  const contacts = data.map(({
    id,
    name,
    gender,
    whatsapp,
    avatarUrl = '',
    email = '',
    obs = ''
  }) => {
    return {
      id,
      name,
      gender,
      whatsapp,
      avatar: avatarUrl,
      email,
      observation: obs
    };
  });
  return { ...rest,
    contacts
  };
}

function responseAttendantsDto(data) {
  const {
    attendant = [],
    ...rest
  } = data;
  const attendants = attendant.map(({
    id,
    name,
    serviceSectorId,
    status
  }) => {
    return {
      id,
      name,
      departmentId: serviceSectorId,
      status: Boolean(status)
    };
  });
  return { ...rest,
    attendants
  };
}