### Installation

```bash
npm install @hyvor/hyvor-talk-react
```

### Usage

The library contains two components:

-   `<Comments>` - The comments embed (wrapper around [`<hyvor-talk-comments>`](https://talk.hyvor.com/docs/install))
-   `<CommentCount>` - Comment counts widget (wrapper around [`<hyvor-talk-comment-count>`](https://talk.hyvor.com/docs/comment-counts))

### Comments

Use the `<Comments>` component to add comments to your webpage. The props are the same as the attributes of [hyvor-talk-comments](https://talk.hyvor.com/docs/comments#attributes).

```jsx
import React from "react";
import { Comments } from "@hyvor/hyvor-talk-react";

const App = () => {
    return <Comments website-id={YOUR_WEBSITE_ID} page-id={UNIQUE_PAGE_ID} />;
};
```

### Comment Counts

All props in the `<CommentCount>` component are the same as the base [hyvor-talk-comment-count](https://talk.hyvor.com/docs/comment-counts) Web Component.

If you only have one `<CommentCount>` on the page, use the component directly:

```jsx
import React from "react";
import { CommentCount } from "@hyvor/hyvor-talk-react";

const App = () => {
    return <CommentCount page-id={PAGE_ID} website-id={YOUR_WEBSITE_ID} />;
};
```

If you have multiple `<CommentCount>` in the page, use `loading="manual"` prop on each component and call `loadCommentCounts()` function when the components are mounted. This will reduce the number of API calls needed.

```jsx
import React from "react";
import { CommentCount, loadCommentCounts } from "@hyvor/hyvor-talk-react";

const App = () => {
    useEffect(() => {
        loadCommentCounts({
            "website-id": YOUR_WEBSITE_ID,
        });
    }, []);

    return (
        <div>
            <CommentCount page-id={PAGE_ID_1} loading="manual" />
            <CommentCount page-id={PAGE_ID_2} loading="manual" />
        </div>
    );
};
```

`loadCommentCounts` function has the following signature:

```ts
loadCommentCounts(
    options: {
        "website-id"?: number,
        mode?: 'text' | 'number',
        language?: string,
    } = {},
    callback: ((count: number | string, el: Element) => string | number) | null = null
): void
```

See the [comment counts](https://talk.hyvor.com/docs/comment-counts) documentation for more details.

### Listening to Events

You can listen to [events](https://talk.hyvor.com/docs/comments#events) emitted by the components using the `on` prop. This is supported by all components that have events.

```jsx
import React from "react";

const App = () => {
    return (
        <Comments
            website-id={YOUR_WEBSITE_ID}
            on={{
                loaded: () => console.log("Comments loaded"),
                "comment:published": (comment) =>
                    console.log("Comment published", comment),
            }}
        />
    );
};
```

### Accessing the Web Component Instance

You can access the underlying Web Component instance using the `ref` prop, which returns an object with two methods: `wrap` and `element`. This is supported by all components.

```jsx
import React, { useRef, useEffect } from "react";
import { type CommentsCustomElement } from "@hyvor/hyvor-talk-base";

const App = () => {
    const commentsRef = useRef < {
        wrap: () => HTMLDivElement;
        element: () => CommentsCustomElement;
    } > (null);

    useEffect(() => {
        if (commentsRef.current) {

            // This is the underlying <hyvor-talk-comments> element
            const element = commentsRef.current.element();

            // Call API methods
            console.log(element.api.page());

        }
    }, []);

    return (
        <Comments
            ref={commentsRef}
            website-id={YOUR_WEBSITE_ID}
        />
    );
};
```
