<script lang="ts">
    import {
        type MembershipsProps,
        type MembershipsCustomElement,
        Memberships,
        type MembershipsEvents,
    } from "@hyvor/hyvor-talk-base";
    import { createEventDispatcher, onMount } from "svelte";

    type $$Props = MembershipsProps & {
        wrap?: HTMLDivElement;
        element?: MembershipsCustomElement;
    };

    export let wrap: HTMLDivElement | null = null;
    export let element: MembershipsCustomElement | null = null;

    const dispatch = createEventDispatcher<MembershipsEvents>();

    onMount(() => {
        element = Memberships.memberships(
            $$restProps as MembershipsProps,
            wrap,
            (event, data) => {
                dispatch(event, data);
            }
        );
    });
</script>

<div class="ht-memberships-wrap" bind:this={wrap}></div>
