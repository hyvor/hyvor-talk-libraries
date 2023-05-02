import { Comments, CommentCount } from '../../react';

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

export default App
