import { createRoot } from 'react-dom/client';
import React, { useEffect, useRef } from 'react';
import { Comments }  from './src';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

function App() {

    const commentsRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            console.log(commentsRef.current);
        },)
    }, [])

    return <div>
        <Comments
            website-id={14}
            ref={commentsRef}
        />
    </div>

}