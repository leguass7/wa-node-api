import { IResponseApi } from './IResponseSending';
export interface IAttendant {
    id: number | string;
    departmentId: (number | string)[];
    name: string;
    status: boolean;
}
export interface IReponseAttendants extends IResponseApi {
    attendants: IAttendant[];
}
