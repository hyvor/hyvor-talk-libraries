<script setup lang="ts">
import { onMounted } from "vue";
import { TESTING_WEBSITE_ID } from "..";
import { CommentCount, loadCommentCounts } from "@hyvor/hyvor-talk-vue";

    onMounted(() => {

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

<template>

    <CommentCount 
        page-id={location.href} 
        :website-id="TESTING_WEBSITE_ID"
        loading="manual"
    />

</template>