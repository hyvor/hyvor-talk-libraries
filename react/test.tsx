import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef } from 'react';
import { Comments, CommentCount }  from './src';
import { CommentCounts } from '@hyvor/hyvor-talk-base';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

function App() {

    const commentsRef = useRef(null);
    const commentCountRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            console.log(
                commentCountRef.current,
                commentCountRef.current!.element()
            );
        },)

    }, [])

    return <div>
        <Comments
            website-id={14}
            ref={commentsRef}
        />
        <CommentCount
            page-id="test"
            ref={commentCountRef}
        />
    </div>

}