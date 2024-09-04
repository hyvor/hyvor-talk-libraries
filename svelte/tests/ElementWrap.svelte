<script lang="ts">
    import { ComponentType } from "svelte";

    export let elementStore;
    export let wrapStore;
    export let component: ComponentType;
</script>

<svelte:component
    this={component}
    bind:element={$elementStore}
    bind:wrap={$wrapStore}
/>
