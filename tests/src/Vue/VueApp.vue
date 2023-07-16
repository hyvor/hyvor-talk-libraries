<script setup lang="ts">
import VueNav from './VueNav.vue';
import {reactive} from 'vue';
import {TESTING_WEBSITE_ID} from '../';
import { Comments, CommentCount } from '@hyvor/hyvor-talk-vue';
import CommentsEvents from './CommentsEvents.vue';
import CommentCountManual from './CommentCountManual.vue';

let nav = reactive({name: ''});

function handleClick(e) {
    nav.name = e.target.dataset.name;
}
</script>

<template>
    
    <div className="wrap">

        <div className="nav" data-testid="nav">

            <h2>Vue</h2>

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

            <Comments v-if="nav.name === 'Comments - Basic'" :website-id="TESTING_WEBSITE_ID" />
            <Comments v-if="nav.name === 'Comments - Dark'" :website-id="TESTING_WEBSITE_ID" colors="dark" />
            <Comments v-if="nav.name === 'Comments - Loading'" :website-id="TESTING_WEBSITE_ID" loading="manual" />

            <Comments v-if="nav.name === 'Comments - Settings'" :website-id="TESTING_WEBSITE_ID" :settings="{
                top_widget: 'ratings'
            }" />

            <Comments 
                v-if="nav.name === 'Comments - Translations'"
                :website-id="TESTING_WEBSITE_ID" 
                :translations="{
                    no_comments_text: 'No comments yet.'
                }" 
            />

            <div v-if="nav.name === 'Comments - Multi'">
                <Comments :website-id="TESTING_WEBSITE_ID" page-id="1" />
                <Comments :website-id="TESTING_WEBSITE_ID" page-id="2" />
            </div>

            <CommentsEvents v-if="nav.name === 'Comments - Events'" />

            <CommentCount 
                v-if="nav.name === 'CommentCount - Basic'" 
                page-id={location.href} 
                :website-id="TESTING_WEBSITE_ID" 
            />

            <CommentCount 
                v-if="nav.name === 'CommentCount - Number'" 
                page-id={location.href} 
                :website-id="TESTING_WEBSITE_ID" 
                mode="number"
            />

            <CommentCount 
                v-if="nav.name === 'CommentCount - Language'" 
                page-id={location.href} 
                :website-id="TESTING_WEBSITE_ID" 
                language="fr"
            />

            <CommentCountManual v-if="nav.name === 'CommentCount - Manual'" />

            <div v-if="nav.name === 'CommentCount - Multi'">
                <CommentCount page-id={1} :website-id="TESTING_WEBSITE_ID" />
                <CommentCount page-id={2} :website-id="TESTING_WEBSITE_ID" />
            </div>

        </div>

    </div>

</template>