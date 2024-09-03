This library provides types and helper functions for creating [Hyvor Talk](https://talk.hyvor.com) Web Components.

-   [Comments](#comments)
-   [Comment Counts](#comment-counts)
-   [Newsletters](#newsletters)
-   [Memberships](#memberships)

## Installation

```bash
npm install @hyvor/hyvor-talk-base
```

## Comments

Add comments embed ([&lt;hyvor-talk-comments&gt;](https://talk.hyvor.com/docs/comments)):

```ts
import { Comments } from "@hyvor/hyvor-talk-base";

Comments.comments(
    // The same attributes as the base web component
    // See https://talk.hyvor.com/docs/comments#attributes
    {
        "website-id": 1,
        "page-id": "unique-page-id",
    },
    // The container element
    document.getElementById("comments-container"),
    // Callback for events
    // See https://talk.hyvor.com/docs/comments#events
    (event, data) => {
        console.log(event, data);
    }
);
```

## Comment Counts

Add comment count elements ([&lt;hyvor-talk-comment-count&gt;](https://talk.hyvor.com/docs/comment-counts)):

```ts
import { CommentCounts } from "@hyvor/hyvor-talk-base";

// first, add the elements
CommentCounts.commentCount(
    {
        "page-id": "unique-page-id",
    },
    wrap1
);

CommentCounts.commentCount(
    {
        "page-id": "unique-page-id",
    },
    wrap2
);

// then, load the counts
CommentCounts.load({
    "website-id": 1,
});
```

## Newsletters

Add newsletter form ([&lt;hyvor-talk-newsletter&gt;](https://talk.hyvor.com/docs/newsletter)):

```ts
import { Newsletters } from "@hyvor/hyvor-talk-base";

Newsletters.form(
    // The same attributes as the <hyvor-talk-newsletter> component
    // See https://talk.hyvor.com/docs/newsletters#form-properties
    {
        "website-id": 1,
        title: "Subscribe to our newsletter",
    },
    wrap // The container element
);
```

## Memberships

Add the memberships embed ([&lt;hyvor-talk-memberships&gt;](https://talk.hyvor.com/docs/memberships)):

```ts
import { Memberships } from "@hyvor/hyvor-talk-base";

Memberships.memberships(
    // The same attributes as the <hyvor-talk-memberships> component
    // See https://talk.hyvor.com/docs/memberships#component-attributes
    {
        "website-id": 1,
        "sso-user": "{}",
        "sso-hash": "hash",
    }
);
```

Once you have added the memberships embed, you can add gated content ([&lt;hyvor-talk-gated-content&gt;](https://talk.hyvor.com/docs/memberships#gated-content)):

```ts
import { Memberships } from "@hyvor/hyvor-talk-base";

Memberships.gatedContent(
    // The same attributes as the <hyvor-talk-gated-content> component
    // See https://talk.hyvor.com/docs/gated-content#component-attributes
    {
        key: "content-key",
    },
    wrap // The container element
);
```

---

## Legacy Functions

The following functions are only available for legacy purposes. We recommend using the functions above for new projects.

### `addComments(props, container, onEvent)`

Adds `<hyvor-talk-comments>` ([docs](https://talk.hyvor.com/docs/install)) to the given container.

```ts
import { addComments } from "@hyvor/hyvor-talk-base";

addComments(
    {
        "website-id": 1,
        "page-id": "unique-page-id",
    },
    document.getElementById("comments-container"),
    (event, data) => {
        console.log(event, data);
    }
);
```

### `addCommentCounts(props)`

Adds the script that registers the `<hyvor-talk-comment-count>` custom element to the page. Note that unlike `addComments`, this function does not add the element to the page. You need to add `<hyvor-talk-comment-count>` elements to the page manually, and then call this function to load the comment counts.

```ts
import { addCommentCounts } from "@hyvor/hyvor-talk-base";

addCommentCounts({
    "website-id": 1,
    "page-id": "unique-page-id",
});
```

Example usage with React:

```tsx
export function CommentCount(props: CommentCountProps) {
    useEffect(() => addCommentCounts(props), []);
    return <hyvor-talk-comment-count {...props} />;
}
```

> `addCommentCounts` function automatically calls `loadCommentCounts` if `loading="manual"` is not set.

### `loadCommentCounts(props)`

Loads comment counts from Hyvor Talk servers and updates the `<hyvor-talk-comment-count>` elements. See [the docs](https://talk.hyvor.com/docs/comment-counts) for more information on optimized usage.

```ts
import { loadCommentCounts } from "@hyvor/hyvor-talk-base";

loadCommentCounts({
    "website-id": 1,
});
```
