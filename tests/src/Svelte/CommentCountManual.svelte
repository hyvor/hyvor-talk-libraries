<script lang="ts">
    import { onMount } from "svelte";
    import { TESTING_WEBSITE_ID } from "..";
    import { CommentCount, loadCommentCounts } from "../../../svelte/src";

    onMount(() => {

        /**
         * Here we set a window loader, which can be called from
         * e2e tests to load the comment counts.
         * It uses the callback to update the comment count text as well
         */
         (window as any).loader = () => {

            loadCommentCounts({
                "website-id": TESTING_WEBSITE_ID,
                mode: 'number'
            }, (count) => {
                return count + ' comments here';
            })

        }

    })

</script>

<CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} loading="manual" />