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
  //   horary: {
  //     days: 'Seg-Ter-Qua-Qui-Sex-Sab-Dom';
  //     scale: false;
  //     hours: {
  //       all: '00:00---23:58';
  //       days: {
  //         seg: '07:30---17:00';
  //         ter: '08:00---17:00';
  //         qua: '08:00---17:00';
  //         qui: '08:00---17:00';
  //         sex: '08:00---17:00';
  //         sab: '00:00---23:58';
  //         dom: '00:00---23:58';
  //       };
  //     };
  //   };
  createdAt: '2021-09-23 11:55:54';
}
export interface ISacDigitalResponseOperators extends ISacDigitalResponse {
  total: number;
  page: number;
  list: ISacDigitalOperator[];
}
