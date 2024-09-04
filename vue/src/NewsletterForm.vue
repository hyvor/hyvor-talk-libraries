<script lang="ts">
import { Newsletters } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { NewslettersCustomElement, NewslettersProps } from '@hyvor/hyvor-talk-base';
import { htPropsFromVueProps, type CamelCaseProps } from './helper';
import { PROPS_KEYS } from './props-keys';

type NewslettersPropsCamelCase = CamelCaseProps<NewslettersProps>;

export default defineComponent((props: NewslettersPropsCamelCase) => {

    const wrap = ref<null | HTMLDivElement>(null);
    const element = ref<null | NewslettersCustomElement>(null);

    onMounted(() => {

        if (wrap.value) {

            element.value = Newsletters.form(
                htPropsFromVueProps(props),
                wrap.value!,
            )

        }

    });

    return () => h('div', {  class: 'ht-newsletter-wrap', ref: wrap });

}, {
    props: PROPS_KEYS.newsletter as unknown as (keyof NewslettersPropsCamelCase)[],
});

</script>