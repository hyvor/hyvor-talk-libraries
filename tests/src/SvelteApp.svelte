<script lang="ts">
    import NavItem from "./Svelte/NavItem.svelte";
    import {Comments, CommentCount} from '../../svelte/src/lib';
    import { TESTING_WEBSITE_ID } from ".";
    import CommentCountManual from "./Svelte/CommentCountManual.svelte";

    let nav : null | string = null;
    
</script>

<div class="wrap">

    <div class="nav" data-testid="nav">
        <NavItem name="Comments - Basic" bind:nav={nav} />
        <NavItem name="Comments - Dark" bind:nav={nav} />
        <NavItem name="Comments - Loading" bind:nav={nav} />
        <NavItem name="Comments - Settings" bind:nav={nav} />
        <NavItem name="Comments - Translations" bind:nav={nav} />
        <NavItem name="Comments - Multi" bind:nav={nav} />

        <NavItem name="CommentCount - Basic" bind:nav={nav} />
        <NavItem name="CommentCount - Number" bind:nav={nav} />
        <NavItem name="CommentCount - Language" bind:nav={nav} />
        <NavItem name="CommentCount - Manual" bind:nav={nav} />
        <NavItem name="CommentCount - Multi" bind:nav={nav} />
    </div>

    {#if nav === 'Comments - Basic'}<Comments website-id={TESTING_WEBSITE_ID} />{/if}
    {#if nav === 'Comments - Dark'}<Comments website-id={TESTING_WEBSITE_ID} colors="dark" />{/if}
    {#if nav === 'Comments - Loading'}<Comments website-id={TESTING_WEBSITE_ID} loading="manual" />{/if}
    {#if nav === 'Comments - Settings'}<Comments website-id={TESTING_WEBSITE_ID} settings={{
        top_widget: 'ratings'
    }} />{/if}
    {#if nav === 'Comments - Translations'}<Comments website-id={TESTING_WEBSITE_ID} translations={{
        no_comments_text: "No comments yet."
    }} />{/if}
    {#if nav === 'Comments - Multi'}
        <div>
            <Comments website-id={TESTING_WEBSITE_ID} page-id="1" />
            <Comments website-id={TESTING_WEBSITE_ID} page-id="2" />
        </div>
    {/if}


    {#if nav === 'CommentCount - Basic'}<CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} />{/if}
    {#if nav === 'CommentCount - Number'}<CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} mode="number" />{/if}
    {#if nav === 'CommentCount - Language'}<CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} language="fr" />{/if}
    {#if nav === 'CommentCount - Manual'}<CommentCountManual />{/if}
    {#if nav === 'CommentCount - Multi'}
        <div>
            <CommentCount page-id={1} website-id={TESTING_WEBSITE_ID} />
            <CommentCount page-id={2} website-id={TESTING_WEBSITE_ID} />
        </div>
    {/if}

</div>