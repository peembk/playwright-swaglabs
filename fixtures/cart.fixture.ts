import { ProductPage } from "../page/product.page";
import { expect, Page, test as base } from "@playwright/test";


type CartFixture = {
  addedProduct: (count: number) => Promise<Array<{ name: string; price: string }>>
}

export const test = base.extend<CartFixture>({
  addedProduct: async ({ page }, use) => {

    await use(async (count: number) => {
      const productPage = new ProductPage(page)  // instance productPage
      await productPage.goto()     // ไปหน้า Product

      const addedProduct: Array<{ name: string; price: string }> = []  // ให้ fixture ประกาศเป็น array เก็บ name price
      const productCards = productPage.displayProductSort     // name product
      const productPrices = productPage.displayPriceSort  // price product

      for (let i = 0; i < count; i++) {
        const name = await productCards.nth(i).textContent() ?? ''     // เอาชื่อ name ออกมา
        const price = await productPrices.nth(i).textContent() ?? ''   // เอา price ออกมา

        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').nth(i).click()  // click
        addedProduct.push({ name, price })
      }

      return addedProduct
    })
  }
})

export { expect }
