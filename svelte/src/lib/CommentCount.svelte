<script lang="ts">
    import { onMount } from "svelte";
    import {
        type CommentCountProps,
        CommentCounts,
    } from "@hyvor/hyvor-talk-base";

    type $$Props = CommentCountProps & {
        wrap?: HTMLSpanElement;
    };

    export let wrap: HTMLSpanElement | null = null;

    onMount(() => {
        CommentCounts.commentCount($$props as CommentCountProps, wrap);
    });
</script>

<span class="ht-comment-count-wrap" bind:this={wrap}></span>
