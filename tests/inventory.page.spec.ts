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


test('TC08 | click Add to card ', async ({ page }) => {
  
});

