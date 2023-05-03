import './index.css'
import renderReact from './react';
import SvelteApp from './SvelteApp.svelte';

export const TESTING_WEBSITE_ID = 8856;

const root = document.getElementById('react-root')!;
renderReact(root);

function renderSvelte() {
    new SvelteApp({
        target: document.getElementById('svelte-root')!,
    })
}
renderSvelte();