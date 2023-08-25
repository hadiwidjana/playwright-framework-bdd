import { Page, test, Browser, BrowserContext, chromium } from '@playwright/test';
import { homepage } from '../page/homepage';
import { gmail } from '../page/gmail';
import { Given, When, Then, setWorldConstructor, After, setDefaultTimeout } from '@cucumber/cucumber'
import { CucumberAllureWorld } from "allure-cucumberjs";
import { pageManager } from '../../main/pageManager';


setDefaultTimeout(60 * 1000);
if (process.env.PARALLEL) {
  setWorldConstructor(CucumberAllureWorld);
}

type CustomWorld = {
  someCustomOptions: string;
} & CucumberAllureWorld;

let home: homepage
let email: gmail;
let pm: pageManager;

Given('User navigates to homepage', async function (this: CustomWorld) {
  pm = new pageManager();
  await pm.initBrowser();
  home = new homepage(this, pm.page);
  await home.goToTokped();
});


Given('User click login link', async function () {
  await home.clickLogin();
});


When('User enter the username as {string}', async function (emailAdress) {
  await home.inputEmail(emailAdress);
});


When('User enter the password as {string}', async function (password) {
  await home.inputPassword(password)
});

When('User select email verification option', async function () {
  await home.sendEmailVerification();
})

When('User open new tab', async function () {
  await pm.openNewTab();
});

When('User login to gmail using {string} and {string}', async function (emailAdress, password) {
  email = new gmail(this, pm.page2);
  await email.goToGmail();
  await email.inputEmail(emailAdress);
  await email.inputPassword(password);
});

When('User open email to get the OTP', async function () {
  await email.getVerificationCode();
  await email.deleteAllMail();
});


When('User enter OTP code', async function () {
  await home.enterVerificationCode(email.verificationCode);
});


Then('login should be success', async function () {
  await home.loginSuccessful('Albertus')
});

Then('login should fail', async function () {
  await home.emailNotFound();
});

After(async () => {
  await pm.browser.close();
});