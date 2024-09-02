import { test, expect } from 'bun:test';
import { addScriptIfNotAdded } from './helper';

test('addScriptIfNotAdded', () => {

    const url = 'https://example.com/script.js';

    addScriptIfNotAdded(url);

    const script = document.querySelectorAll(`script[src="${url}"]`);
    expect(script.length).toBe(1);
    expect(script[0].getAttribute('src')).toBe(url);
    expect(script[0].getAttribute('type')).toBe('module');
    expect(script[0].getAttribute('async')).toBe('');

    addScriptIfNotAdded(url);

    const script2 = document.querySelectorAll(`script[src="${url}"]`);
    expect(script2.length).toBe(1);
    expect(script2[0].getAttribute('src')).toBe(url);

});