### Installation

```bash
npm install @hyvor/hyvor-talk-svelte
```

### Usage

The following components are available:

-   **`<Comments>`** - wraps [`<hyvor-talk-comments>`](https://talk.hyvor.com/docs/comments)
-   **`<CommentCount>`** - wraps [`<hyvor-talk-comment-count>`](https://talk.hyvor.com/docs/comment-counts)
-   **`<NewsletterForm>`** - wraps [`<hyvor-talk-newsletter>`](https://talk.hyvor.com/docs/newsletters)

### Comments

Use the `<Comments>` component to add comments to your webpage. The props are the same as the attributes of [hyvor-talk-comments](https://talk.hyvor.com/docs/comments#attributes).

```svelte
<script>
    import { Comments } from '@hyvor/hyvor-talk-svelte';
</script>

<Comments
    website-id={YOUR_WEBSITE_ID}
    page-id={UNIQUE_PAGE_ID}
/>
```

#### Listening to Events

Use the `on:` directive to listen to [events](https://talk.hyvor.com/docs/comments#events) emitted by the component.

```svelte
<Comments
    website-id={YOUR_WEBSITE_ID}
    page-id={UNIQUE_PAGE_ID}

    on:loaded={() => console.log('Comments loaded')}
    on:comment:published={() => console.log('Comment published')}
/>
```

#### Accessing the Web Component Instance

Bind the `element` prop to a variable to access the underlying Web Component instance. This is useful to call [API methods](https://talk.hyvor.com/docs/comments#api).

```svelte
<script>
    import { Comments } from '@hyvor/hyvor-talk-svelte';
    import { onMount } from 'svelte';

    let element;

    function onLoad() {
        console.log(element.api.page());
    }
</script>

<Comments
    website-id={YOUR_WEBSITE_ID}
    page-id={UNIQUE_PAGE_ID}
    bind:element
    on:loaded={onLoad}
/>
```

### Comment Counts

All props in the `<CommentCount>` component are the same as the base [hyvor-talk-comment-count](https://talk.hyvor.com/docs/comment-counts) Web Component.

If you only have one `<CommentCount>` on the page, use the component directly:

```svelte
<script>
    import { CommentCount } from '@hyvor/hyvor-talk-svelte';
</script>

<CommentCount
    page-id={PAGE_ID}
    website-id={YOUR_WEBSITE_ID}
/>
```

If you have multiple `<CommentCount>` in the page, use `loading="manual"` prop on each component and call `loadCommentCounts()` function when the components are mounted. This will reduce the number of API calls needed.

```svelte
<script>
    import { CommentCount, loadCommentCounts } from '@hyvor/hyvor-talk-svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        loadCommentCounts({
            'website-id': YOUR_WEBSITE_ID,
        });
    });
</script>

<div>
    <CommentCount
        page-id={PAGE_ID_1}
        loading="manual"
    />
    <CommentCount
        page-id={PAGE_ID_2}
        loading="manual"
    />
</div>
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
