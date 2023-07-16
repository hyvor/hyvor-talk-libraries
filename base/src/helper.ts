import type { CommentCountProps, CommentsProps, Events, Settings, Translations } from './types';

export function addScriptIfNotAdded(src: string) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'module';
    document.head.appendChild(script);
}

export type KeysEnum<T> = { [P in keyof Required<T>]: any };
const eventNamesObject : KeysEnum<Events> = {
    'loaded': true,
    'comment:published': true,
    'comment:edited': true,
    'comment:deleted': true,
    'comment:voted': true,
    'comment:flagged': true,
    'reaction': true,
    'rating': true,
    'auth:login:clicked': true
};
export const eventNames = Object.keys(eventNamesObject) as (keyof Events)[];

export function addComments(
    props: CommentsProps,
    container: HTMLElement,
    onEvent: <T extends keyof Events>(event: T, data: Events[T]) => void
) {

    addScriptIfNotAdded('https://talk.hyvor.com/embed/embed.js');

    customElements.whenDefined('hyvor-talk-comments').then(() => {

        const comments = document.createElement('hyvor-talk-comments') as HTMLElement & {
            settings: Partial<Settings>,
            translations: Partial<Translations>
        };

        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                if (key === 'settings' || key === 'translations') {
                    comments[key] = value;
                } else {
                    comments.setAttribute(key, value);
                }
            }
        }

        eventNames.forEach(eventName => {
            comments.addEventListener(eventName, (e: any) => {
                onEvent(eventName, e.detail);
            });
        });

        container.innerHTML = '';
        container.appendChild(comments);

    });

}

export function loadCommentCounts(
    options: {
        "website-id"?: number,
        mode?: 'text' | 'number',
        language?: string,
    } = {},
    callback: ((count: number | string, el: Element) => string | number) | null = null
) {
    customElements.whenDefined('hyvor-talk-comment-count').then(() => {
        (window as any).hyvorTalkCommentCounts.load(options, callback);
    });
}

export function addCommentCounts(props: CommentCountProps) {

    addScriptIfNotAdded('https://talk.hyvor.com/embed/comment-counts.js');

    if (props.loading !== 'manual') {
        loadCommentCounts();
    }

}