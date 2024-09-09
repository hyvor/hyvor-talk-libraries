### [1.0.1] - 2024-09-09

-   Updated to @hyvor/hyvor-talk-base 1.0.1 for CommentCount types

### [1.0.0] - 2024-07-03

-   Added Newsletter & Memberships support
-   Updaded to @hyvor/hyvor-talk-base 1.0.0 new API
-   Minor breaking changes
    -   `translations` attribute in `Comments` component has new types
    -   `<CommentCount>` no longer automatically loads the counts. Needs to call `CommentCounts.load()` manually from `@hyvor/hyvor-talk-base`

### [0.0.7] - 2024-03-10

-   Updated base version to support newer types

## 0.0.6 - 2024-01-09

-   Upgraded to base new version to fix vite CJS issue
    Related: https://vitejs.dev/guide/migration#deprecate-cjs-node-api
