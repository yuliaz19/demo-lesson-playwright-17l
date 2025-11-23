import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'

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
  await expect(orderCreationPage.privacyPolicy).toBeEnabled()
  await expect(orderCreationPage.cookiePolicy).toBeEnabled()
  await expect(orderCreationPage.termsService).toBeEnabled()
  await expect(orderCreationPage.enButton).toBeEnabled()
  await expect(orderCreationPage.ruButton).toBeEnabled()
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
