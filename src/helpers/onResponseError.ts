import { AxiosError } from 'axios';

import type { IResultError } from '@interfaces/IResultError';

export async function onResponseError(error?: AxiosError): Promise<IResultError> {
  const response = error && error?.response;
  const statusHttp = response && parseInt(`${response?.status || 0}`, 10);

  const result: IResultError = {
    status: false,
    message: 'Timeout',
    response: (response && response?.data) || null,
  };

  if (!response) return Promise.resolve(result);

  result.message = `httpError ${statusHttp}`;
  return Promise.resolve(result);
}
