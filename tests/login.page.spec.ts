import { test, expect, Page, } from '@playwright/test';
import { LoginPage } from '../page/login.page';

test.describe('Login Success', () => {
    let loginPage: LoginPage
    // Run first
    test.beforeEach( async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.goto() 
    })

    test('TC01 | Input fields should display as the data that was filled ', async ({ page }) => {
        const fill_username = 'standard_user'
        const fill_password = 'secret_sauce'
        await loginPage.fillUsernamePassword(fill_username,fill_password)
        await expect(loginPage.userNameLocator).toHaveValue(fill_username)
        await expect(loginPage.passwordLocator).toHaveValue(fill_password)
    })
})






