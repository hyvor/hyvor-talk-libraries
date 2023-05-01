import { Comments } from '../../react/src/index';

function App() {
    return <Comments 
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
    />
}

export default App
