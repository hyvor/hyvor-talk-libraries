import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef } from 'react';
import { Comments, CommentCount, NewsletterForm, Memberships, GatedContent }  from './src';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

function App() {

    const commentsRef = useRef(null);
    const commentCountRef = useRef(null);
    const newsletterRef = useRef(null);
    const membershipsRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            console.log(
                membershipsRef.current,
                membershipsRef.current?.element(),
            );
        },)

    }, [])

    return <div>
        <Comments
            website-id={14}
            ref={commentsRef}
            on={{
                "comment:published": (comment) => {
                    comment.id;
                },
                "auth:login:clicked": (d) => console.log(d)
            }}
        />
        <CommentCount
            page-id="test"
            ref={commentCountRef}
        />
        <NewsletterForm website-id={14} ref={newsletterRef} />

        <GatedContent _key="key" />
        <Memberships website-id={8818} ref={membershipsRef} />

    </div>

}