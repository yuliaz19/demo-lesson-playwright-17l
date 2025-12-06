import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base-page'

export class OrderPage extends BasePage {
  //readonly page: Page
  readonly statusButton: Locator
  readonly userNameField: Locator
  readonly phoneField: Locator
  readonly commentField: Locator
  readonly orderButton: Locator
  readonly mainpageLink: Locator
  readonly orderCreatedButton: Locator
  readonly logoutButton: Locator
  readonly headingMain: Locator
  readonly headingOrder: Locator
  readonly headingCreatedOrder: Locator
  readonly textCode: Locator
  readonly closingButton: Locator
  readonly errorUsername: Locator
  readonly errorPhone: Locator
  readonly searchOrderInput: Locator
  readonly searchOrderButton: Locator

  constructor(page: Page) {
    //this.page = page
    super(page)
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.userNameField = page.getByTestId('username-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.phoneField = page.getByTestId('phone-input')
    this.commentField = page.getByTestId('comment-input')
    this.mainpageLink = page.getByTestId('mainPage-link')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.headingMain = page.getByRole('heading', { name: 'Tallinn Delivery' })
    this.headingOrder = page.getByRole('heading', { name: 'Create order' })
    this.headingCreatedOrder = page.getByRole('heading', { name: 'Order has been created!' })
    this.textCode = page.getByText('Tracking code:')
    this.closingButton = page.getByTestId('orderSuccessfullyCreated-popup-close-button')
    this.errorUsername = page.getByTestId('username-input-error')
    this.errorPhone = page.getByTestId('phone-input-error')
    this.searchOrderInput = page.getByTestId('searchOrder-input')
    this.searchOrderButton = page.getByTestId('searchOrder-submitButton')
  }
}
