import React, { useEffect } from "react";
import { addScriptIfNotAdded } from "./helper";


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


export function CommentCount(props: {
    'page-id': string | number,
    'website-id'?: number,
    mode?: 'text' | 'number',
    language?: string,

    loading?: 'manual'
}) {

    useEffect(() => {
        addScriptIfNotAdded('https://talk.hyvor.com/embed/comment-counts.js');

        if (props.loading === 'manual') {
            return;
        }
        loadCommentCounts();
    }, []);

    return <hyvor-talk-comment-count {...props} />
}