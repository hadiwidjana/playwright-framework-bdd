import { expect, Locator, Page, test } from '@playwright/test';
import { basetest } from '../../main/basetest';
import { World } from '@cucumber/cucumber';
export class homepage {
  base: basetest;
  readonly world: World;
  readonly btnHeaderLogin: Locator;
  readonly emailPhoneInput: Locator;
  readonly emailPhoneSubmit: Locator;
  readonly password: Locator;
  readonly submitLogin: Locator;
  readonly sendEmailCard: Locator;
  readonly otpInput: Locator;

  constructor(world: World,page: Page) {
    this.world = world;
    this.base = new basetest(world,page)
    this.btnHeaderLogin = page.getByTestId('btnHeaderLogin');
    this.emailPhoneInput = page.getByTestId('email-phone-input');
    this.emailPhoneSubmit = page.getByTestId('email-phone-submit');
    this.password = page.locator('//input[@type="password"]');
    this.submitLogin = page.getByLabel('login-button');
    this.sendEmailCard = page.locator("//div[@data-unify='Card']")
    this.otpInput = page.locator("//input[@autocomplete='one-time-code']");
  }

  async goToTokped() {
      await this.base.page.goto('https://tokopedia.com');
      await this.base.page.waitForLoadState();
  }

  async clickLogin() {
      await this.base.click(this.btnHeaderLogin);
      await this.base.expectVisible(this.emailPhoneInput);
  }

  async inputEmail(email: string) {
      await this.base.fill(this.emailPhoneInput, email);
      await this.base.click(this.emailPhoneSubmit);
      // await this.base.expectVisible(this.password);
  }

  async inputPassword(password: string) {
      await this.base.fill(this.password, password);
      await this.base.click(this.submitLogin);
      await this.base.expectVisible(this.sendEmailCard);
  }

  async sendEmailVerification() {
      await this.base.click(this.sendEmailCard);
  }

  async enterVerificationCode(code: string) {
      await this.base.fill(this.otpInput, code);
  }

  async loginSuccessful(userFirstName: string){
    await this.base.page.waitForLoadState();
    await this.base.expectTextEqual(this.base.page.locator('//div[@data-testid="btnHeaderMyProfile"]/div/div'), userFirstName);
  }

  async inputCredentialAndVerify(email: string, password: string) {
    await this.goToTokped();
    await this.clickLogin();
    await this.inputEmail(email);
    await this.inputPassword(password);
    await this.sendEmailVerification();
  }

  async emailNotFound(){
    await this.base.sleep(2000);
    await this.base.expectVisible(await this.base.page.locator("//h5[text()='Email belum terdaftar']"));
  }
}