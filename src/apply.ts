import { JsonPath, jsonPathToFunc } from './jsonPath';
import { JsonPathMap, jsonPathMapToFunc } from './jsonPathMap';

export const factory = <
  InputPath extends string,
  Parameters,
  ResultSelector,
  OutputPath extends string,
  >(
    {
      inputPath, parameters, resultSelector, outputPath,
    }: {
      inputPath: InputPath,
      parameters: Parameters,
      resultSelector: ResultSelector,
      resultPath: '$.res', // TODO: Generalize.
      outputPath: OutputPath,
    },
  ) => async <T, R>(
    f: (x: JsonPathMap<JsonPath<T, InputPath>, Parameters>) => R, x: T,
  ): Promise<JsonPath<Omit<T, 'res'> & { res: JsonPathMap<Awaited<R>, ResultSelector> }, OutputPath>> => {
    const x1 = jsonPathToFunc(inputPath)(x);
    const x2 = jsonPathMapToFunc(parameters)(x1);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const x3 = await f(x2);
    const x4 = jsonPathMapToFunc(resultSelector)(x3);
    const x5 = { ...x, res: x4 };
    return jsonPathToFunc(outputPath)(x5);
  };
