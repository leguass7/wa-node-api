import { IResponseApi } from './IResponseSending';
export interface IDepartment {
    id: string | number;
    name: string;
}
export interface IReponseDepartment extends IResponseApi {
    departments: IDepartment[];
}
