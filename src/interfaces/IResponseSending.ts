export interface IResponseApi {
  status: boolean | 0 | 1;
  message?: string;
}

export interface IResponseSending extends IResponseApi {
  messageId?: string;
}
