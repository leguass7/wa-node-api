import type { IResponseSending, IReponseDepartment, IReponseContacts, IReponseAttendants, IContactFilter } from '../../interfaces/index';
import type { ForWhoType } from '../BaseProvider/IProvider';
import type { ISacDigitalResponseContacts } from './types/contact';
import type { ISacDigitalResponseDepartments } from './types/department';
import type { ISacDigitalResponseOperators } from './types/operator';
import type { ISacDigitalResponseSendText } from './types/sending';
export declare function forWhoFilterDto(forWhoFilter: ForWhoType): string;
export declare function responseSendingDto(data?: ISacDigitalResponseSendText): IResponseSending;
export declare function responseDepartmentsDto(data: ISacDigitalResponseDepartments): IReponseDepartment;
export declare function responseContactsDto(dataContacts: ISacDigitalResponseContacts): IReponseContacts;
declare type QueryFilter = IContactFilter & {
    p: number;
    filter: number;
    search?: string;
};
export declare function queryContactFilterDto(filter: IContactFilter): QueryFilter;
export declare function responseAttendantsDto(data: ISacDigitalResponseOperators): IReponseAttendants;
export {};
