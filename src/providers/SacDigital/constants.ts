export const baseURL = 'https://api.sac.digital/v2/client';

export enum ReqType {
  NOTIFICATION = 'notification/contact',
  DEPARTMENT = 'department/all',
  GETCONTACT = 'contact/search',
  GETATTENDANT = 'operator/all',
}

export const authScopes = [
  'edit', // 	Permissão de Edição
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
  'manager', // 	Escopo geral, define o acesso a todos recursos com todo tipo de permissão.
] as const;

export type ScopeType = typeof authScopes[number];
