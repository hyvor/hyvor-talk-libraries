<script lang="ts">
import { addComments } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { CommentsProps } from '@hyvor/hyvor-talk-base';

/**
 * Vue automatically converts kebab-case props to camelCase.
 * Therefore, we need to use types in camelCase.
 * So, here we are converting kebab-case type keys in the base library to camelCase.
 */
type KebabToCamelCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${First}${Capitalize<KebabToCamelCase<Rest>>}`
  : S;
type CamelCaseProps = {
  [K in keyof CommentsProps as KebabToCamelCase<K & string>]: CommentsProps[K];
};

/**
 * Typescript does not have a way to get all keys of a type as an array.
 * So, here we have to repeat all keys to add it to defineComponent's props (otherwise props are not loaded).
 * We are using this trick to achieve type safety, even though it is not the best way.
 * @source https://stackoverflow.com/a/54308812/9059939
 */
type KeysEnum<T> = { [P in keyof Required<T>]: true };
const allCamelCasePropKeysObject : KeysEnum<CamelCaseProps> = {
    'websiteId': true,
    'pageId': true,
    'pageUrl': true,
    'pageTitle': true,
    'pageLanguage': true,
    'pageAuthor': true,
    'ssoUser': true,
    'ssoHash': true,
    'colors': true,
    'loading': true,
    'settings': true,
    'translations': true,
};
const allCamelCasePropKeys = Object.keys(allCamelCasePropKeysObject) as (keyof CamelCaseProps)[];

/**
 * Vue does NOT support advanced types for props in defineProps()
 * https://github.com/vuejs/core/issues/8286
 * 
 * Therefore, we have to use defineComponent
 * https://vuejs.org/api/general.html#definecomponent
 */

export default defineComponent((props: CamelCaseProps, _) => {

    const wrap = ref<null | HTMLDivElement>(null);

    onMounted(() => {

        const kebabProps = {} as CommentsProps;

        for (const key in props) {
            const kebabKey = key
                .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                .toLowerCase() as keyof CommentsProps;

            // @ts-ignore - no idea
            kebabProps[kebabKey] = props[key as keyof CamelCaseProps] as CommentsProps[keyof CommentsProps];
        }

        addComments(
            kebabProps,
            wrap.value!,
            (event, data) => {
                console.log(event, data);
            }
        )

    });

    return () => h('div', { ref: wrap });

}, {
    props: allCamelCasePropKeys
});

</script>