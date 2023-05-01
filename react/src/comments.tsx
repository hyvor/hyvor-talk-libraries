import { useEffect, useRef } from 'react';
import type { Settings, Translations } from '../../types';

interface CommentsProps {

    "website-id": number,
    
    "page-id"?: number | string,
    "page-url"?: string,
    "page-title"?: string,
    "page-language"?: string,
    "page-author"?: string,

    "sso-user"?: string,
    "sso-hash"?: string,

    colors?: 'light' | 'dark' | 'os',
    loading?: 'default' | 'lazy' | 'manual',

    settings?: Settings,
    translations?: Translations
}

export function Comments(props: CommentsProps) {

    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {

        addCommentsEmbedScript();

        const comments = document.createElement('hyvor-talk-comments');

        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                comments.setAttribute(key, value);
            }
        }

        ref.current?.appendChild(comments);

    }, []);

    return <div ref={ref}></div>

}


export function addCommentsEmbedScript() {

    if (!document.querySelector('script[src="https://talk.hyvor.com/embed/embed.js"]')) {
        const script = document.createElement('script');

        script.src = 'https://talk.hyvor.com/embed/embed.js';
        script.async = true;
        script.type = 'module';

        document.body.appendChild(script);
    }

}