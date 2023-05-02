import './index.css'
import renderReact from './react';
import SvelteApp from './SvelteApp.svelte';

const root = document.getElementById('react-root')!;
renderReact(root);

function renderSvelte() {
    new SvelteApp({
        target: document.getElementById('svelte-root')!,
    })
}
renderSvelte();