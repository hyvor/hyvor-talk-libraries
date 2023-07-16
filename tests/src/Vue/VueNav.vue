<script lang="ts" setup>
const props = defineProps<{name: string}>();
</script>

<template>
    <div className="nav-item" :data-name="props.name">{{name}}</div>
</template>