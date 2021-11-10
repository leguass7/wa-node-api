import { IMaxbotResponse } from './api';
declare type Status = 'Active' | 'Disabled';
export interface IStatusData {
    /** date format YYYY-MM-DD */
    createdAt: string;
    status: Status;
    /** timestamps */
    lastExecutionAt: string;
    lastOperation: string;
}
export interface IResponseStatus extends IMaxbotResponse {
    data: IStatusData[];
}
export {};
