import { ISacDigitalResponse } from './api';
export interface ISacDigitalDepartment {
    id: string;
    name: string;
    active: boolean;
    tags: [];
    /** format YYYY-MM-DD HH:mm:ss*/
    createdAt: '2021-09-23 11:46:39';
}
export interface ISacDigitalResponseDepartments extends ISacDigitalResponse {
    list?: ISacDigitalDepartment[];
}
