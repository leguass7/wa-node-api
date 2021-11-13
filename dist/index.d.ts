export { Maxbot } from './providers/Maxbot';
export type { MaxbotOptions, IMaxbotResponse, IMaxbotRequestSendText, IResponseStatus, IStatusData, IMaxbotRequestSendFile, IMaxbotRequestSendImage, IMaxbotRequestSendSound, IMaxbotRequestSendVideo, IMaxbotResponseSending, } from './providers/Maxbot/types';
export { SacDigital } from './providers/SacDigital';
export type { SacDigitalOptions, ISacDigitalRequestSend, ISacDigitalResponse, ISacDigitalResponseSendText, ISacDigitalContactFilter, ISacDigitalContact, ISacDigitalDepartment, ISacDigitalResponseContacts, ISacDigitalResponseDepartments, } from './providers/SacDigital/types';
export type { IResponseApi, IResponseSending, IContact, IReponseContacts, IDepartment, IReponseDepartment, IAttendant, IReponseAttendants, } from './interfaces';
export { createProvider, createMaxbotProvider, createSacDigitalProvider } from './createProvider';
export { IResultError } from './providers/BaseProvider';
export { ForWhoType, IForWhoFilter } from './providers/BaseProvider/IProvider';
