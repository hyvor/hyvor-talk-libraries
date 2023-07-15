<script setup lang="ts">
import { CommentCount } from '.';
import Comments from './Comments.vue';
</script>

<template>
  <Comments 
    :website-id="8856" 
    page-id="1230"

    @loaded="() => console.log('loaded')"
    @comment:published="comment => console.log('comment published', comment)"
  />

  <CommentCount 
    :website-id="8856" 
    page-id="1230"
  />

</template>