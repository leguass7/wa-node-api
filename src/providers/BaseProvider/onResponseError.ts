import { AxiosError } from 'axios';

import { extractJSON } from '@helpers/string';

export interface IResultError {
  status: boolean | 0 | 1;
  message: string;
  response?: any;
}

export async function onResponseError(error?: AxiosError): Promise<{ data: IResultError }> {
  const response = error && error?.response;
  const statusHttp = response && parseInt(`${response?.status || 0}`, 10);

  const result: IResultError = { status: false, message: 'Timeout' };

  if (!response) return Promise.resolve({ data: result });

  if (typeof response === 'string') {
    const data = Object.assign({}, result, convertStringResponseData(response));
    return Promise.resolve({ data });
  }

  if (typeof response?.data === 'string') {
    const data = Object.assign({}, result, convertStringResponseData(response?.data));
    return Promise.resolve({ data });
  }

  result.message = `httpError ${statusHttp}`;
  return Promise.resolve({ data: result });
}

export function convertStringResponseData<T = any>(str: string): T {
  const [result = {}] = extractJSON(str);
  return { ...result, message: 'bad formatted' };
}
