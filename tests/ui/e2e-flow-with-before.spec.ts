import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found-page'
import { ExistingOrderPage } from '../pages/existing-order-page'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.mainpageLink).toBeEnabled()
  await expect(orderCreationPage.statusButton).toBeEnabled()
  await expect(orderCreationPage.logoutButton).toBeEnabled()
  await expect(orderCreationPage.userNameField).toBeVisible()
  await expect(orderCreationPage.phoneField).toBeVisible()
  await expect(orderCreationPage.commentField).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeVisible()
  await orderCreationPage.verifyPolicyFooter()
  await orderCreationPage.verifyCookiesFooter()
  await orderCreationPage.verifyTermsFooter()
  await orderCreationPage.verifyLanguageSelector()
  await orderCreationPage.checkElementVisibility(orderCreationPage.enButton)
  await orderCreationPage.checkElementVisibility(orderCreationPage.ruButton)
  await expect(orderCreationPage.headingMain).toBeVisible()
  await expect(orderCreationPage.headingOrder).toBeVisible()
})

test('login and create order successfully', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(5))
  await orderCreationPage.phoneField.fill(faker.lorem.word(6))
  //await orderCreationPage.commentField.fill(faker.lorem.word(5))
  await orderCreationPage.orderButton.click()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})

test('login with small username', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(1))
  await orderCreationPage.phoneField.fill(faker.lorem.word(6))
  await expect(orderCreationPage.errorUsername).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login with small phone', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(5))
  await orderCreationPage.phoneField.fill(faker.lorem.word(1))
  await expect(orderCreationPage.errorPhone).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login with empty username', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(2))
  await orderCreationPage.userNameField.fill('')
  await orderCreationPage.phoneField.fill(faker.lorem.word(6))
  await expect(orderCreationPage.errorUsername).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login with empty phone', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.userNameField.fill(faker.lorem.word(5))
  await orderCreationPage.phoneField.fill(faker.lorem.word(7))
  await orderCreationPage.phoneField.fill('')
  await expect(orderCreationPage.errorPhone).toBeVisible()
  await expect(orderCreationPage.orderButton).toBeDisabled()
})

test('login and logout', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect(authPage.signInButton).toBeVisible()
})

test('verify language toggle on login page', async ({ page }) => {
  await authPage.verifyLanguageSelector()
})

test('verify Order not found page', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('0')
  await orderCreationPage.searchOrderButton.click()
  const orderNotFoundPage = new OrderNotFoundPage(page)
  await expect(orderNotFoundPage.orderNotFound).toBeVisible()
  await orderNotFoundPage.verifyPolicyFooter()
  await orderNotFoundPage.verifyCookiesFooter()
  await orderNotFoundPage.verifyTermsFooter()
  await orderNotFoundPage.verifyLanguageSelector()
  await orderNotFoundPage.checkElementVisibility(orderCreationPage.enButton)
  await orderNotFoundPage.checkElementVisibility(orderCreationPage.ruButton)
})

test('verify existing found order page', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchOrderInput.fill('13644')
  await orderCreationPage.searchOrderButton.click()
  const existingOrderPage = new ExistingOrderPage(page)
  await expect(existingOrderPage.statusListItem).toBeVisible()
  await existingOrderPage.verifyPolicyFooter()
  await existingOrderPage.verifyCookiesFooter()
  await existingOrderPage.verifyTermsFooter()
  await existingOrderPage.verifyLanguageSelector()
  await existingOrderPage.checkElementVisibility(orderCreationPage.enButton)
  await existingOrderPage.checkElementVisibility(orderCreationPage.ruButton)
})
