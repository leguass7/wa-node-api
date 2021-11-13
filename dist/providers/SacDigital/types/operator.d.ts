import { ISacDigitalResponse } from './api';
import { ISacDigitalDepartment } from './department';
export interface ISacDigitalOperator {
    id: string;
    online: boolean;
    confirmed: boolean;
    departments: Pick<ISacDigitalDepartment, 'id' | 'name'>[];
    name: string;
    cpf: string;
    national: boolean;
    email: string;
    phone: string;
    createdAt: '2021-09-23 11:55:54';
}
export interface ISacDigitalResponseOperators extends ISacDigitalResponse {
    total: number;
    page: number;
    list: ISacDigitalOperator[];
}
