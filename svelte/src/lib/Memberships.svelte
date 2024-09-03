<script lang="ts">
    import {
        type MembershipsProps,
        type MembershipsCustomElement,
        Memberships,
        type MembershipsApiEvents,
    } from "@hyvor/hyvor-talk-base";
    import { createEventDispatcher, onMount } from "svelte";

    type $$Props = MembershipsProps & {
        wrap?: HTMLDivElement;
        element?: MembershipsCustomElement;
    };

    export let wrap: HTMLDivElement | null = null;
    export let element: MembershipsCustomElement | null = null;

    const dispatch = createEventDispatcher<MembershipsApiEvents>();

    onMount(() => {
        element = Memberships.memberships(
            $$props as MembershipsProps,
            wrap,
            (event, data) => {
                dispatch(event, data);
            }
        );
    });
</script>

<div class="ht-memberships-wrap" bind:this={wrap}></div>
