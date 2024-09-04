<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import {
        type CommentsCustomElement,
        type CommentsProps,
        Comments,
        type CommentsEvents,
    } from "@hyvor/hyvor-talk-base";

    type $$Props = CommentsProps & {
        wrap?: HTMLDivElement;
        element?: CommentsCustomElement;
    };

    const dispatch = createEventDispatcher<CommentsEvents>();

    export let wrap: HTMLDivElement | null = null;
    export let element: CommentsCustomElement | null = null;

    onMount(() => {
        element = Comments.comments(
            $$restProps as CommentsProps,
            wrap!,
            (event, data) => {
                dispatch(event, data);
            }
        );
    });
</script>

<div class="ht-comments-wrap" bind:this={wrap}></div>
