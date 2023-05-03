import { test, expect, Page } from '@playwright/test';

class Demo {

    constructor(private page: Page) {}
 
    async nav(library: string, page: string) {
        await this.page.locator(`#${library}-root`).evaluate(el => el.style.display = 'block');
        await this.page.getByTestId('nav').getByText(page).click();
    }

}

const baseTest = test.extend<{demo: Demo}>({
    demo: async ({page}, use) => {
        const demo = new Demo(page);
        await page.goto('/');
        await use(demo);
    }
})

const libraries = [
    'react',
    // 'svelte'
]

for (const library of libraries) {

    baseTest(`${library} - comments basic`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Basic');
        await expect(page.getByText('What\'s your reaction?')).toBeVisible();
        await expect(page.getByText('0 Comments')).toBeVisible();
    });


    baseTest(`${library} - comments dark`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Dark');
        await expect(page.locator('.rich-editor')).toHaveCSS('background-color', 'rgb(35, 33, 33)');
    });

    baseTest(`${library} - comments loading`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Loading');

        const el = await page.locator('hyvor-talk-comments');
        await expect(el).toHaveCount(1);

        await expect(page.getByText('0 Comments')).toHaveCount(0);

        el.evaluate(e => (e as any).load());

        await expect(page.getByText('0 Comments')).toBeVisible();
    });

    baseTest(`${library} - comments settings`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Settings');

        await expect(page.getByText('0 Comments')).toBeVisible();
        await expect(page.getByText('Leave a rating')).toBeVisible();
    });

    baseTest(`${library} - comments translations`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Translations');

        await expect(page.getByText('0 Comments')).toBeVisible();
        await expect(page.getByText('No comments yet.')).toBeVisible();
    });

    baseTest(`${library} - comments multi`, async ({ demo, page }) => {
        await demo.nav(library, 'Comments - Multi');

        await expect(page.locator('hyvor-talk-comments')).toHaveCount(2);
        await expect(page.locator('script[src="https://talk.hyvor.com/embed/embed.js"]')).toHaveCount(1);
    });


    baseTest(`${library} - comment counts`, async ({ demo, page }) => {
        await demo.nav(library, 'CommentCount - Basic');
        await expect(page.getByText('0 Comments')).toBeVisible();
    });

    baseTest(`${library} - comment counts number`, async ({ demo, page }) => {
        await demo.nav(library, 'CommentCount - Number');
        await expect(page.getByText('0', {exact: true})).toBeVisible();
    });

    baseTest(`${library} - comment counts language`, async ({ demo, page }) => {
        await demo.nav(library, 'CommentCount - Language');
        await expect(page.getByText('0 Commentaires')).toBeVisible();
    });

    baseTest(`${library} - comment counts manual`, async ({ demo, page }) => {
        await demo.nav(library, 'CommentCount - Manual');

        await expect(page.locator('hyvor-talk-comment-count')).toHaveCount(1);
        await expect(page.getByText('0 Comments')).not.toBeVisible();

        await page.evaluate(() => (window as any).loader());
        await expect(page.getByText('0 comments here')).toBeVisible();
    });

    baseTest(`${library} - comment counts multi`, async ({ demo, page }) => {
        await demo.nav(library, 'CommentCount - Multi');

        await expect(page.locator('hyvor-talk-comment-count')).toHaveCount(2);
        await expect(page.getByText('0 Comments')).toHaveCount(2);

        await expect(page.locator('script[src="https://talk.hyvor.com/embed/comment-counts.js"]')).toHaveCount(1);
    });

}