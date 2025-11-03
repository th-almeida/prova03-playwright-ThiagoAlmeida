import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class PhilosophyCoffeeContactElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getNameField(): Locator {
    return this.page.locator('input[name="name-*"]');
  }

  getEmailField(): Locator {
    return this.page.locator('input[type="email"][name="email"]');
  }

  getSubjectField(): Locator {
    return this.page.locator('input[name="subject"]');
  }

  getMessageField(): Locator {
    return this.page.locator('textarea[placeholder="Message"]');
  }

  getSendButton(): Locator {
    return this.page.locator('button[aria-label="Send"]');
  }

  getSuccessMessage(): Locator {
    return this.page.locator('text=Success! Message received.');
  }
}
