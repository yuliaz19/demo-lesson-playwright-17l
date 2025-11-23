import type { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly userNameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly orderButton: Locator
  readonly mainpageLink: Locator
  readonly orderCreatedButton: Locator
  readonly logoutButton: Locator
  readonly privacyPolicy: Locator
  readonly cookiePolicy: Locator
  readonly termsService: Locator
  readonly enButton: Locator
  readonly ruButton: Locator
  readonly headingMain: Locator
  readonly headingOrder: Locator
  readonly headingCreatedOrder: Locator
  readonly textCode: Locator
  readonly closingButton: Locator
  readonly errorUsername: Locator
  readonly errorPhone: Locator

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userNameField = page.getByTestId('username-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.mainpageLink = page.getByTestId('mainPage-link')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.privacyPolicy = page.getByTestId('privacy-policy')
    this.cookiePolicy = page.getByTestId('cookie-policy')
    this.termsService = page.getByTestId('terms-of-service')
    this.enButton = page.getByRole('button', { name: 'EN' })
    this.ruButton = page.getByRole('button', { name: 'RU' })
    this.headingMain = page.getByRole('heading', { name: 'Tallinn Delivery' })
    this.headingOrder = page.getByRole('heading', { name: 'Create order' })
    this.headingCreatedOrder = page.getByRole('heading', { name: 'Order has been created!' })
    this.textCode = page.getByText('Tracking code:')
    this.closingButton = page.getByTestId('orderSuccessfullyCreated-popup-close-button')
    this.errorUsername = page.getByTestId('username-input-error')
    this.errorPhone = page.getByTestId('phone-input-error')
  }
}
