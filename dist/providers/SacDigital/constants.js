"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authScopes = exports.ReqType = exports.baseURL = void 0;
exports.baseURL = 'https://api.sac.digital/v2/client';
var ReqType;
(function (ReqType) {
    ReqType["NOTIFICATION"] = "notification/contact";
    ReqType["DEPARTMENT"] = "department/all";
    ReqType["GETCONTACT"] = "contact/search";
    ReqType["GETATTENDANT"] = "operator/all";
})(ReqType = exports.ReqType || (exports.ReqType = {}));
exports.authScopes = [
    'edit',
    'write',
    'import',
    'remove',
    'send',
    'contact',
    'inbox',
    'channel',
    'department',
    'operator',
    'schedule',
    'wallet_client',
    'monitor',
    'group',
    'campaign',
    'tag',
    'protocol',
    'notification',
    'coupon',
    'smsideal',
    'product',
    'correios',
    'portable',
    'popup',
    'manager', // 	Escopo geral, define o acesso a todos recursos com todo tipo de permissão.
];
