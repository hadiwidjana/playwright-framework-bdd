import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { pageManager } from "./pageManager";

let pm: pageManager;
Before(async function name() {
    pm = new pageManager();
    await pm.initBrowser();
    await pm.initPage();})

BeforeAll(async function name() {

})

After(async function name() {
    await pm.closePage(1);
    await pm.closeBrowser(1);
})

AfterAll(async function name() {
})