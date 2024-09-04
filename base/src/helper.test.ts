import { test, expect } from 'bun:test';
import { addScriptIfNotAdded, setAttributes } from './helper';

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

test('setAttributes', () => {

    const el = document.createElement('div');

    setAttributes(el, {
        id: 'test',
        'data-test': 'test',
        'undefined': undefined,
        'null': null,
    });

    expect(el.getAttribute('id')).toBe('test');
    expect(el.getAttribute('data-test')).toBe('test');
    expect(el.getAttribute('undefined')).toBe(null);
    expect(el.getAttribute('null')).toBe(null);

});