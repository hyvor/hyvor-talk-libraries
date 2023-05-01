# hyvor-talk-libraries

### Installation

Install the library using npm depending on your framework.

```bash
npm install @hyvor-talk/react # for react
npm install @hyvor-talk/vue # for vue 
npm install @hyvor-talk/svelte # for svelte
```

### Usage

All libraries include two components:

- Comments - The comments embed (wrapper around [hyvor-talk-comments](https://talk.hyvor.com/docsv3/install) Web Component)
- CommentCount - Comment counts widget (wrapper around [hyvor-talk-count](https://talk.hyvor.com/docsv3/install) Web Component)

### Comments

All props in the `<Comments>` component are the same as the base [hyvor-talk-comments](https://talk.hyvor.com/docsv3/install) Web Component.


```jsx
import React from 'react';
import { Comments } from '@hyvor-talk/react';

const App = () => {
    return (
        <Comments
            website-id={YOUR_WEBSITE_ID}
            page-id={UNIQUE_PAGE_ID}
        />
    );
};
```

Other libraries have the same API. For example, `import { Comments } from '@hyvor-talk/vue` for Vue.