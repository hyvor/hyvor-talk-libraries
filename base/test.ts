import { Newsletters, Memberships, Comments }  from './src/index';

// const form = Newsletters.form({
//     'website-id': 14,
//     title: 'Subscribe to our newsletter',
//     "t-button-subscribe": "Subscribe",
// }, document.getElementById('app')!);

// const m = Memberships.memberships({
//     'website-id': 8818,
// }, undefined, (event, data) => {
//     console.log(event, data);
//     if (event === 'loaded') {
//         console.log(m.api.plans().length);
//     }
// })

// const g = Memberships.gatedContent({
//     key: 'my-key'
// }, document.getElementById('app')!)


const c = Comments.comments({
    "website-id": 1,
    instance: 'https://talk.hyvorstaging.com',
    settings: {
        'custom_css': '#app {font-size:20px}'
    },
    "t-login": "Login Please"
}, document.getElementById('app')!);