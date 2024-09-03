### Installation

```bash
npm install @hyvor/hyvor-talk-react
```

### Usage

The following components are available:

-   **`<Comments>`** - wraps [`<hyvor-talk-comments>`](https://talk.hyvor.com/docs/comments)
-   **`<CommentCount>`** - wraps [`<hyvor-talk-comment-count>`](https://talk.hyvor.com/docs/comment-counts)
-   **`<NewsletterForm>`** - wraps [`<hyvor-talk-newsletter>`](https://talk.hyvor.com/docs/newsletters)
-   **`<Memberships>`** - wraps [`<hyvor-talk-memberships>`](https://talk.hyvor.com/docs/memberships)
-   **`<GatedContent>`** - wraps [`<hyvor-talk-gated-content>`](https://talk.hyvor.com/docs/gated-content)

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

Use the `<CommentCount>` component to display the number of comments on a page.
All props are the same as the base [hyvor-talk-comment-count](https://talk.hyvor.com/docs/comment-counts) Web Component.

First, add the `<CommentCount>` components to your app. Then, call `CommentCounts.load()` in `onMount` to load the comment counts.

```jsx
import React from "react";
import { CommentCount } from "@hyvor/hyvor-talk-react";
import { CommentCounts } from "@hyvor/hyvor-talk-base";

const App = () => {
    useEffect(() => {
        CommentCounts.load({
            "website-id": YOUR_WEBSITE_ID,
        });
    }, []);

    return (
        <div>
            <CommentCount page-id={PAGE_ID_1} />
            <CommentCount page-id={PAGE_ID_2} />
        </div>
    );
};
```

### Newsletter Form

Use the `<NewsletterForm>` component to add a newsletter form to your webpage. The props are the same as the attributes of [hyvor-talk-newsletter](https://talk.hyvor.com/docs/newsletters#form-properties).

```tsx
import React from "react";
import { NewsletterForm } from "@hyvor/hyvor-talk-react";

const App = () => {
    return <NewsletterForm website-id={YOUR_WEBSITE_ID} />;
};
```

### Memberships & Gated Content

Use the `<Memberships>` component to add memberships to your webpage. The props are the same as the attributes of [hyvor-talk-memberships](https://talk.hyvor.com/docs/memberships#component-attributes).

```tsx
import React from "react";
import { Memberships } from "@hyvor/hyvor-talk-react";

const App = () => {
    return <Memberships website-id={YOUR_WEBSITE_ID} />;
};
```

Once you have memberships set up, you can use the `<GatedContent>` component to show content only to members. The props are the same as the attributes of [hyvor-talk-gated-content](https://talk.hyvor.com/docs/gated-content#component-attributes). The `key` prop is renamed to `_key` to avoid conflicts with the reserved `key` prop in React.

```tsx
import React from "react";
import { GatedContent } from "@hyvor/hyvor-talk-react";

const App = () => {
    return <GatedContent _key="my-content" />;
};
```

---

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
    } | null > (null);

    useEffect(() => {
        if (commentsRef.current) {

            // This is the wrapping <div> element
            const wrap = commentsRef.current.wrap();

            // This is the underlying <hyvor-talk-comments> element
            const element = commentsRef.current.element();

            // Listen to events
            element.addEventListener('loaded', () => {
                // Call API methods
                console.log(element.api.page());
            });

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
