import { test, expect, Locator } from '@playwright/test';
import { ProductPage, sort, products } from '../page/product.page';

  
test.describe('Add Remove item',() => {
  let productPage : ProductPage

    test.beforeEach(async ({ page }) => {
      productPage = new ProductPage(page)
      await productPage.goto()
    })

      test('TC-007 | Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({ page }) => {
        // select Product
        await productPage.addProduct(products.backpack)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

        await productPage.addProduct(products.bikeLight)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

        await productPage.rmvProduct(products.bikeLight)
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
      })

      test('TC-008 | Product should correctly sorts items from A to Z', async ({ page }) => {
        await productPage.SortName(sort.az)
        const arrproduct = await page.locator('[data-test="inventory-item"]').allTextContents()
        const sorted = [...arrproduct].sort()
        await expect(arrproduct).toEqual(sorted)
      })

      test('TC-009 | Product should correctly sorts items from Z to A' , async ({ page }) => {
        await productPage.SortName(sort.za)
        const arrproduct = await page.locator('[data-test="inventory-item"]').allTextContents()
        const sorted = [...arrproduct].sort().reverse()
        await expect(arrproduct).toEqual(sorted)
      })
})






