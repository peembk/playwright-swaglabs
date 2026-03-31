import { test, expect } from '@playwright/test';
import { ProductPage } from '../page/product.page';

test.describe('Add Remove item',() => {
  let productPage : ProductPage

    test.beforeEach(async ({ page }) => {
      productPage = new ProductPage(page)
      // Open browser and login success
      await page.goto('https://www.saucedemo.com/')
      await page.locator('#user-name').fill('standard_user')
      await page.locator('#password').fill('secret_sauce')
      await page.locator('#login-button').click()
    })

      test('TC-007 | Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        const count = await productPage.countProductList.count()
        await expect(count).toEqual(6)
        await expect(productPage.cartBadge).toBeHidden()

        // select Product
        await productPage.clickAddBackpack()
        await expect(productPage.cartBadge).toHaveText('1')

        await productPage.clickAddBikelight()
        await expect(productPage.cartBadge).toHaveText('2')

        // remove Product
        await productPage.clickRemoveBikelight()
        await expect(productPage.cartBadge).toHaveText('1')

      })
})




