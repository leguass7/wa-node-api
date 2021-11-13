"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseAttendantsDto = exports.queryContactFilterDto = exports.responseContactsDto = exports.responseDepartmentsDto = exports.responseSendingDto = exports.forWhoFilterDto = void 0;
function forWhoFilterDto(forWhoFilter) {
    const contactId = typeof forWhoFilter === 'string' ? forWhoFilter : forWhoFilter?.contactId;
    return contactId;
}
exports.forWhoFilterDto = forWhoFilterDto;
function responseSendingDto(data) {
    const { status, message, notificationId } = data;
    const result = {
        status: status ? true : false,
        message: message || null,
        messageId: notificationId || null,
    };
    return result;
}
exports.responseSendingDto = responseSendingDto;
function responseDepartmentsDto(data) {
    const { list = [], ...rest } = data;
    const departments = list.map(department => {
        return { id: department.id, name: department.name };
    });
    return { ...rest, departments };
}
exports.responseDepartmentsDto = responseDepartmentsDto;
function responseContactsDto(dataContacts) {
    const { list = [], ...rest } = dataContacts;
    const contacts = list.map(({ id, name, gender, number, avatar = '', email = '', observation = '' }) => {
        return { id, name, gender, whatsapp: number, avatar, email, observation };
    });
    return { ...rest, contacts };
}
exports.responseContactsDto = responseContactsDto;
function queryContactFilterDto(filter) {
    const result = { p: 1, filter: 1, search: filter?.whatsapp || filter?.search };
    if (filter?.email) {
        result.filter = 7;
        result.search = filter?.email || filter?.search;
        return result;
    }
    return result;
}
exports.queryContactFilterDto = queryContactFilterDto;
function responseAttendantsDto(data) {
    const { list = [], ...rest } = data;
    const attendants = list.map(({ id, name, online, departments }) => {
        return { id, name, departmentId: departments.map(d => d.id), status: Boolean(online) };
    });
    return { attendants, status: rest?.status, message: rest?.message };
}
exports.responseAttendantsDto = responseAttendantsDto;
