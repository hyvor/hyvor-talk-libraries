<script lang="ts">
import { addComments } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { CommentsProps, Events } from '@hyvor/hyvor-talk-base';
import type { KebabToCamelCase, KeysEnum } from './vue-types-util';

type CamelCaseProps = {
  [K in keyof CommentsProps as KebabToCamelCase<K & string>]: CommentsProps[K];
};


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

const allEventsObject : KeysEnum<Events> = {
    'loaded': true,
    'comment:published': true,
    'comment:edited': true,
    'comment:deleted': true,
    'comment:voted': true,
    'comment:flagged': true,
    'reaction': true,
    'rating': true,
    'auth:login:clicked': true,
};
const allEvents = Object.keys(allEventsObject) as (keyof Events)[];

/**
 * Vue does NOT support advanced types for props in defineProps()
 * https://github.com/vuejs/core/issues/8286
 * 
 * Therefore, we have to use defineComponent
 * https://vuejs.org/api/general.html#definecomponent
 */

export default defineComponent((props: CamelCaseProps, { emit }) => {

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

        if (wrap.value) {

            addComments(
                kebabProps,
                wrap.value!,
                (event, data) => {
                    emit(event, data);
                }
            )

        } else {
            console.log('oopzi', wrap);
        }

    });

    return () => h('div', { ref: wrap });

}, {
    props: allCamelCasePropKeys,
    /**
     * There is no way to provide type safety to emit payloads (at least I don't know)
     */
    emits: allEvents,
});

</script>