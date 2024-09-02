import type { CommentCountProps, CommentsProps, CommentsEvents, CommentsSettings, CommentsTranslationsKeys } from './comments';
import { addScriptIfNotAdded } from './helper';

export type Translations = Record<CommentsTranslationsKeys, string>;

// ======== OLD COMMENTS CODE =========
// This code is deprecated and should not be used in new projects.

export type KeysEnum<T> = { [P in keyof Required<T>]: any };
const eventNamesObject : KeysEnum<CommentsEvents> = {
    'loaded': true,
    'comment:published': true,
    'comment:edited': true,
    'comment:deleted': true,
    'comment:voted': true,
    'comment:flagged': true,
    'reaction': true,
    'rating': true,
    'auth:login:clicked': true,
    'profile:clicked': true,
};
export const eventNames = Object.keys(eventNamesObject) as (keyof CommentsEvents)[];

/**
 * @deprecated
 * Use `Comments` class instead
 */
export function addComments(
    props: CommentsProps,
    container: HTMLElement,
    onEvent: <T extends keyof CommentsEvents>(event: T, data: CommentsEvents[T]) => void
) {

    addScriptIfNotAdded('https://talk.hyvor.com/embed/embed.js');

    customElements.whenDefined('hyvor-talk-comments').then(() => {

        const comments = document.createElement('hyvor-talk-comments') as HTMLElement & {
            settings: Partial<CommentsSettings>,
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

/**
 * @deprecated
 * Use `Comments` class instead
 */
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

/**
 * @deprecated
 * Use `Comments` class instead
 */
export function addCommentCounts(props: CommentCountProps) {

    addScriptIfNotAdded('https://talk.hyvor.com/embed/comment-counts.js');

    if (props.loading !== 'manual') {
        loadCommentCounts();
    }

}