export interface IResponseApi {
  status: boolean;
  message?: string;
}

export interface IResponseSending extends IResponseApi {
  messageId?: string;
}
