import { Locator, Page, test } from '@playwright/test';
import { basetest } from '../../main/basetest';
import { World } from '@cucumber/cucumber';

export class gmail {
  base: basetest;
  verificationCode!: string;
  code!: string | null;
  readonly world: World;
  readonly btnHeaderLogin: Locator;
  readonly emailPhoneInput: Locator;
  readonly emailNext: Locator;
  readonly password: Locator;
  readonly passwordNext: Locator;
  readonly firstEmail: Locator;
  readonly verificationCodeLoc: Locator;
  readonly selectAllEmail: Locator;
  readonly deleteEmail: Locator;
  readonly inbox: Locator;
  // emptyMessage: Locator;

  constructor(world: World, page:Page) {
    this.world = world;
    this.base = new basetest(world, page)
    this.btnHeaderLogin = page.locator("//header//a[@data-action='sign in']");
    this.emailPhoneInput = page.locator("//input[@id='identifierId']");
    this.emailNext = page.locator("//div[@id='identifierNext']//button");
    this.password = page.locator("//div[@id='password']//input[@type='password']");
    this.passwordNext = page.locator("//div[@id='passwordNext']//button");
    this.firstEmail = page.locator("//span[contains(text(),'Halo Toppers')]");
    this.verificationCodeLoc = page.locator("//table[2]//div/div");
    // this.verificaitonCodeLoc = page.locator("//tr/td/span/following-sibling::div/div")
    this.selectAllEmail = page.locator("//div[@data-tooltip='Select']//span");
    this.deleteEmail = page.locator("//div[@data-tooltip='Delete']")
    this.inbox = page.locator("//div[@data-tooltip='Inbox']")
  }

  async goToGmail() {
    await this.base.page.goto("https://gmail.com")
  }


  async clickLogin() {
    await this.base.click(this.btnHeaderLogin);
    await this.base.expectVisible(this.emailPhoneInput);
  }

  async inputEmail(email: string) {
    await this.base.fill(this.emailPhoneInput,email);
    await this.base.click(this.emailNext);
    await this.base.expectVisible(this.password);
  }

  async inputPassword(password: string) {
    await this.base.fill(this.password,password);
    await this.base.click(this.passwordNext);
    await this.base.page.waitForTimeout(2000);
    // await this.base.expectVisible(this.inbox);
  }

  async getVerificationCode() {
    await this.base.click(this.firstEmail);
      this.code = await this.verificationCodeLoc.textContent();
    if(this.code != null){
      this.verificationCode = this.code;
    } else {
      throw 'Verification Code not found!';
    }
    await this.base.click(this.inbox);
    await this.base.sleep(5000);
    await this.base.click(this.inbox);
    await this.base.expectVisible(this.firstEmail);
  }

  async deleteAllMail() {
    await this.base.check(this.selectAllEmail);
    // await expect(await this.selectAllEmail.isChecked());
    await this.base.click(this.deleteEmail);
    await this.base.sleep(5000);
    await this.base.expectVisible(await this.base.page.locator("//div[text()='Your Primary tab is empty.']"));
  }

  
  async readVerificationAndDelete(email:string,password:string) {
      await this.goToGmail();
      await this.inputEmail(email);
      await this.inputPassword(password);
      await this.getVerificationCode();
      await this.deleteAllMail();
  }
}