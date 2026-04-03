import { Page, Locator } from '@playwright/test'

export const listYourCart = {
    backpack : 'backpack',
    bikelight : 'bike-light',

} as const


export class CartPage {
    readonly page : Page
    readonly pageTitle : Locator
    readonly cartBadge : Locator
    readonly productInCartList : Locator
    readonly continueShopingBtn : Locator
    readonly checkOutBtn : Locator

    constructor(page : Page) {
        this.page = page
        this.pageTitle = page.getByTitle('Your Cart')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.productInCartList = page.locator('[data-test="inventory-item"]')
        this.continueShopingBtn = page.locator('[data-test="continue-shopping"]')
        this.checkOutBtn = page.locator('#checkout')
    }

    private removeBtn(productId : string) {
        return this.page.locator(`data-test="remove-sauce-labs-${productId}"`)
    }

    async removeproductBtn(productId : string) {
        await this.removeBtn(productId).click()
    }

    async backPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html')
    }

    async checkOutPage() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html')
    }

}