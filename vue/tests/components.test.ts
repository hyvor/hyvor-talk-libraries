import { afterEach, test, expect, vi } from 'vitest';
import {render, cleanup} from '@testing-library/vue';
import { Comments } from '../src'; 

afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
});

test('Comments', () => {
    
    // render(Comments, {
    //     props: {

    //     }
    // })

})