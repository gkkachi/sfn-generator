import { JsonPath, jsonPathToFunc } from './jsonPath';

// TODO: Support for intrinsic functions.
type JsonPathExtended<T, P> = JsonPath<T, P>;
const jsonPathExtendedToFunc = jsonPathToFunc;

export type JsonPathMap<T, M> = keyof M extends never ? M : {
  [K in keyof M as (K extends `${infer K1}.$` ? K1 : K)]: K extends `${string}.$`
    ? JsonPathExtended<T, M[K]>
    : JsonPathMap<T, M[K]>
};

export const jsonPathMapToFunc = <M>(pathMap: M) => <T>(x: T): JsonPathMap<T, M> => (typeof pathMap !== 'object'
  ? pathMap
  : Object.fromEntries(
    Object.entries(pathMap).map(([key, val]) => {
      const k = key.match(/^(\w+)\.\$$/)?.[1];
      if (k) {
        return [k, jsonPathExtendedToFunc(val)(x)];
      }
      return [key, jsonPathMapToFunc(val)(x)];
    }),
  )) as JsonPathMap<T, M>;
