import type { Equal, Expect } from '@type-challenges/utils';
import { JsonPathMap, jsonPathMapToFunc } from './jsonPathMap';

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
  JsonPathMap<T, { a: { b: 'foo' } }>,
  { a: { b: 'foo' } }
  >>,
  Expect<Equal<
  JsonPathMap<T, {
    'ab.$': '$.a.b',
    c: {
      de: 'de',
      'fg.$': '$.f[0].g',
      'hi.$': '$.h.i[0]'
    },
    xyz1: '$.xyz',
    'xyz2.$': '$.xyz'
  }>,
  {
    ab: T['a']['b']
    c: {
      de: 'de',
      fg: T['f'][0]['g']
      hi: T['h']['i'][0]
    }
    xyz1: '$.xyz',
    xyz2: T['xyz']
  }
  >>,
];

describe('JsonPathMap', () => {
  test('simple', () => {
    expect(jsonPathMapToFunc({ a: { b: 'foo' } })(x)).toEqual({ a: { b: 'foo' } });
  });
  test('complex', () => {
    expect(jsonPathMapToFunc({
      'ab.$': '$.a.b',
      c: {
        de: 'de',
        'fg.$': '$.f[0].g',
        'hi.$': '$.h.i[0]',
      },
      xyz1: '$.xyz',
      'xyz2.$': '$.xyz',
    })(x)).toEqual({
      ab: x.a.b,
      c: {
        de: 'de',
        fg: x.f[0].g,
        hi: x.h.i[0],
      },
      xyz1: '$.xyz',
      xyz2: x.xyz,
    });
  });
});
