<script lang="ts">
import { CommentCountProps, addCommentCounts } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted } from 'vue';
import { KebabToCamelCase, KeysEnum } from './vue-types-util';

type CamelCaseProps = {
  [K in keyof CommentCountProps as KebabToCamelCase<K & string>]: CommentCountProps[K];
};

const allCamelCasePropKeysObject : KeysEnum<CamelCaseProps> = {
    'websiteId': true,
    'pageId': true,
    mode: true,
    language: true,
    loading: true,
};
const allCamelCasePropKeys = Object.keys(allCamelCasePropKeysObject) as (keyof CamelCaseProps)[];

export default defineComponent((props: CamelCaseProps) => {

    const kebabProps = {} as CommentCountProps;
    for (const key in props) {
        const kebabKey = key
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
            .toLowerCase() as keyof CommentCountProps;

        // @ts-ignore
        kebabProps[kebabKey] = props[key as keyof CamelCaseProps] as CommentCountProps[keyof CommentCountProps];
    }

    onMounted(() => {
        addCommentCounts(kebabProps)
    });

    return () => h('hyvor-talk-comment-count', kebabProps);

}, {
    props: allCamelCasePropKeys
});

</script>