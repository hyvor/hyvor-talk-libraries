import { Newsletters, Memberships }  from './src/index';

const form = Newsletters.form({
    'website-id': 14,
    title: 'Subscribe to our newsletter',
    "t-button-subscribe": "Subscribe",
}, document.getElementById('app')!);

const m = Memberships.memberships({
    'website-id': 8818,
}, undefined, (event, data) => {
    console.log(event, data);
    if (event === 'loaded') {
        console.log(m.api.plans().length);
    }
})

const g = Memberships.gatedContent({
    key: 'my-key'
}, document.getElementById('app')!)