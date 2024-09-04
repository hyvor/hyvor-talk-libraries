import { afterEach, test, expect, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import {render} from '@testing-library/react'
import { Comments, CommentCount, NewsletterForm, Memberships, GatedContent } from '../src'
import React, { createRef } from 'react';

afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
});

test('Comments', () => {

    const onLoad = vi.fn()

    const ref = createRef() as any;

    render(<Comments 
        website-id={10} 
        page-id="test"
        on={{
            loaded: onLoad
        }}
        ref={ref}
    />);

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
    const elementRef = ref.current.element();
    const wrapRef = ref.current.wrap();
        
    expect(elementRef).not.toBeNull();
    expect(elementRef.tagName).toBe('HYVOR-TALK-COMMENTS');

    expect(wrapRef).not.toBeNull();
    expect(wrapRef.classList.contains('ht-comments-wrap')).toBe(true);

});

test('Comment count', () => {

    const ref = createRef() as any;
    render(<CommentCount page-id="456" ref={ref} />);

    const wrap = document.querySelector('.ht-comment-count-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-comment-count')!;
    expect(element).not.toBeNull();

    expect(element.getAttribute('page-id')).toBe('456');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/comment-counts.js');

    // refs
    const elementRef = ref.current.element();
    const wrapRef = ref.current.wrap();
    
    expect(elementRef).not.toBeNull();
    expect(elementRef.tagName).toBe('HYVOR-TALK-COMMENT-COUNT');

    expect(wrapRef).not.toBeNull();
    expect(wrapRef.classList.contains('ht-comment-count-wrap')).toBe(true);

});

test('Newsletter form', () => {

    const ref = createRef() as any;
    render(<NewsletterForm 
        website-id={10} 
        title="Subscribe to our newsletter"
        ref={ref}
    />);

    const wrap = document.querySelector('.ht-newsletter-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-newsletter')!;
    expect(element).not.toBeNull();
    
    expect(element.getAttribute('website-id')).toBe('10');
    expect(element.getAttribute('title')).toBe('Subscribe to our newsletter');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/newsletter.js');

    // refs
    const elementRef = ref.current.element();
    const wrapRef = ref.current.wrap();
    
    expect(elementRef).not.toBeNull();
    expect(elementRef.tagName).toBe('HYVOR-TALK-NEWSLETTER');

    expect(wrapRef).not.toBeNull();
    expect(wrapRef.classList.contains('ht-newsletter-wrap')).toBe(true);

});

test('Memberships', () => {

    const ref = createRef() as any;
    render(<Memberships
        website-id={10} 
        sso-user="SSO_USER"
        ref={ref}
    />);

    const wrap = document.querySelector('.ht-memberships-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-memberships')!;
    expect(element).not.toBeNull();
    
    expect(element.getAttribute('website-id')).toBe('10');
    expect(element.getAttribute('sso-user')).toBe('SSO_USER');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/memberships.js');

    // refs
    const elementRef = ref.current.element();
    const wrapRef = ref.current.wrap();
    
    expect(elementRef).not.toBeNull();
    expect(elementRef.tagName).toBe('HYVOR-TALK-MEMBERSHIPS');

    expect(wrapRef).not.toBeNull();
    expect(wrapRef.classList.contains('ht-memberships-wrap')).toBe(true);

});

test('Gated content', () => {

    const ref = createRef() as any;
    render(<GatedContent
        _key='my-key'
        ref={ref}
    />);

    const wrap = document.querySelector('.ht-gated-content-wrap')!;
    expect(wrap).not.toBeNull();

    const element = wrap.querySelector('hyvor-talk-gated-content')!;
    expect(element).not.toBeNull();
    
    expect(element.getAttribute('key')).toBe('my-key');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(0);

    // refs
    const elementRef = ref.current.element();
    const wrapRef = ref.current.wrap();
    
    expect(elementRef).not.toBeNull();
    expect(elementRef.tagName).toBe('HYVOR-TALK-GATED-CONTENT');

    expect(wrapRef).not.toBeNull();
    expect(wrapRef.classList.contains('ht-gated-content-wrap')).toBe(true);

});