<script lang="ts">
import { Memberships, MEMBERSHIPS_EVENTS, type MembershipsCustomElement } from '@hyvor/hyvor-talk-base';
import { h, defineComponent, onMounted, ref } from 'vue';
import type { MembershipsProps } from '@hyvor/hyvor-talk-base';
import { htPropsFromVueProps, type CamelCaseProps } from './helper';
import { PROPS_KEYS } from './props-keys';

type MembershipsPropsCamelCase = CamelCaseProps<MembershipsProps>;

export default defineComponent((props: MembershipsPropsCamelCase, { emit }) => {

    const wrap = ref<null | HTMLDivElement>(null);
    const element = ref<null | MembershipsCustomElement>(null);

    onMounted(() => {

        if (wrap.value) {

            element.value = Memberships.memberships(
                htPropsFromVueProps(props),
                wrap.value!,
                (event, data) => {
                    emit(event, data);
                }
            )

        }

    });

    return () => h('div', {  class: 'ht-memberships-wrap', ref: wrap });

}, {
    props: PROPS_KEYS.memberships as unknown as (keyof MembershipsPropsCamelCase)[],
    emits: MEMBERSHIPS_EVENTS,
});

</script>