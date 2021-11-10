"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forWhoFilterDto = forWhoFilterDto;
exports.responseSendingDto = responseSendingDto;

function forWhoFilterDto(forWhoFilter) {
  const contactId = typeof forWhoFilter === 'string' ? forWhoFilter : forWhoFilter === null || forWhoFilter === void 0 ? void 0 : forWhoFilter.contactId;
  return contactId;
}

function responseSendingDto(data) {
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