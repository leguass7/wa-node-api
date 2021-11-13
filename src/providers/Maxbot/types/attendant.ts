import { IMaxbotResponse } from './api';

export interface IMaxbotAttendant {
  id: number;
  serviceSectorId: number[];
  name: string;
  status: boolean;
}

export interface IMaxbotResponseAttendant extends IMaxbotResponse {
  attendant: IMaxbotAttendant[];
}
