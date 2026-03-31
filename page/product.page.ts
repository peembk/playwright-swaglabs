import { Locator, Page } from '@playwright/test'

export class ProductPage {
    readonly cartLink: Locator
    readonly backPackProduct_name: Locator
    readonly backPackProduct_price: Locator
    readonly backPackProduct_addBtn: Locator
    readonly backPackProduct_rmBtn: Locator

    readonly bikeLightProduct_name: Locator
    readonly bikeLightProduct_price: Locator
    readonly bikeLightProduct_addBtn: Locator
    readonly bikeLightProduct_rmBtn: Locator

    // Count Product list'
    readonly countProductList: Locator

    // cart badge
    readonly cartBadge: Locator



    constructor(page : Page) {
        this.cartLink = page.locator('[data-test="shopping-cart-link"]')
        // Back Pack Product
        this.backPackProduct_name = page.locator('[data-test="inventory-item-name"]')
        this.backPackProduct_price = page.locator('[data-test="inventory-item-price"]')
        this.backPackProduct_addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.backPackProduct_rmBtn = page.locator('[data-test="remove-sauce-labs-backpack"]')

        // Bike light Product
        this.bikeLightProduct_name = page.locator('[data-test="inventory-item-name"]')
        this.bikeLightProduct_price = page.locator('[data-test="inventory-item-price"]')
        this.bikeLightProduct_addBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.bikeLightProduct_rmBtn = page.locator('[data-test="remove-sauce-labs-bike-light"]')

        // Count Product list'
        this.countProductList = page.locator('[data-test="inventory-item"]')

        // number of cart
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')

    }
    // function 
   async clickCartLink() {
        await this.cartLink.click()
    }
    
    async clickAddBackpack() {
        await this.backPackProduct_addBtn.click()
    }

    async clickAddBikelight() {
        await this.bikeLightProduct_addBtn.click()
    }

    async clickRemoveBackpack() {
        await this.backPackProduct_rmBtn.click()
    }

    async clickRemoveBikelight() {
        await this.bikeLightProduct_rmBtn.click()
    }











}