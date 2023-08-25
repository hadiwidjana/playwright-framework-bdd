import { Browser, BrowserContext, Locator, Page, chromium, expect, test } from "@playwright/test";
import { testFixture } from "./testFixture";


export class pageManager {


    async initBrowser() {
        testFixture.browser = await chromium.launch({
            headless: false,
            args: [
                "--start-maximized",
                "--disable-blink-features=AutomationControlled"
            ]
        });
    }

    async initPage() {
        testFixture.context = await testFixture.browser.newContext({
            viewport: null,
            recordVideo: {
                dir: './test-results/videos/'
              }});
        testFixture.page = await testFixture.context.newPage();
    }

    async openNewTab() {
        testFixture.page2 = await testFixture.context.newPage()
    }

    async closePage(pageNumber: number) {
        switch (pageNumber) {
            case 1:
                await testFixture.page.close();
                break;
            case 2:
                await testFixture.page2.close();
                break;
        }
        await testFixture.context.close();
    }

    async closeBrowser(browserNumber: number) {
        switch (browserNumber) {
            case 1:
                await testFixture.browser.close();
                break;
        }
    }
}