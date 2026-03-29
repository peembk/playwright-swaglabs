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

test('TC09 | Product sort container select az', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('az')

  const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents()
  const sorted = [...productNames].sort()

  await expect(productNames).toEqual(sorted)
});

test('TC10 | Product sort container select za', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('za')

  const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents()
  const sorted = [...productNames].sort().reverse()

  await expect(productNames).toEqual(sorted)
});

test('TC11 | Product sort container select Price (low to high)', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi')
  
  const itemePrice = await page.locator('[data-test="inventory-item-price"]').allTextContents()
  console.log("ดึงราคาในหน้า Product มา => " + itemePrice)

  const newItemPrice = itemePrice.map(price => parseFloat(price.replace('$',''))) // price เป็นตัวแปรที่สร้างขึ้นใหม่เพื่อใช้ในการวน array
  console.log("จะได้ราคาแบบลบ $ และแปลงจาก string เป็น float => " + newItemPrice)

  const sorted = [...newItemPrice].sort((a, b) => a - b) // sort ตัวเลขต้องใช้ concept นี้

  await expect(newItemPrice).toEqual(sorted)


});



