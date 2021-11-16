import { IResponseApi } from './IResponseSending';
export interface IContact {
    id: number | string;
    name: string;
    gender: 'M' | 'F' | 'I';
    whatsapp: string;
    /** URL image */
    avatar: string;
    email: string;
    observation: string;
}
export interface IReponseContacts extends IResponseApi {
    contacts: IContact[];
}
export interface IContactFilter {
    whatsapp?: string;
    email?: string;
    externalId?: number;
}
