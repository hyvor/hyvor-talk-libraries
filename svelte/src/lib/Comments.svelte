<script lang="ts">
    import { onMount } from 'svelte';
    import type { CommentsProps as CommentsPropsBase } from '@hyvor/hyvor-talk-base';
    import { addComments } from '@hyvor/hyvor-talk-base';
    
    type $$Props = CommentsPropsBase;
    let ref;

    onMount(() => addComments($$props as CommentsPropsBase, ref!));
</script>

<div bind:this={ref}></div>