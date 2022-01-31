import { Str2Num } from './utils/str2num';

type Main<T, P extends string> = P extends ''
  ? T
  : T extends unknown[]
    ? P extends `[${infer K1}]${infer P1}`
      ? Str2Num<K1> extends never
        ? never
        : Main<T[Str2Num<K1>], P1>
      : never
    : P extends `.${infer K2}[${infer P2}`
      ? K2 extends keyof T
        ? Main<T[K2], `[${P2}`>
        : P extends `.${infer K3}.${infer P3}`
          ? K3 extends keyof T
            ? Main<T[K3], `.${P3}`>
            : never
          : never
      : P extends `.${infer K4}.${infer P4}`
        ? K4 extends keyof T
          ? Main<T[K4], `.${P4}`>
          : never
        : P extends `.${infer K5}`
          ? K5 extends keyof T
            ? Main<T[K5], ''>
            : never
          : never;

export type JsonPath<T, P extends string> = P extends `$${infer K}`
  ? Main<T, `${K}`> : never;

export const jsonPathToFunc = <P extends string>(path: P) => <T>(x: T): JsonPath<T, P> => {
  const p = path.startsWith('$') ? path.slice(1) : path;
  if (p === '') return x as JsonPath<T, P>;
  if (x instanceof Array && p.startsWith('[')) {
    const indexStr = /^\[(\d+)\]/.exec(p)?.[1];
    if (indexStr) {
      const index = parseInt(indexStr, 10);
      const nextPath = p.slice(indexStr.length + 2);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const nextX = x[index];
      return jsonPathToFunc(nextPath)(nextX);
    }
  }
  if (p.startsWith('.')) {
    const key = /^\.(\w+)/.exec(p)?.[1];
    if (key) {
      const nextPath = p.slice(key.length + 1);
      const nextX = (x as Record<string, unknown>)[key];
      return jsonPathToFunc(nextPath)(nextX);
    }
  }
  throw new Error(`Unexpected format: ${path}`);
};
