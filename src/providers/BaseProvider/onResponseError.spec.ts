/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onResponseError } from './onResponseError';

describe('Helpers onResponseError Test', () => {
  test('should test onResponseError', async () => {
    // @ts-ignore
    expect(await onResponseError({ response: { status: 404, data: 'nothing' } })).toEqual(
      expect.objectContaining({
        status: false,
        message: `httpError 404`,
      }),
    );

    // @ts-ignore
    expect(await onResponseError({ response: { data: 'nothing' } })).toEqual(
      expect.objectContaining({ status: false, message: `httpError 0` }),
    );

    const str1 = `{"status":true,"notification_id":"a6RAra","message":"Mensagem encaminhada com sucesso"}<html> 
    <head><title>404 Not Found</title></head> 
    <body bgcolor="white"> 
    <center><h1>404 Not Found</h1></center> 
    <hr><center>nginx/1.14.1</center> 
    </body> 
    </html>`;

    // @ts-ignore
    expect(await onResponseError(str1)).toHaveProperty('status');

    expect(await onResponseError()).toEqual(expect.objectContaining({ status: false, message: 'Timeout' }));
  });
});
