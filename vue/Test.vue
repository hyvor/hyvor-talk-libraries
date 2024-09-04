<script setup lang="ts">
    import { onMounted } from 'vue';
    import { Comments } from './src';
    import CommentCount from './src/CommentCount.vue';
    import { CommentCounts } from '@hyvor/hyvor-talk-base';

    onMounted(() => {
        CommentCounts.load({
            "website-id": 14
        });
    })
</script>

<template>
    <Comments 
        :website-id="14"
        t-login="LOOGIN"
    />
    <CommentCount
        page-id="1"
    />
</template>