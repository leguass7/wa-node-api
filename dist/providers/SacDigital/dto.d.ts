import { ForWhoType, IResponseSending } from '../../interfaces/index';
import { ISacDigitalResponseSendText } from './types/sending';
export declare function forWhoFilterDto(forWhoFilter: ForWhoType): string;
export declare function responseSendingDto(data: ISacDigitalResponseSendText): IResponseSending;
