import { test, expect } from 'vitest';
import { htPropsFromVueProps } from '../src/helper';

test('helpers', () => {
   
    expect(htPropsFromVueProps({
        websiteId: '123',
        pageId: 'my-page-id',
        tComments0: 'No comments yet',
    })).toEqual({
        'website-id': '123',
        'page-id': 'my-page-id',
        't-comments-0': 'No comments yet',
    });

});