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
        await expect(productPage.cartBadge).toHaveText('1')

        await productPage.addProduct(products.bikeLight)
        await expect(productPage.cartBadge).toHaveText('2')

        await productPage.rmvProduct(products.bikeLight)
        await expect(productPage.cartBadge).toHaveText('1')
      })

      test('TC-008 | Product should correctly sorts items from A to Z', async ({ page }) => {
        await productPage.SortName(sort.az)
        const arrproduct = await productPage.displayProductSort.allTextContents()
        const sorted = [...arrproduct].sort()
        await expect(arrproduct).toEqual(sorted)
      })

      test('TC-009 | Product should correctly sorts items from Z to A' , async ({ page }) => {
        await productPage.SortName(sort.za)
        const arrproduct = await productPage.displayProductSort.allTextContents()
        const sorted = [...arrproduct].sort().reverse()
        await expect(arrproduct).toEqual(sorted)
      })

        test('TC-010 | Product should correctly sorts items from price low to high' , async ({ page }) => {
        await productPage.SortName(sort.lh)
        const arrprice = await productPage.displayPriceSort.allTextContents()
        const parseprice = arrprice.map(p => parseFloat(p.replace('$','')))
        const sorted = [...parseprice].sort((a,b) => a-b)
        await expect(parseprice).toEqual(sorted)
        
      })

})






