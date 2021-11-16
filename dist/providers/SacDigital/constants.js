"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseURL = exports.authScopes = exports.ReqType = void 0;
const baseURL = 'https://api.sac.digital/v2/client';
exports.baseURL = baseURL;
let ReqType;
exports.ReqType = ReqType;

(function (ReqType) {
  ReqType["NOTIFICATION"] = "notification/contact";
  ReqType["DEPARTMENT"] = "department/all";
  ReqType["GETCONTACT"] = "contact/search";
  ReqType["GETATTENDANT"] = "operator/all";
})(ReqType || (exports.ReqType = ReqType = {}));

const authScopes = ['edit', // 	Permissão de Edição
'write', // 	Permissão de Escrita
'import', // 	Permissão para Importação
'remove', // 	Permissão para Remoção
'send', // 	Permissão de Envio
'contact', // 	Acesso a agenda de contatos
'inbox', // 	Acesso a Recados
'channel', // 	Acesso a Canais
'department', // 	Acesso a Departamentos
'operator', // 	Acesso a Operadores
'schedule', // 	Acesso a Agendamentos
'wallet_client', // 	Acesso a Carteira de Clientes
'monitor', // Acesso a Monitores
'group', // 	Acesso a Grupos
'campaign', // 	Acesso a Campanhas
'tag', // 	Acesso a Etiquetas
'protocol', // 	Acesso a Protocolo
'notification', // 	Acesso a Notificações
'coupon', // 	Acesso a Cupons
'smsideal', // 	Acesso a SMSIDEAL
'product', // 	Acesso a Produtos
'correios', // 	Acesso a Correios
'portable', // 	Acesso a Portabilidade
'popup', // 	Acesso a recursos do popup
'manager' // 	Escopo geral, define o acesso a todos recursos com todo tipo de permissão.
];
exports.authScopes = authScopes;