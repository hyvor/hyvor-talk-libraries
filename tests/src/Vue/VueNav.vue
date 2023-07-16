<script lang="ts" setup>
import { defineProps, defineEmits, onMounted, ref, h } from 'vue';
const props = defineProps<{name: string}>();
</script>

<template>
    <div className="nav-item" :data-name="props.name">{{name}}</div>
</template>