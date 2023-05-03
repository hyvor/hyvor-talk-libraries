import { TESTING_WEBSITE_ID } from '.';
import { Comments, CommentCount, loadCommentCounts } from '../../react/src/index';
import React, { useEffect, useState } from 'react';

function App() {

    const [nav, setNav] = useState<null | string>(null);

    function NavItem({name} : {name: string}) {
        return <div className="nav-item" onClick={() => setNav(name)}>{name}</div>
    }

    return <div className="wrap">

        <div className="nav" data-testid="nav">
            <NavItem name="Comments - Basic" />
            <NavItem name="Comments - Dark" />
            <NavItem name="Comments - Loading" />
            <NavItem name="Comments - Settings" />
            <NavItem name="Comments - Translations" />
            <NavItem name="Comments - Multi" />

            <NavItem name="CommentCount - Basic" />
            <NavItem name="CommentCount - Number" />
            <NavItem name="CommentCount - Language" />
            <NavItem name="CommentCount - Manual" />
            <NavItem name="CommentCount - Multi" />

        </div>

        <div className="display" data-testid="display">

            {nav === 'Comments - Basic' && <BasicComments />}
            {nav === 'Comments - Dark' && <DarkComments />}
            {nav === 'Comments - Loading' && <ManualComments /> }
            {nav === 'Comments - Settings' && <CommentsWithRatings />}
            {nav === 'Comments - Translations' && <CommentsWithTranslations /> }
            {nav === 'Comments - Multi' && <MultiComments /> }

            {nav === 'CommentCount - Basic' && <BasicCommentCount />}
            {nav === 'CommentCount - Number' && <NumberCommentCount />}
            {nav === 'CommentCount - Language' && <FrenchCommentCount />}
            {nav === 'CommentCount - Manual' && <ManualCommentCount />}
            {nav === 'CommentCount - Multi' && <MultiCommentCount />}

        </div>

    </div>
}

function BasicComments() {
    return <Comments website-id={TESTING_WEBSITE_ID} />
}

function DarkComments() {
    return <Comments website-id={TESTING_WEBSITE_ID} colors="dark" />
}

function ManualComments() {
    return <Comments website-id={TESTING_WEBSITE_ID} loading="manual" />
}

function CommentsWithRatings() {
    return <Comments website-id={TESTING_WEBSITE_ID} settings={{
        top_widget: 'ratings'
    }} />
}

function CommentsWithTranslations() {
    return <Comments website-id={TESTING_WEBSITE_ID} translations={{
        no_comments_text: "No comments yet."
    }} />
}

function MultiComments() {
    return <div>
        <Comments website-id={TESTING_WEBSITE_ID} page-id="1" />
        <Comments website-id={TESTING_WEBSITE_ID} page-id="2" />
    </div>
}

function BasicCommentCount() {
    return <CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} />
}

function NumberCommentCount() {
    return <CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} mode="number" />
}

function FrenchCommentCount() {
    return <CommentCount page-id={location.href} website-id={TESTING_WEBSITE_ID} language="fr" />
}

function ManualCommentCount() {

    useEffect(() => {

        /**
         * Here we set a window loader, which can be called from
         * e2e tests to load the comment counts.
         * It uses the callback to update the comment count text as well
         */
        (window as any).loader = () => {

            loadCommentCounts({
                "website-id": TESTING_WEBSITE_ID,
                mode: 'number'
            }, (count) => {
                return count + ' comments here';
            })
        }
         
    });

    return <CommentCount 
        page-id={location.href} 
        website-id={TESTING_WEBSITE_ID} 
        loading="manual" 
    />;
}

function MultiCommentCount() {
    return <div>
        <CommentCount page-id="1" website-id={TESTING_WEBSITE_ID} />
        <CommentCount page-id="2" website-id={TESTING_WEBSITE_ID} />
    </div>
}


export default App
