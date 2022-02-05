import type { Equal, Expect } from '@type-challenges/utils';
import { Str2Num } from './str2num';

type Cases = [
  Expect<Equal<
  Str2Num<'1'>,
  1
  >>,
  Expect<Equal<
  Str2Num<'23'>,
  23
  >>,
  Expect<Equal<
  Str2Num<'a'>,
  never
  >>,
];

describe('Str2Num', () => {
  test('dummy', () => {
    expect(true).toBe(true);
  });
});
