import { factory } from './apply';

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
  res: {
    shouldOverride: boolean
  }
};

const t: T = {
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
  res: {
    shouldOverride: true,
  },
};

describe('Apply', () => {
  test('identity', async () => {
    const apply = factory({
      inputPath: '$',
      parameters: undefined,
      resultPath: '$.res',
      resultSelector: undefined,
      outputPath: '$',
    } as const);
    const y = await apply((x) => x, t);
    expect(y).toEqual({ ...t, res: t });
    // @ts-expect-error res field should be overridden.
    y.res.shouldOverride;
  });
});
