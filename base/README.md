This library provides types and helper functions for [Hyvor Talk](https://talk.hyvor.com).

## Helpers

### `addComments(props, container, onEvent)`

Adds `<hyvor-talk-comments>` ([docs](https://talk.hyvor.com/docs/install)) to the given container.

```ts
import { addComments } from '@hyvor/hyvor-talk-base';

addComments(
    {
        'website-id': 1,
        'page-id': 'unique-page-id',
    }, 
    document.getElementById('comments-container'), 
    (event, data) => {
        console.log(event, data);
    }
);
```

### `addCommentCounts(props)`

Adds the script that registers the `<hyvor-talk-comment-count>` custom element to the page. Note that unlike `addComments`, this function does not add the element to the page. You need to add `<hyvor-talk-comment-count>` elements to the page manually, and then call this function to load the comment counts.

```ts
import { addCommentCounts } from '@hyvor/hyvor-talk-base';

addCommentCounts(
    {
        'website-id': 1,
        'page-id': 'unique-page-id',
    }
);
```

Example from our React package:

```tsx
export function CommentCount(props: CommentCountProps) {
    useEffect(() => addCommentCounts(props), []);
    return <hyvor-talk-comment-count {...props} />
}
```

> `addCommentCounts` function automatically calls `loadCommentCounts` if `loading="manual"` is not set.

### `loadCommentCounts(props)`

Loads comment counts from Hyvor Talk servers and updates the `<hyvor-talk-comment-count>` elements. See [the docs](https://talk.hyvor.com/docs/comment-counts) for more information on optimized usage.


```ts
import { loadCommentCounts } from '@hyvor/hyvor-talk-base';

loadCommentCounts(
    {
        'website-id': 1,
    }
);
```