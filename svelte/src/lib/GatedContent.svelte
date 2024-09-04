<script lang="ts">
    import {
        type GatedContentProps,
        Memberships,
    } from "@hyvor/hyvor-talk-base";
    import { onMount } from "svelte";

    type $$Props = GatedContentProps & {
        wrap?: HTMLDivElement;
        element?: HTMLElement;
    };

    export let wrap: HTMLDivElement | null = null;
    export let element: HTMLElement | null = null;

    onMount(() => {
        element = Memberships.gatedContent(
            $$restProps as GatedContentProps,
            wrap
        );
    });
</script>

<div class="ht-gated-content-wrap" bind:this={wrap}></div>
