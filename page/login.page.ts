import { Page, Locator } from '@playwright/test'

export class LoginPage { // ขื่อ class ตอนเรียก object

    readonly userNameLocator: Locator
    readonly passwordLocator: Locator
    readonly loginBtn: Locator
    readonly errorMsg_invalid : Locator
    
    constructor(private page: Page) { // สร้างตัวแปร page ให้เรารับค่าตอนเรียก object ที่มี type เป็น Page จาก Playwright
        
        this.userNameLocator = page.locator('#user-name')
        this.passwordLocator = page.locator('#password')
        this.loginBtn = page.locator('#login-button')
        this.errorMsg_invalid = page.locator('[data-test="error"]')
        
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/')

   }

    async fillUsernamePassword(Username: string, Password: string) {
        await this.userNameLocator.fill(Username)
        await this.passwordLocator.fill(Password)
    }

    async getUsername() {
        return await this.userNameLocator.inputValue()
    }
    async getPassword() {
        return await this.passwordLocator.inputValue()
    }

    async clickLoginBtn() {
        await this.loginBtn.click()
    }

    async returnInventortUrl() {
        return await this.page.goto('https://www.saucedemo.com/inventory.html/')
    }

}