import { afterEach, test, expect, vi } from 'vitest';
import {render, cleanup} from '@testing-library/vue';
import { Comments, CommentCount, NewsletterForm, Memberships, GatedContent } from '../src';
import { ref, useTemplateRef } from 'vue';

afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
});

test('Comments', () => {

    const onLoad = vi.fn()
    
    render(Comments, {
        props: {
            websiteId: 10,
            pageId: 'test',
            onLoaded: onLoad
        },
    })

    const wrap = document.querySelector('.ht-comments-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-comments')!;
    expect(element).not.toBeNull();

    expect(element.getAttribute('website-id')).toBe('10');
    expect(element.getAttribute('page-id')).toBe('test');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/embed.js');

    element.dispatchEvent(new Event('loaded'));
    expect(onLoad).toHaveBeenCalledOnce()

    // refs
    // TODO: I could not find a way to test refs in Vue 3

})

test('Comment count', () => {

    render(CommentCount, {
        props: {
            pageId: '456',
        }
    })

    const wrap = document.querySelector('.ht-comment-count-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-comment-count')!;
    expect(element).not.toBeNull();

    expect(element.getAttribute('page-id')).toBe('456');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/comment-counts.js');

});

test('Newsletter form', () => {


    render(NewsletterForm, {
        props: {
            websiteId: 10,
            title: 'Subscribe to our newsletter',
        }
    })

    const wrap = document.querySelector('.ht-newsletter-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-newsletter')!;
    expect(element).not.toBeNull();

    expect(element.getAttribute('website-id')).toBe('10');
    expect(element.getAttribute('title')).toBe('Subscribe to our newsletter');

});

test('Memberships', () => {

    render(Memberships, {
        props: {
            websiteId: 10,
            ssoUser: 'SSO_USER'
        }
    })

    const wrap = document.querySelector('.ht-memberships-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-memberships')!;
    expect(element).not.toBeNull();
    
    expect(element.getAttribute('website-id')).toBe('10');
    expect(element.getAttribute('sso-user')).toBe('SSO_USER');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/memberships.js');

});


test('Gated content', () => {

    render(GatedContent, {
        props: {
            _key: 'my-key'
        }
    });
    
    const wrap = document.querySelector('.ht-gated-content-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-gated-content')!;
    expect(element).not.toBeNull();
    
    expect(element.getAttribute('key')).toBe('my-key');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(0);

});