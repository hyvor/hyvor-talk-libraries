import { test, expect } from 'bun:test';
import { Memberships, MEMBERSHIPS_EVENTS } from './index';

test('memberships embed', () => {

    Memberships.memberships({
        "website-id": 123,
        'sso-user': 'SSO USER',
        'sso-hash': 'SSO HASH',
        language: 'en',
        colors: 'dark',
        "t-button-subscribe": 'Subscribe',
    });


    const el = document.querySelector('body > hyvor-talk-memberships')!;
    expect(el).not.toBeNull();
    expect(el.getAttribute('website-id')).toBe('123');
    expect(el.getAttribute('sso-user')).toBe('SSO USER');
    expect(el.getAttribute('sso-hash')).toBe('SSO HASH');
    expect(el.getAttribute('language')).toBe('en');
    expect(el.getAttribute('colors')).toBe('dark');
    expect(el.getAttribute('t-button-subscribe')).toBe('Subscribe');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/memberships.js');

});

test('memberships events', () => {

    const events = MEMBERSHIPS_EVENTS;
    const calledEvents : string[] = [];

    const wrap = document.createElement('div');

    Memberships.memberships({
        "website-id": 123,
    }, wrap, (eventName) => {
        calledEvents.push(eventName);
    });

    const el = wrap.querySelector('hyvor-talk-memberships')!;

    events.forEach(eventName => {
        el.dispatchEvent(new CustomEvent(eventName));
    });

    expect(calledEvents).toEqual(events);

});


test('gated content element', () => {

    const wrap = document.createElement('div');

    Memberships.gatedContent({
        key: 'my-key',
        secure: 'my-secure',
        'default-gate-title': 'my-title',
        'default-gate-content': 'my-content',
    }, wrap);

    const el = wrap.querySelector('hyvor-talk-gated-content')!;
    expect(el).not.toBeNull();
    expect(el.getAttribute('key')).toBe('my-key');
    expect(el.getAttribute('secure')).toBe('my-secure');
    expect(el.getAttribute('default-gate-title')).toBe('my-title');
    expect(el.getAttribute('default-gate-content')).toBe('my-content');

});