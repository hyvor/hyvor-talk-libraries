import type { CommentCountProps, CommentsProps, Settings, Translations } from './types';

export function addScriptIfNotAdded(src: string) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.type = 'module';
    document.head.appendChild(script);
}

export function addComments(props: CommentsProps, container: HTMLElement) {

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