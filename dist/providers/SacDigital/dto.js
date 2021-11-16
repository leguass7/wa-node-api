"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forWhoFilterDto = forWhoFilterDto;
exports.queryContactFilterDto = queryContactFilterDto;
exports.responseAttendantsDto = responseAttendantsDto;
exports.responseContactsDto = responseContactsDto;
exports.responseDepartmentsDto = responseDepartmentsDto;
exports.responseSendingDto = responseSendingDto;

var _object = require("../../helpers/object");

function forWhoFilterDto(forWhoFilter) {
  const contactId = typeof forWhoFilter === 'string' ? forWhoFilter : forWhoFilter === null || forWhoFilter === void 0 ? void 0 : forWhoFilter.contactId;
  return contactId;
}

function responseSendingDto(data) {
  if (!data) return {
    status: false,
    message: 'no response data'
  };
  const {
    status,
    message,
    notificationId
  } = data;
  const result = {
    status: status ? true : false,
    message: message || null,
    messageId: notificationId || null
  };
  return result;
}

function responseDepartmentsDto(data) {
  const {
    list = [],
    ...rest
  } = data;
  const departments = list.map(department => {
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
    list = [],
    ...rest
  } = dataContacts;
  const contacts = list.map(({
    id,
    name,
    gender,
    number,
    avatar = '',
    email = '',
    observation = ''
  }) => {
    return {
      id,
      name,
      gender,
      whatsapp: number,
      avatar,
      email,
      observation
    };
  });
  return { ...rest,
    contacts
  };
}

function queryContactFilterDto(filter) {
  const result = {
    p: 1,
    filter: 1
  };

  if (filter !== null && filter !== void 0 && filter.email) {
    result.filter = 7;
    result.search = filter.email;
    return result;
  }

  const values = Object.values(filter);

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (value && !(0, _object.isObject)(value)) {
      result.search = value;
      return result;
    }
  }

  return result;
}

function responseAttendantsDto(data) {
  const {
    list = [],
    ...rest
  } = data;
  const attendants = list.map(({
    id,
    name,
    online,
    departments
  }) => {
    return {
      id,
      name,
      departmentId: departments.map(d => d.id),
      status: Boolean(online)
    };
  });
  return {
    attendants,
    status: rest === null || rest === void 0 ? void 0 : rest.status,
    message: rest === null || rest === void 0 ? void 0 : rest.message
  };
}