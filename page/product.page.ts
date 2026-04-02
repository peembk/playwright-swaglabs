import { Locator, Page } from '@playwright/test'

export const products = {
    backpack: 'backpack',
    bikeLight: 'bike-light'
 } as const

 export const sort = {
    az: 'az',
    za: 'za',
    lh: 'lohi',
    hl: 'hilo'
 } as const


export class ProductPage {
    readonly page: Page
    readonly cartLink: Locator
    readonly cartBadge: Locator
    readonly sortProduct: Locator
    readonly displayProductSort: Locator
    readonly displayPriceSort: Locator
  


    constructor(page : Page) {
        this.page = page
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.sortProduct = page.locator('[data-test="product-sort-container"]')
        // display product on page
        this.displayProductSort = page.locator('[data-test="inventory-item"]')
        // display product on page
        this.displayPriceSort = page.locator('[data-test="inventory-item-price"]')

    }



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
    
    async clickSort() {
        await this.clickSort()
    }

    // select sortname
    private optionSortName(productId : string) {
        return this.sortProduct.selectOption(`${productId}`)
    } 

    async SortName(productId : string) {
        await this.optionSortName(productId)
    }









}