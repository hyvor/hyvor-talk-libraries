<script lang="ts">
import { Comments, COMMENTS_EVENTS, type CommentsCustomElement } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { CommentsProps } from '@hyvor/hyvor-talk-base';
import { htPropsFromVueProps, type CamelCaseProps } from './helper';
import { PROPS_KEYS } from './props-keys';

type CommentsPropsCamelCase = CamelCaseProps<CommentsProps>;

/**
 * Vue does NOT support advanced types for props in defineProps()
 * https://github.com/vuejs/core/issues/8286
 * 
 * Therefore, we have to use defineComponent
 * https://vuejs.org/api/general.html#definecomponent
 */

export default defineComponent((props: CommentsPropsCamelCase, { emit }) => {

    const wrap = ref<null | HTMLDivElement>(null);
    const element = ref<null | CommentsCustomElement>(null);

    onMounted(() => {

        if (wrap.value) {

            element.value = Comments.comments(
                htPropsFromVueProps(props),
                wrap.value!,
                (event, data) => {
                    emit(event, data);
                }
            )

        }

    });

    return () => h('div', {  class: 'ht-comments-wrap', ref: wrap });

}, {
    props: PROPS_KEYS.comments as unknown as (keyof CommentsPropsCamelCase)[],
    /**
     * There is no way to provide type safety to emit payloads (at least I don't know)
     */
    emits: COMMENTS_EVENTS,
});

</script>