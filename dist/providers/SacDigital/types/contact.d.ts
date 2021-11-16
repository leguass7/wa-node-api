import type { ISacDigitalResponse } from './api';
declare type Gender = 'M' | 'F' | 'I';
export interface ISacDigitalContact {
    id: string;
    /** phone number */
    number: string;
    name: string;
    /** image url */
    avatar: string;
    carrier: string;
    region: string;
    gender: Gender;
    channel: {
        id: string;
        /** channel phone number */
        number: string;
    };
    email: string;
    socialMedias: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        pinterest: string;
        youtube: string;
        google: string;
    };
    tag: [];
    binded: {
        current: null;
        comunication: [
            {
                id: string;
                name: string;
                /** format YYYY-MM-DD HH:mm:ss*/
                bindedAt: string;
            }
        ];
    };
    observation: string;
    blocked: boolean;
    portable: boolean;
    portableCarrier: string;
    portableDate: string;
    imported: boolean;
    /** format YYYY-MM-DD HH:mm:ss*/
    impotedAt: string;
    /** format YYYY-MM-DD HH:mm:ss*/
    createdAt: string;
}
export interface ISacDigitalResponseContacts extends ISacDigitalResponse {
    total: number;
    page: number;
    list: ISacDigitalContact[];
}
export {};
