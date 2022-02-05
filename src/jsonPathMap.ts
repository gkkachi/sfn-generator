import { JsonPath, jsonPathToFunc } from './jsonPath';

// TODO: Support for intrinsic functions.
type JsonPathExtended<T, P> = JsonPath<T, P>;
const jsonPathExtendedToFunc = jsonPathToFunc;

type Main<T, M> = keyof M extends never ? M : {
  [K in keyof M as (K extends `${infer K1}.$` ? K1 : K)]: K extends `${string}.$`
    ? JsonPathExtended<T, M[K]>
    : Main<T, M[K]>
};

export type JsonPathMap<T, M> = M extends undefined ? T : Main<T, M>;

export const jsonPathMapToFunc = <M>(pathMap: M) => <T>(x: T): JsonPathMap<T, M> => {
  switch (typeof pathMap) {
    case 'object':
      return Object.fromEntries(
        Object.entries(pathMap).map(([key, val]) => {
          const k = key.match(/^(\w+)\.\$$/)?.[1];
          if (k) {
            return [k, jsonPathExtendedToFunc(val)(x)];
          }
          return [key, jsonPathMapToFunc(val)(x)];
        }),
      ) as JsonPathMap<T, M>;
    case 'undefined':
      return x as JsonPathMap<T, M>;
    default:
      return pathMap as JsonPathMap<T, M>;
  }
};
