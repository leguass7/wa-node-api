/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onResponseError } from './onResponseError';

describe('Helpers onResponseError Test', () => {
  test('should test onResponseError', async () => {
    // @ts-ignore
    expect(await onResponseError({ response: { status: 404, data: 'nothing' } })).toEqual(
      expect.objectContaining({
        status: false,
        message: `httpError 404`,
        response: 'nothing',
      }),
    );

    // @ts-ignore
    expect(await onResponseError({ response: { data: 'nothing' } })).toEqual(
      expect.objectContaining({ status: false, message: `httpError 0`, response: 'nothing' }),
    );

    expect(await onResponseError()).toEqual(
      expect.objectContaining({ status: false, message: 'Timeout', response: null }),
    );
  });
});
