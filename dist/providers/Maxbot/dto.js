"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forWhoFilterDto = forWhoFilterDto;
exports.responseSendingDto = responseSendingDto;

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