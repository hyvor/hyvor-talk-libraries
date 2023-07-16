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

### `addCommentCount(props)`

Adds `<hyvor-talk-comment-count>` ([docs](https://talk.hyvor.com/docs/comment-counts)) to the given container.

```ts
import { addCommentCount } from '@hyvor/hyvor-talk-base';

addCommentCount(
    {
        'website-id': 1,
        'page-id': 'unique-page-id',
    }
);
```

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