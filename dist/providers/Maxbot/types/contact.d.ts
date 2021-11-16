import { IContactFilter } from '../../../interfaces';
import { IMaxbotResponse } from './api';
declare type Profession = string[];
declare type Gender = 'M' | 'F' | 'I';
declare type PersonType = 'J' | 'F';
export interface IMaxbotContactFilter extends IContactFilter {
    whatsapp?: string;
    mobilePhone?: string;
    email?: string;
    externalId?: number;
}
export interface IMaxbotContact {
    id: number | string;
    /** timestamp */
    cadDate: string;
    segmentation: string[];
    tag?: string;
    name: string;
    surname: string;
    gender: Gender;
    /** data YYYY-MM-DD */
    birth?: string;
    age?: number;
    brPersonType?: PersonType;
    brCpf?: string;
    brCnpj?: string;
    company?: string;
    email?: string;
    whatsapp: string;
    mobilePhone?: string;
    phone?: string;
    country: string;
    state?: string;
    city?: string;
    profession?: Profession;
    externalId?: number;
    avatarUrl?: string;
    obs?: string;
    inAttendance: string;
    currentProtocol: string;
    currentAttendant: string;
}
export interface IMaxbotPutContactData extends Omit<IMaxbotContact, 'id' | 'cadDate' | 'inAttendance' | 'currentProtocol' | 'currentAttendant' | 'segmentation'> {
    segmentation?: string[];
}
export interface IMaxbotSetContactData extends Omit<IMaxbotContact, 'id' | 'cadDate' | 'inAttendance' | 'currentProtocol' | 'currentAttendant' | 'segmentation' | 'gender' | 'name' | 'surname' | 'whatsapp'> {
    forContactId: number;
    whatsapp?: string;
    gender?: Gender;
    name?: string;
    surname?: string;
}
export interface IMaxbotResponseContacts extends IMaxbotResponse {
    data: IMaxbotContact[];
}
export {};
