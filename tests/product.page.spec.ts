import { test, expect } from '@playwright/test';
import { ProductPage, products } from '../page/product.page';

test.use({ storageState: './auth/user.json' })
  
test.describe('Add Remove item',() => {
  let productPage : ProductPage

    test.beforeEach(async ({ page }) => {
      productPage = new ProductPage(page)
      await productPage.goto()
    })

      test('TC-007 | Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({ page }) => {
        // select Product
        await productPage.addProduct(products.backpack)
        await expect(page
      })
})




