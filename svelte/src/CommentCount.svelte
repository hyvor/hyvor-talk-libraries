<script lang="ts">
    import { onMount } from "svelte";
    import { addCommentCounts } from '../../helper';
    import type { CommentCountProps } from '../../types';

    type $$Props = CommentCountProps;

    onMount(() => addCommentCounts($$props as CommentCountProps));

</script>

<hyvor-talk-comment-count {...$$props} />