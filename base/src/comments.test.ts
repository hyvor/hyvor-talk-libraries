import { test, expect } from 'bun:test';
import { Comments, COMMENTS_EVENTS }  from './index';

test('creates an element with all props', () => {

    Comments.comments({
        "website-id": 123,
        'page-id': "my-page",
        'page-url': "https://example.com/my-page",
        'page-title': "My Page",
        'page-language': 'fr',
        'page-author': 'john@doe.com',

        'sso-user': 'SSO USER',
        'sso-hash': 'SSO HASH',

        colors: 'dark',
        loading: 'lazy',

        settings: {
            custom_css: 'my-custom-css',
            comments_view: {
                is_keyboard_navigation_on: false
            }
        },

        't-login': "Log in",
        't-comments': 'Comments (*)',

    }, document.body);

    const el = document.querySelector('hyvor-talk-comments')!;

    expect(el).not.toBeNull();
    
    expect(el.getAttribute('website-id')).toBe('123');
    expect(el.getAttribute('page-id')).toBe('my-page');
    expect(el.getAttribute('page-url')).toBe('https://example.com/my-page');
    expect(el.getAttribute('page-title')).toBe('My Page');
    expect(el.getAttribute('page-language')).toBe('fr');
    expect(el.getAttribute('page-author')).toBe('john@doe.com');
    expect(el.getAttribute('sso-user')).toBe('SSO USER');
    expect(el.getAttribute('sso-hash')).toBe('SSO HASH');
    expect(el.getAttribute('colors')).toBe('dark');
    expect(el.getAttribute('loading')).toBe('lazy');

    expect(el.getAttribute('settings')).toBe('{"custom_css":"my-custom-css","comments_view":{"is_keyboard_navigation_on":false}}');
    expect(el.getAttribute('t-login')).toBe('Log in');
    expect(el.getAttribute('t-comments')).toBe('Comments (*)');

    const script = document.querySelectorAll('script');
    expect(script.length).toBe(1);
    expect(script[0].getAttribute('src')).toBe('https://talk.hyvor.com/embed/embed.js');

});

test('creates an element with instance', () => {

    Comments.comments({
        "website-id": 123,
        instance: 'https://example.org',
    }, document.body);

    const el = document.querySelector('hyvor-talk-comments')!;
    expect(el).not.toBeNull();
    expect(el.getAttribute('website-id')).toBe('123');
    expect(el.getAttribute('instance')).toBe('https://example.org');

    const script = document.querySelectorAll('script');
    expect(script.length).toBe(1);
    expect(script[0].getAttribute('src')).toBe('https://example.org/embed/embed.js');

});

test('old translations property is changed to t- attributes', () => {

    Comments.comments({
        "website-id": 123,
        translations: {
            login: 'Log in',
            'guest-email': 'Email',
            'guest_name': 'Name',
        }
    }, document.body);

    const el = document.querySelector('hyvor-talk-comments')!;
    expect(el).not.toBeNull();
    expect(el.getAttribute('website-id')).toBe('123');
    expect(el.getAttribute('t-login')).toBe('Log in');
    expect(el.getAttribute('t-guest-email')).toBe('Email');
    expect(el.getAttribute('t-guest-name')).toBe('Name');

});

test('listens to events', () => {

    const events = COMMENTS_EVENTS;
    const calledEvents : string[] = [];

    Comments.comments({
        "website-id": 123,
    }, document.body, (eventName) => {
        calledEvents.push(eventName);
    });

    const el = document.querySelector('hyvor-talk-comments')!;

    events.forEach(eventName => {
        el.dispatchEvent(new CustomEvent(eventName));
    });

    expect(calledEvents).toEqual(events);

});