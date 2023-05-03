<script lang="ts">
    export let nav : string | null;
    export let name : string;
</script>

<div class="nav-item" on:click={() => nav = name} on:keyup>{name}</div>