<script lang="ts">
    import { onMount } from "svelte";
    import {
        type CommentCountProps,
        CommentCounts,
    } from "@hyvor/hyvor-talk-base";

    type $$Props = CommentCountProps & {
        wrap?: HTMLSpanElement;
        element?: HTMLElement;
    };

    export let wrap: HTMLSpanElement | null = null;
    export let element: HTMLElement | null = null;

    onMount(() => {
        element = CommentCounts.commentCount(
            $$restProps as CommentCountProps,
            wrap
        );
    });
</script>

<span class="ht-comment-count-wrap" bind:this={wrap}></span>
