import { A } from 'ts-toolbelt';
import type { Expect } from './expect';
import { Str2Num } from './str2num';

export type Cases = [
  Expect<A.Equals<
  Str2Num<'1'>,
  1
  >>,
  Expect<A.Equals<
  Str2Num<'23'>,
  23
  >>,
  Expect<A.Equals<
  Str2Num<'a'>,
  never
  >>,
];
