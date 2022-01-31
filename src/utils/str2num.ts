type Str2NumInternal<S extends string, L extends number[] = []> = `${L['length']}` extends S
  ? L['length']
  : Str2NumInternal<S, [...L, 0]>;

export type Str2Num<S> = S extends `${number}` ? Str2NumInternal<S> : never;
