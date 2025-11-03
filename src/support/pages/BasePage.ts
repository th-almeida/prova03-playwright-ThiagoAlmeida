import { Page } from '@playwright/test';

export default class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }
}
