import { Page, expect } from '@playwright/test'
import { CartPage } from '../page/cart.page'
import { ProductPage, products } from '../page/product.page'
import { test } from '../fixtures/cart.fixture'


test('TC-013 | The cart badge should displays the correct number of items currently in the cart', async ({ addedProduct, page }) => {
    const cartPage = new CartPage(page)
    await addedProduct(3)
    await expect(cartPage.cartBadge).toHaveText('3')
})