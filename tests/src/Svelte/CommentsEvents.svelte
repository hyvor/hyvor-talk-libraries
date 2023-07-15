<script lang="ts">
    import { TESTING_WEBSITE_ID } from "..";
    import {Comments} from '../../../svelte/src/lib';

    let loaded = false;
</script>

<Comments 
    website-id={TESTING_WEBSITE_ID} 
    on:loaded={() => loaded = true} 
/>

{#if loaded}
    Loaded!
{/if}
