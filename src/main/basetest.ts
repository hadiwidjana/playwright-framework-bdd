import { World } from "@cucumber/cucumber";
import { Locator, Page, expect } from "@playwright/test";

export class basetest {

    readonly world: World;
    screenshot: number = 0;
    page: Page;

    constructor(world: World, page: Page) {
        this.world = world;
        this.page = page;
    }

    async click(locator: Locator) {
        await this.sleep(500)
        await this.highlightElement(locator);
        await this.screenshotElement(locator);
        await locator.click(); //click
    }

    async fill(locator: Locator, text: string) {
        await this.sleep(500)
        await this.highlightElement(locator);
        await locator.fill(text);
        await this.screenshotElement(locator);
    }

    async check(locator: Locator) {
        await this.sleep(500)
        await this.highlightElement(locator);
        await this.screenshotElement(locator);
        await locator.check();
    }

    async expectVisible(locator: Locator) {
        await this.sleep(500)
        await this.highlightElement(locator);
        await this.screenshotElement(locator);
        await expect(locator).toBeVisible();
    }

    async expectTextEqual(locator: Locator, expectation: string) {
        await this.sleep(500)
        expect(await locator.textContent()).toEqual(expectation);
        await this.screenshotElement(locator);
        await this.highlightElement(locator);
    }

    async screenshotElement(locator: Locator) {
        const screenshot = await locator.screenshot({ path: 'test-results/screenshot/screenshot-' + this.screenshot + '.png' });
        await this.world.attach(screenshot, 'image/png');
        this.screenshot++;
    }

    async highlightElement(locator: Locator) {
        await locator.evaluate((ele) => (ele.style.border = '3px solid red')) //Highlight element with red border
    }

    async sleep(miliseconds: number){
        await this.page.waitForTimeout(miliseconds);
    }

}