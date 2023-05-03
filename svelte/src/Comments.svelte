<script lang="ts">
    import { onMount } from 'svelte';
    import type { CommentsProps } from '../../types';
    import { addComments } from '../../helper';
    
    type $$Props = CommentsProps;
    let ref;

    onMount(() => addComments($$props as CommentsProps, ref!));
</script>

<div bind:this={ref}></div>