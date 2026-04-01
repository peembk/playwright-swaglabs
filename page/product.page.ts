import { Locator, Page } from '@playwright/test'

export const products = {
    backpack: 'backpack',
    bikeLight: 'bike-light'
 } as const

export class ProductPage {
    readonly page: Page
    readonly cartLink: Locator
    readonly cartBadge: Locator


    constructor(page : Page) {
        this.page = page
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        //this.productList = page.locator('[data-test="inventory-item-sauce-labs-]')

    }
    // function 

    private addBtn(productId : string) : Locator {
        return this.page.locator(`[data-test="add-to-cart-sauce-labs-${productId}"]`)
    }

    private revBtn(productId : string) : Locator {
        return this.page.locator(`[data-test="remove-sauce-labs-${productId}"]`)
    }

    async addProduct(productId: string) {
        await this.addBtn(productId).click()
    }

    async rmvProduct(productId: string) {
        await this.revBtn(productId).click()
    }
    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html')
}







}