import { decamelcase, decamelcaseStr } from './decamelcase';

describe('Helpers decalmelcase Test', () => {
  test('should decamelize string', () => {
    const expected = { test_one: 'test' };
    const expected2 = [{ test_one: 'test1' }, { test_two: 'test2' }];
    const decamelized = decamelcase({ testOne: 'test' }) as object;

    expect(decamelized).toEqual(expect.objectContaining(expected));

    const arr = decamelcase([{ testOne: 'test1' }, { testTwo: 'test2' }]) as typeof expected2;
    arr.forEach((obj, i) => {
      expect(obj).toEqual(expect.objectContaining(expected2[i]));
    });

    expect({ ...decamelized, test_one: 'test_one', 1: 'test1' }).toEqual(
      expect.objectContaining({
        test_one: 'test_one',
        1: 'test1',
      }),
    );

    const str = 'testOne';
    expect(decamelcaseStr(str)).toEqual('test_one');
    expect(decamelcase(str)).toEqual('test_one');

    const deepExpected = { test_one: { test_two: 'test' } };
    expect(decamelcase({ testOne: { testTwo: 'test' } })).toEqual(expect.objectContaining(deepExpected));

    // force error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(decamelcaseStr(1)).toEqual(1);
  });
});
