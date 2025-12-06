import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly enButton: Locator
  readonly ruButton: Locator
  readonly privacyPolicyLink: Locator
  readonly cookiePolicy: Locator
  readonly termsService: Locator
  readonly TIMEOUT_VISIBILITY: number = 5000

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.enButton = page.getByRole('button', { name: 'EN' })
    this.ruButton = page.getByRole('button', { name: 'RU' })
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
    this.cookiePolicy = page.getByTestId('cookie-policy')
    this.termsService = page.getByTestId('terms-of-service')
  }

  async checkElementVisibility(element: Locator): Promise<void> {
    // better test report with 'step'
    await test.step(`Verifying element visibility: ${element}`, async () => {
      await expect(element).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyLanguageSelector(): Promise<void> {
    await test.step('Verify language selector', async () => {
      await this.checkElementVisibility(this.languageSwitcher)
    })
  }

  async clickElement(element: Locator) {
    await test.step(`Clicking element: ${element}`, async () => {
      await element.click()
    })
  }

  async fillElement(element: Locator, text: string) {
    await test.step(`Filling element: ${element}`, async () => {
      await element.fill(text)
    })
  }

  async verifyPolicyFooter(): Promise<void> {
    await test.step('Verify Policy link in the footer', async () => {
      await expect(this.privacyPolicyLink).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyCookiesFooter(): Promise<void> {
    await test.step('Verify Cookie Policy in the footer', async () => {
      await expect(this.cookiePolicy).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }

  async verifyTermsFooter(): Promise<void> {
    await test.step('Verify Terms of Service in the footer', async () => {
      await expect(this.termsService).toBeVisible({ timeout: this.TIMEOUT_VISIBILITY })
    })
  }
}
