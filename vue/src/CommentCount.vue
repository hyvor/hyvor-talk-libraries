<script lang="ts">
import { CommentCountCustomElement, CommentCountProps, CommentCounts, addCommentCounts } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import { CamelCaseProps, htPropsFromVueProps } from './helper';
import { PROPS_KEYS } from './props-keys';

type CommentCountPropsCamelCase = CamelCaseProps<CommentCountProps>;

export default defineComponent((props: CommentCountPropsCamelCase) => {

    const wrap = ref<null | HTMLDivElement>(null);
    const element = ref<null | CommentCountCustomElement>(null);

    onMounted(() => {
        if (wrap.value) {
            element.value = CommentCounts.commentCount(htPropsFromVueProps(props), wrap.value);
        }
    });

    return () => h('span', { class: 'ht-comment-count-wrap', ref: wrap });

}, {
    props: PROPS_KEYS['comment-count'] as unknown as (keyof CommentCountPropsCamelCase)[],
});

</script>