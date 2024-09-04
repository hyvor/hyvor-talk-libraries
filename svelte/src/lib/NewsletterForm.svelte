<script lang="ts">
    import {
        type NewslettersCustomElement,
        type NewslettersProps,
        Newsletters,
    } from "@hyvor/hyvor-talk-base";
    import { onMount } from "svelte";

    type $$Props = NewslettersProps & {
        wrap?: HTMLDivElement;
        element?: NewslettersCustomElement;
    };

    export let wrap: HTMLDivElement | null = null;
    export let element: NewslettersCustomElement | null = null;

    onMount(() => {
        element = Newsletters.form($$restProps as NewslettersProps, wrap);
    });
</script>

<div class="ht-newsletter-wrap" bind:this={wrap}></div>
