<script>
    import { onMount } from "svelte";
    import {
        Comments,
        NewsletterForm,
        Memberships,
        GatedContent,
    } from "../src/lib";
    import CommentCount from "../src/lib/CommentCount.svelte";
    import { CommentCounts } from "@hyvor/hyvor-talk-base";

    let wrap;
    let element;

    $: console.log(wrap, element);

    onMount(() => {
        CommentCounts.load();
    });
</script>

<!-- <NewsletterForm
    website-id={14}
    t-button-subscribe="OOO"
    bind:wrap
    bind:element
/>

<Memberships website-id={8818} bind:wrap bind:element />

<GatedContent key="key" /> -->

<Comments website-id={14} bind:element />

<CommentCount website-id={14} bind:wrap />
