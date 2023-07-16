import { createApp } from 'vue';
import './index.css'
import renderReact from './react';
import SvelteApp from './SvelteApp.svelte';
import VueApp from './Vue/VueApp.vue';

export const TESTING_WEBSITE_ID = 8856;

const root = document.getElementById('react-root')!;
renderReact(root);

function renderSvelte() {
    new SvelteApp({
        target: document.getElementById('svelte-root')!,
    })
}
renderSvelte();


createApp(VueApp).mount('#vue-root');