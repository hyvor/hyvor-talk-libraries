<script setup lang="ts">
    import { onMounted } from 'vue';
    import { Comments, CommentCount, NewsletterForm, Memberships, GatedContent } from './src';
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
        @loaded="() => console.log('loaded')"
    />
    <CommentCount
        page-id="1"
    />
    <NewsletterForm
        :website-id="14"
        title="Subscribe to our newsletter"
    />
    <Memberships
        :website-id="8818"
        sso-user="test"
    />
    <GatedContent
        _key="key"
    />
</template>