<script>
    import Newsletter from "../src/lib/NewsletterForm.svelte";

    let wrap;
    let element;

    $: console.log(wrap, element);
</script>

<Newsletter website-id={14} t-button-subscribe="OOO" bind:wrap bind:element />
