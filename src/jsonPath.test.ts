import type { Equal, Expect } from '@type-challenges/utils';
import { JsonPath, jsonPathToFunc } from './jsonPath';

type T = {
  a: {
    b: {
      c: number
    },
    d: {
      e: string
    }
  }
  f: [
    { g: boolean },
    number,
  ]
  h: {
    i: number[]
  }
  xyz: string
};

const x: T = {
  a: {
    b: {
      c: 1,
    },
    d: {
      e: 'e',
    },
  },
  f: [
    {
      g: true,
    },
    2,
  ],
  h: {
    i: [3],
  },
  xyz: 'xyz',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Cases = [
  Expect<Equal<
  JsonPath<T, '$'>,
  T
  >>,
  Expect<Equal<
  JsonPath<T, '$.a.b'>,
  T['a']['b']
  >>,
  Expect<Equal<
  JsonPath<T, '$.f[0].g'>,
  T['f'][0]['g']
  >>,
  Expect<Equal<
  JsonPath<T, '$.h.i[0]'>,
  T['h']['i'][0]
  >>,
  Expect<Equal<
  JsonPath<T, '$.xyz'>,
  T['xyz']
  >>,
  Expect<Equal<
  JsonPath<T, '$.a.c'>,
  never
  >>,
  Expect<Equal<
  JsonPath<T, '$.f[a]'>,
  never
  >>,
];

describe('JsonPath', () => {
  test('$', () => {
    expect(jsonPathToFunc('$')(x)).toEqual(x);
  });
  test('$.a.b', () => {
    expect(jsonPathToFunc('$.a.b')(x)).toEqual(x.a.b);
  });
  test('$.f[0].g', () => {
    expect(jsonPathToFunc('$.f[0].g')(x)).toEqual(x.f[0].g);
  });
  test('$.h.i[0]', () => {
    expect(jsonPathToFunc('$.h.i[0]')(x)).toEqual(x.h.i[0]);
  });
});
