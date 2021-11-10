import type { ForWhoType, IResponseSending } from '../../interfaces/index';
import type { IMaxbotRequestSend, IMaxbotResponseSending } from './types/sending';
export declare function forWhoFilterDto(forWhoFilter: ForWhoType): Partial<IMaxbotRequestSend>;
export declare function responseSendingDto(data: IMaxbotResponseSending): IResponseSending;
