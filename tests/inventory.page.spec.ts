import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com')
  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('#login-button').click()
});

test('TC06 | Verify inventory page after login Success', async ({ page }) => {
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  await expect(page.locator('[data-test="title"]')).toHaveText('Products')
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible()
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible()
});

test('TC07 | Show All Products', async ({ page }) => {
  const countProduct = page.locator('[data-test="inventory-item"]')
  await expect(countProduct).toHaveCount(6)
});


test('TC08 | click Add and remove to card Product', async ({ page }) => {
  // click Product 1
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

  // click Product 2
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

  // click Product 3
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3')
  
  // remove Product 1
  await page.locator('#remove-sauce-labs-backpack').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

  // remove Product 2
  await page.locator('#remove-sauce-labs-bike-light').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

  // remove Product 3
  await page.locator('#remove-sauce-labs-bolt-t-shirt').click()
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden()

});

test('TC09 | Product sort container', async ({ page }) => {
});



