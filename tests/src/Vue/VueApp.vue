<script setup lang="ts">
import VueNav from './VueNav.vue';
import {reactive} from 'vue';
import {TESTING_WEBSITE_ID} from '../';
import { Comments } from '@hyvor/hyvor-talk-vue';

let nav = reactive({name: ''});

function handleClick(e) {
    nav.name = e.target.dataset.name;
}
</script>

<template>
    
    <div className="wrap">

        <div className="nav" data-testid="nav">

            <VueNav name="Comments - Basic" @click="handleClick" />
            <VueNav name="Comments - Dark" @click="handleClick" />
            <VueNav name="Comments - Loading" @click="handleClick" />
            <VueNav name="Comments - Settings" @click="handleClick" />
            <VueNav name="Comments - Translations" @click="handleClick" />
            <VueNav name="Comments - Multi" @click="handleClick" />
            <VueNav name="Comments - Events" @click="handleClick" />

            <VueNav name="CommentCount - Basic" @click="handleClick" />
            <VueNav name="CommentCount - Number" @click="handleClick" />
            <VueNav name="CommentCount - Language" @click="handleClick" />
            <VueNav name="CommentCount - Manual" @click="handleClick" />
            <VueNav name="CommentCount - Multi" @click="handleClick" />

        </div>

        <div className="display" data-testid="display">

            {{ nav.name }}

            <Comments v-if="nav.name === 'Comments - Basic'" :website-id="TESTING_WEBSITE_ID" />
            <Comments v-if="nav.name === 'Comments - Dark'" :website-id="TESTING_WEBSITE_ID" colors="dark" />
            <Comments v-if="nav.name === 'Comments - Loading'" :website-id="TESTING_WEBSITE_ID" loading="manual" />

            <Comments v-if="nav.name === 'Comments - Settings'" :website-id="TESTING_WEBSITE_ID" :settings={{
                top_widget: 'ratings'
            }} />
<!--     
    {#if nav === 'Comments - Settings'}<Comments :website-id="TESTING_WEBSITE_ID" :settings={{
        top_widget: 'ratings'
    }} />{/if}
    {#if nav === 'Comments - Translations'}<Comments :website-id="TESTING_WEBSITE_ID" translations={{
        no_comments_text: "No comments yet."
    }} />{/if}
    {#if nav === 'Comments - Multi'}
        <div>
            <Comments :website-id="TESTING_WEBSITE_ID" page-id="1" />
            <Comments :website-id="TESTING_WEBSITE_ID" page-id="2" />
        </div>
    {/if}
    {#if nav === 'Comments - Events'}<CommentsEvents />{/if}


    {#if nav === 'CommentCount - Basic'}<CommentCount page-id={location.href} :website-id="TESTING_WEBSITE_ID" />{/if}
    {#if nav === 'CommentCount - Number'}<CommentCount page-id={location.href} :website-id="TESTING_WEBSITE_ID" mode="number" />{/if}
    {#if nav === 'CommentCount - Language'}<CommentCount page-id={location.href} :website-id="TESTING_WEBSITE_ID" language="fr" />{/if}
    {#if nav === 'CommentCount - Manual'}<CommentCountManual />{/if}
    {#if nav === 'CommentCount - Multi'}
        <div>
            <CommentCount page-id={1} :website-id="TESTING_WEBSITE_ID" />
            <CommentCount page-id={2} :website-id="TESTING_WEBSITE_ID" />
        </div>
    {/if} -->

        </div>

    </div>

</template>