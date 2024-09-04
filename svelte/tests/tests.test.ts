import {test, describe, expect, vi, beforeEach} from 'vitest';
import { Comments, CommentCount, NewsletterForm, Memberships, GatedContent } from '../src/lib';
import ElementWrap from './ElementWrap.svelte';
import {render} from '@testing-library/svelte'
import { get, writable } from 'svelte/store';

beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
})

describe('Comments', () => {

    test('Adds with props', () => {

        const { component } = render(Comments, {
            'website-id': 123,
            'page-id': 456,
        })
        const onLoad = vi.fn()
        component.$on('loaded', onLoad)

        const wrap = document.querySelector('.ht-comments-wrap')!;
        expect(wrap).not.toBeNull();

        const element = wrap.querySelector('hyvor-talk-comments')!;
        expect(element).not.toBeNull();

        expect(element.getAttribute('website-id')).toBe('123');
        expect(element.getAttribute('page-id')).toBe('456');

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
        expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/embed.js');

        element.dispatchEvent(new Event('loaded'));
        expect(onLoad).toHaveBeenCalledOnce()

    });

    test('Binds element and wrap', () => {

        const elementStore = writable(null);
        const wrapStore = writable(null);

        render(ElementWrap, {
            component: Comments,
            elementStore,
            wrapStore,
        })

        const element = get(elementStore) as any;
        const wrap = get(wrapStore) as any;
        
        expect(element).not.toBeNull();
        expect(element.tagName).toBe('HYVOR-TALK-COMMENTS');

        expect(wrap).not.toBeNull();
        expect(wrap.classList.contains('ht-comments-wrap')).toBe(true);

    });

})

describe('Comment counts', () => {

    test('adds comment count with props', () => {

        render(CommentCount, {
            'page-id': 456,
        })

        const wrap = document.querySelector('.ht-comment-count-wrap')!;
        expect(wrap).not.toBeNull();

        const element = wrap.querySelector('hyvor-talk-comment-count')!;
        expect(element).not.toBeNull();

        expect(element.getAttribute('page-id')).toBe('456');

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
        expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/comment-counts.js');

        render(CommentCount, {
            'page-id': 457,
        })
        expect(document.querySelectorAll('script').length).toBe(1);

    });

    test('Binds element and wrap', () => {

        const elementStore = writable(null);
        const wrapStore = writable(null);

        render(ElementWrap, {
            component: CommentCount,
            elementStore,
            wrapStore,
        })

        const element = get(elementStore) as any;
        const wrap = get(wrapStore) as any;
        
        expect(element).not.toBeNull();
        expect(element.tagName).toBe('HYVOR-TALK-COMMENT-COUNT');

        expect(wrap).not.toBeNull();
        expect(wrap.classList.contains('ht-comment-count-wrap')).toBe(true);

    });


});


describe('Newsletter Form', () => {
   
    test('adds form with props', () => {

        render(NewsletterForm, {
            'website-id': 123,
            'title': 'Subscribe to our newsletter',
        })

        const wrap = document.querySelector('.ht-newsletter-wrap')!;
        expect(wrap).not.toBeNull();

        const element = wrap.querySelector('hyvor-talk-newsletter')!;
        expect(element).not.toBeNull();

        expect(element.getAttribute('website-id')).toBe('123');
        expect(element.getAttribute('title')).toBe('Subscribe to our newsletter');

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
        expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/newsletter.js');

    });

    test('Binds element and wrap', () => {

        const elementStore = writable(null);
        const wrapStore = writable(null);

        render(ElementWrap, {
            component: NewsletterForm,
            elementStore,
            wrapStore,
        })

        const element = get(elementStore) as any;
        const wrap = get(wrapStore) as any;
        
        expect(element).not.toBeNull();
        expect(element.tagName).toBe('HYVOR-TALK-NEWSLETTER');

        expect(wrap).not.toBeNull();
        expect(wrap.classList.contains('ht-newsletter-wrap')).toBe(true);

    });

});

describe('Memberships', () => {

    test('adds memberships with props', () => {

        render(Memberships, {
            'website-id': 123,
            'sso-user': 'SSO USER'
        })

        const wrap = document.querySelector('.ht-memberships-wrap')!;
        expect(wrap).not.toBeNull();

        const element = wrap.querySelector('hyvor-talk-memberships')!;
        expect(element).not.toBeNull();

        expect(element.getAttribute('website-id')).toBe('123');
        expect(element.getAttribute('sso-user')).toBe('SSO USER');

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
        expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/memberships.js');

    });

    test('Binds element and wrap', () => {

        const elementStore = writable(null);
        const wrapStore = writable(null);

        render(ElementWrap, {
            component: Memberships,
            elementStore,
            wrapStore,
        })

        const element = get(elementStore) as any;
        const wrap = get(wrapStore) as any;
        
        expect(element).not.toBeNull();
        expect(element.tagName).toBe('HYVOR-TALK-MEMBERSHIPS');

        expect(wrap).not.toBeNull();
        expect(wrap.classList.contains('ht-memberships-wrap')).toBe(true);

    });

});

describe('Gated Content', () => {

    test('adds gated content with props', () => {

        render(GatedContent, {
            'key': 'my-key'
        });

        const wrap = document.querySelector('.ht-gated-content-wrap')!;
        expect(wrap).not.toBeNull();

        const element = wrap.querySelector('hyvor-talk-gated-content')!;
        expect(element).not.toBeNull();

        expect(element.getAttribute('key')).toBe('my-key');

        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(0);

    });

    test('Binds element and wrap', () => {

        const elementStore = writable(null);
        const wrapStore = writable(null);

        render(ElementWrap, {
            component: GatedContent,
            elementStore,
            wrapStore,
        })

        const element = get(elementStore) as any;
        const wrap = get(wrapStore) as any;
        
        expect(element).not.toBeNull();
        expect(element.tagName).toBe('HYVOR-TALK-GATED-CONTENT');

        expect(wrap).not.toBeNull();
        expect(wrap.classList.contains('ht-gated-content-wrap')).toBe(true);

    });


});