/**
 * Vue automatically converts kebab-case props to camelCase.
 * Therefore, we need to use types in camelCase.
 * So, here we are converting kebab-case type keys in the base library to camelCase.
 */
type KebabToCamelCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${First}${Capitalize<KebabToCamelCase<Rest>>}`
  : S;

export type CamelCaseProps<T> = {
  [K in keyof T as KebabToCamelCase<K & string>]: T[K];
};

export function htPropsFromVueProps<T>(props: CamelCaseProps<T>) : T {

    const kebabProps = {} as T;

    for (const key in props) {
        const kebabKey = key
            .replace(/([a-z0-9]|(?=[A-Z0-9]))([A-Z0-9])/g, '$1-$2')
            .toLowerCase() as keyof T;

        // @ts-ignore - no idea
        kebabProps[kebabKey] = props[key];
    }

    return kebabProps;

}
