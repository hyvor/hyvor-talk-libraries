import ReactDOM from 'react-dom/client'

export default function renderReact(root: HTMLElement) {
    ReactDOM.createRoot(root).render(
        <App />
    );
}

function App() {
    return <div>This is react</div>
}

/* import { Comments, CommentCount } from '../../react/src/index';

function App() {
    return <div>
        <Comments 
            website-id={14} 
            colors="dark"
            settings={{
                dark_palette: {
                    accent: "#ff0000",
                }
            }}
            translations={{
                no_comments_text: "NOTHING",
                comment_box_text: "COMMENT"
            }}
            page-language='fr'
        />

        <CommentCount website-id={14} page-id={location.href} />
        
    </div>
}

export default App */
