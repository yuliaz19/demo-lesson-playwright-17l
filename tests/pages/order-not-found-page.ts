import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderNotFoundPage extends BasePage {
  readonly orderNotFound: Locator

  constructor(page: Page) {
    super(page)
    this.orderNotFound = page.getByTestId('orderNotFound-container')
  }
}
