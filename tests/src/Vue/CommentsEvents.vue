<script setup lang="ts">
import { ref } from 'vue';
import { Comments } from '@hyvor/hyvor-talk-vue';
import { TESTING_WEBSITE_ID } from '../';

const loaded = ref(false);

function setLoaded() {
    loaded.value = true;
}
</script>

<template>

    <Comments
        :website-id="TESTING_WEBSITE_ID"
        @loaded="setLoaded"
    />

    <div v-if="loaded === true">Loaded!</div>

</template>