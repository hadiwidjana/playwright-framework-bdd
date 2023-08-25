import { Browser, BrowserContext, Page } from "@playwright/test";

export const testFixture = {
    browser: undefined as unknown as Browser,
    page: undefined as unknown as Page,
    page2: undefined as unknown as Page,
    context: undefined as unknown as BrowserContext,
    context2: undefined as unknown as BrowserContext
}