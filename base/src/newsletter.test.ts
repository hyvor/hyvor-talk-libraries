import { test, expect } from 'bun:test';
import { Newsletters } from './index';

test('newsletter element', () => {

    const wrap = document.createElement('div');

    Newsletters.form({
        'website-id': 456,
        title: 'Subscribe to our newsletter',
        description: 'Get the latest updates',
        language: 'en',
        'sso-user': 'SSO USER',
        'sso-hash': 'SSO HASH',
        colors: 'dark',
        't-button-subscribe': 'Subscribe',
    }, wrap);

    const newsletter = wrap.querySelector('hyvor-talk-newsletter')!;
    expect(newsletter).not.toBeNull();

    expect(newsletter.getAttribute('website-id')).toBe('456');
    expect(newsletter.getAttribute('title')).toBe('Subscribe to our newsletter');
    expect(newsletter.getAttribute('description')).toBe('Get the latest updates');
    expect(newsletter.getAttribute('language')).toBe('en');
    expect(newsletter.getAttribute('sso-user')).toBe('SSO USER');
    expect(newsletter.getAttribute('sso-hash')).toBe('SSO HASH');
    expect(newsletter.getAttribute('colors')).toBe('dark');
    expect(newsletter.getAttribute('t-button-subscribe')).toBe('Subscribe');

    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].src).toBe('https://talk.hyvor.com/embed/newsletter.js');

});