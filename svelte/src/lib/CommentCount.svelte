<script lang="ts">
    import { onMount } from "svelte";
    import { addCommentCounts } from '@hyvor/hyvor-talk-base';
    import type { CommentCountProps as CommentCountPropsBase } from '@hyvor/hyvor-talk-base';

    type $$Props = CommentCountPropsBase;

    onMount(() => addCommentCounts($$props as CommentCountPropsBase));

</script>

<hyvor-talk-comment-count {...$$props} />