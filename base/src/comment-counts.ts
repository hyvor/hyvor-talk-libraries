import { addScriptIfNotAdded } from "./helper";
import { HYVOR_TALK_CLOUD_INSTANCE } from "./vars";

export interface CommentCountProps {
    'page-id': string | number,
    'website-id'?: number,
    mode?: 'text' | 'number',
    language?: string,

    loading?: 'manual',
    instance?: string,
}

export class CommentCounts {

    static script(instance?: string) {
        instance = instance || HYVOR_TALK_CLOUD_INSTANCE;
        addScriptIfNotAdded(`${instance}/embed/comment-counts.js`);
    }

    static commentCount(
        props: CommentCountProps,
        wrap: HTMLElement
    ) {
        CommentCounts.script(props.instance);

        const commentCount = document.createElement('hyvor-talk-comment-count');

        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                commentCount.setAttribute(key, value as any);
            }
        }

        wrap.appendChild(commentCount);
    }

    static load(
        options: {
            "website-id"?: number,
            mode?: 'text' | 'number',
            language?: string,
        } = {},
        callback: ((count: number | string, el: Element) => string | number) | null = null
    ) {
        CommentCounts.script();


        customElements.whenDefined('hyvor-talk-comment-count').then(() => {
            (window as any).hyvorTalkCommentCounts.load(options, callback);
        });
    }

}