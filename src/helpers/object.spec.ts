import { isObject } from './object';

describe('Helpers object Test', () => {
  test('should test isObject', () => {
    expect(isObject({})).toBe(true);
    expect(
      isObject({
        test: 'ok',
        success: true,
        time: new Date(),
        func: () => {
          return true;
        },
      }),
    ).toBe(true);

    expect(isObject(new Date())).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject(new RegExp(/any/))).toBe(false);
    expect(isObject(new Error('Message error'))).toBe(false);
  });
});
