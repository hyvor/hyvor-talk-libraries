import { addComments } from './src/helper';


addComments({
    'website-id': 8856,
}, document.getElementById('app')!, (event, data) => {
    console.log(event);
});