<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { CommentsProps as CommentsPropsBase } from "@hyvor/hyvor-talk-base";
    import { addComments } from "@hyvor/hyvor-talk-base";

    type $$Props = CommentsPropsBase;
    let ref;

    const dispatch = createEventDispatcher();

    export let wrap: HTMLDivElement | null = null;
    export let element: NewslettersCustomElement | null = null;

    onMount(() =>
        addComments($$props as CommentsPropsBase, ref!, (event, data) => {
            dispatch(event, data);
        })
    );
</script>

<div bind:this={ref}></div>
