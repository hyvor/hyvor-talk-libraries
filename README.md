# hyvor-talk-libraries

### Installation

Install the library using npm depending on your framework.

**React**

```bash
npm install @hyvor/hyvor-talk-react
```

**Vue** (Coming Soon)

```bash
npm install @hyvor/hyvor-talk-vue
```

**Svelte** (Coming Soon)

```bash
npm install @hyvor/hyvor-talk-svelte
```

### Usage

All libraries include two components:

- Comments - The comments embed (wrapper around [hyvor-talk-comments](https://talk.hyvor.com/docsv3/install))
- CommentCount - Comment counts widget (wrapper around [hyvor-talk-comment-count](https://talk.hyvor.com/docsv3/install))

### Comments

All props in the `<Comments>` component are the same as the base [hyvor-talk-comments](https://talk.hyvor.com/docsv3/comment-counts) Web Component.


```jsx
import React from 'react';
import { Comments } from '@hyvor/hyvor-talk-react';

const App = () => {
    return (
        <Comments
            website-id={YOUR_WEBSITE_ID}
            page-id={UNIQUE_PAGE_ID}
        />
    );
};
```

<!-- Vue/svelte libraries have the same API. -->

### Comment Counts

All props in the `<CommentCount>` component are the same as the base [hyvor-talk-comment-count](https://talk.hyvor.com/docsv3/comment-counts) Web Component.

If you only have one `<CommentCount>` in the page, use the component directly:

```jsx
import React from 'react';
import { CommentCount } from '@hyvor/hyvor-talk-react';

const App = () => {
    return (
        <CommentCount
            page-id={PAGE_ID}
            website-id={YOUR_WEBSITE_ID}
        />
    );
};
```

If you have multiple `<CommentCount>` in the page, use `loading="manual"` prop on each component and call `loadCommentCounts()` function after all components are mounted. This will reduce the number of API calls needed.

```jsx
import React from 'react';
import { CommentCount, loadCommentCounts } from '@hyvor/hyvor-talk-react';

const App = () => {

    useEffect(() => {
        loadCommentCounts({
            'website-id': YOUR_WEBSITE_ID,
        });
    }, []);

    return (
        <div>
            <CommentCount
                website-id={YOUR_WEBSITE_ID}
                page-id={PAGE_ID_1}
                loading="manual"
            />
            <CommentCount
                website-id={YOUR_WEBSITE_ID}
                page-id={PAGE_ID_2}
                loading="manual"
            />
        </div>
    );
};
```

To call the `loadCommentCounts()` function after all components are mounted, you can use parent element's lifecycle hooks.

* React: [useEffect](https://reactjs.org/docs/hooks-effect.html)
* Vue: [mounted](https://vuejs.org/api/options-lifecycle.html#mounted)  
* Svelte: [onMount](https://svelte.dev/docs#run-time-svelte-onmount)

`loadCommentCounts` function accepts the following `website-id`, `mode`, and `language` in the first argument. The second argument is a callback function that will be called after the API call is completed. See the [comment counts](https://talk.hyvor.com/docsv3/comment-counts) documentation for more details. All libraries share the same base API.