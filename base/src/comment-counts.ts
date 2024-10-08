import { addScriptIfNotAdded, setAttributes } from "./helper";
import { HYVOR_TALK_CLOUD_INSTANCE } from "./vars";

export interface CommentCountProps {
    'page-id': string | number,
    'website-id'?: number,
    mode?: 'text' | 'number',
    language?: string,

    loading?: 'manual',
    instance?: string,
}

export type CommentCountCustomElement = HTMLElement;

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

        const commentCount = document.createElement('hyvor-talk-comment-count') as CommentCountCustomElement;
        setAttributes(commentCount, props);

        wrap.appendChild(commentCount);

        return commentCount;
    }

    static load<T extends 'text' | 'number'>(
        options: {
            "website-id"?: number,
            mode?: T,
            language?: string,
        } = {},
        callback: ((
            count: 
                T extends 'number' ? 
                    number : (
                        T extends 'text' ?
                            string : number | string
                    )
            , el: Element) => string | number) | null = null
    ) {
        CommentCounts.script();


        customElements.whenDefined('hyvor-talk-comment-count').then(() => {
            (window as any).hyvorTalkCommentCounts.load(options, callback);
        });
    }

}