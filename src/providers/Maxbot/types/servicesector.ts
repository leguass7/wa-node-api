import { IMaxbotResponse } from '.';

type OperationAnswerId = 0 | 1 | 2;

export interface IMaxbotServiceSector {
  id: number;
  code: number;
  name: string;
  responsibleName: string;
  responsibleEmail?: string;
  responsibleWhatsapp: string;
  responsibleMobilePhone: string;
  responsiblePhoneExtension?: string;
  operationMondayAnswer: OperationAnswerId;
  operationMondayShift1: string;
  operationMondayShift2: string;
  operationtuesdayAnswer: OperationAnswerId;
  operationtuesdayShift1: string;
  operationtuesdayShift2: string;
  operationWednesdayAnswer: OperationAnswerId;
  operationWednesdayShift1: string;
  operationWednesdayShift2: string;
  operationThursdayAnswer: OperationAnswerId;
  operationThursdayShift1: string;
  operationThursdayShift2: string;
  operationFridayAnswer: OperationAnswerId;
  operationFridayShift1: string;
  operationFridayShift2: string;
  operationSaturdayAnswer: OperationAnswerId;
  operationSaturdayShift1: string;
  operationSaturdayShift2: string;
  operationSundayAnswer: OperationAnswerId;
  operationSundayShift1: string;
  operationSundayShift2: string;
  allowServiceWithUnavailableAttendants: 0 | 1;
}

export interface IMaxbotResponseServiceSector extends IMaxbotResponse {
  serviceSector?: IMaxbotServiceSector[];
}
