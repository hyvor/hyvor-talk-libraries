### Installation

```bash
npm install @hyvor/hyvor-talk-vue
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

```vue
<script setup>
import { Comments } from "@hyvor/hyvor-talk-vue";
</script>

<template>
    <Comments :website-id="YOUR_WEBSITE_ID" page-id="UNIQUE_PAGE_ID" />
</template>
```

### Comment Counts

Use the `<CommentCount>` component to display the number of comments on a page.
All props are the same as the base [hyvor-talk-comment-count](https://talk.hyvor.com/docs/comment-counts) Web Component.

First, add the `<CommentCount>` components to your app. Then, call `CommentCounts.load()` in `onMounted` to load the comment counts.

```vue
<script setup>
import { onMounted } from "vue";
import { CommentCount } from "@hyvor/hyvor-talk-vue";
import { CommentCounts } from "@hyvor/hyvor-talk-base";

onMounted(() => {
    CommentCounts.load({
        "website-id": YOUR_WEBSITE_ID,
    });
});
</script>

<template>
    <!-- You may use multiple components -->
    <CommentCount page-id="PAGE_ID_1" />
    <CommentCount page-id="PAGE_ID_2" />
</template>
```

### Newsletter Form

Use the `<NewsletterForm>` component to add a newsletter form to your webpage. The props are the same as the attributes of [hyvor-talk-newsletter](https://talk.hyvor.com/docs/newsletters#form-properties).

```vue
<script setup>
import { NewsletterForm } from "@hyvor/hyvor-talk-vue";
</script>

<template>
    <NewsletterForm website-id="{YOUR_WEBSITE_ID}" />
</template>
```

### Memberships & Gated Content

Use the `<Memberships>` component to add memberships to your webpage. The props are the same as the attributes of [hyvor-talk-memberships](https://talk.hyvor.com/docs/memberships#component-attributes).

```vue
<script setup>
import { Memberships } from "@hyvor/hyvor-talk-vue";
</script>

<template>
    <Memberships :website-id="YOUR_WEBSITE_ID" />
</template>
```

Once you have memberships set up, you can use the `<GatedContent>` component to show content only to members. The props are the same as the attributes of [hyvor-talk-gated-content](https://talk.hyvor.com/docs/gated-content#component-attributes). The `key` prop is renamed to `_key` to avoid conflicts with the reserved `key` prop in Vue.

```vue
<script setup>
import { GatedContent } from "@hyvor/hyvor-talk-vue";
</script>

<template>
    <GatedContent _key="my-content" />
</template>
```

---

### Listening to Events

You can listen to [events](https://talk.hyvor.com/docs/comments#events) emitted by the components using `v-on` or `@`. This is supported by all components that have events.

```vue
<Comments
    :website-id="YOUR_WEBSITE_ID"
    page-id="UNIQUE_PAGE_ID"
    @loaded="() => console.log('Comments loaded')"
    @comment:published="(comment) => console.log('Comment published', comment)"
/>
```

### Accessing the Web Component Instance

You can access the underlying Web Component instance using the `ref` prop, which refers to an object with two methods: `wrap` and `element`. This is supported by all components.

```vue
<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { Comments } from "@hyvor/hyvor-talk-vue";
import { type CommentsCustomElement } from "@hyvor/hyvor-talk-base";
import { CommentCounts } from "@hyvor/hyvor-talk-base";

const commentsRef = useTemplateRef<{
    wrap: () => HTMLDivElement;
    element: () => CommentsCustomElement;
}>("comments");

onMounted(() => {
    if (commentsRef.value) {
        // This is the wrapping <div> element
        const wrap = commentsRef.value.wrap();

        // This is the underlying <hyvor-talk-comments> element
        const element = commentsRef.value.element();

        element.addEventListener("loaded", () => {
            console.log(element.api.page());
        });
    }
});
</script>
<template>
    <Comments :website-id="YOUR_WEBSITE_ID" ref="comments" />
</template>
```
