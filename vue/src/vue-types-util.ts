/**
 * Vue automatically converts kebab-case props to camelCase.
 * Therefore, we need to use types in camelCase.
 * So, here we are converting kebab-case type keys in the base library to camelCase.
 */
export type KebabToCamelCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${First}${Capitalize<KebabToCamelCase<Rest>>}`
  : S;


/**
 * Typescript does not have a way to get all keys of a type as an array.
 * So, here we have to repeat all keys to add it to defineComponent's props (otherwise props are not loaded).
 * We are using this trick to achieve type safety, even though it is not the best way.
 * @source https://stackoverflow.com/a/54308812/9059939
 */
export type KeysEnum<T> = { [P in keyof Required<T>]: true };
