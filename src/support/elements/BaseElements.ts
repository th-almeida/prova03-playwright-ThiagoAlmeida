import { Page } from '@playwright/test';

export default class BaseElements {
  constructor(readonly page: Page) {
    this.page = page;
  }
}
