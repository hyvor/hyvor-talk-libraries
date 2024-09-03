import { test, expect } from 'bun:test';
import { CommentCounts } from './index';

test('comment count element', () => {

    const wrap = document.createElement('div');

    CommentCounts.commentCount({
        'page-id': '123',
        'website-id': 456,
        mode: 'text',
        language: 'en',
    }, wrap);

    const commentCount = wrap.querySelector('hyvor-talk-comment-count')!;
    expect(commentCount).not.toBeNull();

    expect(commentCount.getAttribute('page-id')).toBe('123');
    expect(commentCount.getAttribute('website-id')).toBe('456');
    expect(commentCount.getAttribute('mode')).toBe('text');
    expect(commentCount.getAttribute('language')).toBe('en');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/comment-counts.js');

});

test('load comment counts', () => {

    CommentCounts.load({
        'website-id': 456,
        mode: 'text',
    });

    const script = document.querySelector('script')!;
    expect(script).not.toBeNull();
    expect(script.src).toBe('https://talk.hyvor.com/embed/comment-counts.js');

})