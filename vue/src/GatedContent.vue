<script lang="ts">
import { Memberships } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { GatedContentProps } from '@hyvor/hyvor-talk-base';
import { htPropsFromVueProps, type CamelCaseProps } from './helper';
import { PROPS_KEYS } from './props-keys';

type GatedContentPropsCamelCase = CamelCaseProps<GatedContentProps>;
type PropsWithCorrectKey = Omit<GatedContentPropsCamelCase, 'key'> & { _key?: string };

let propsKeys = PROPS_KEYS['gated-content'] as unknown as string[];
propsKeys = propsKeys.filter((key) => key !== 'key');
propsKeys.push('_key');

export default defineComponent((props: PropsWithCorrectKey) => {

    const wrap = ref<null | HTMLDivElement>(null);
    const element = ref<null | HTMLElement>(null);

    onMounted(() => {

        if (wrap.value) {

            // _key => key
            const p = htPropsFromVueProps(props) as any;
            if (p._key) {
                p.key = p._key;
                delete p._key;
            }

            element.value = Memberships.gatedContent(
                p,
                wrap.value,
            )
        }

    });

    return () => h('div', {  class: 'ht-gated-content-wrap', ref: wrap });

}, {
    props: propsKeys as unknown as (keyof PropsWithCorrectKey)[],
});

</script>