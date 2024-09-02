import { test, expect } from 'bun:test';

test('comments', () => {
    document.body.innerHTML = `<button>My button</button>`;
    const button = document.querySelector('button');
    expect(button?.innerText).toEqual('My buttons');
});