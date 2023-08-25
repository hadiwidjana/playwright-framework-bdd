import { Browser, BrowserContext, Locator, Page, chromium, expect } from "@playwright/test";


export class pageManager {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    page2!: Page;

    constructor(){
        
    }

    async initBrowser() {
        this.browser = await chromium.launch({
            headless: false,
            args: [
                "--start-maximized",
                "--disable-blink-features=AutomationControlled"
            ]
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async openNewTab() {
        this.page2 = await this.context.newPage()
    }

    async closeTab(tabNumber: number) {
        switch (tabNumber) {
            case 1:
                await this.page.close();
                break;
            case 2:
                await this.page2.close();
                break;
        }
    }
}