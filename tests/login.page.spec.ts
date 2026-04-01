import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/login.page';
import { validUser, invalidUser } from '../datatest/loginData';


test.describe('logIn Success', () => {
    let loginPage : LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.goto()
    })

        test('TC-001 Input fields should display as the data that was filled', async () => {
            await loginPage.fillUsernamePassword(validUser[0].username,validUser[0].password)
            await expect(loginPage.userNameLocator).toHaveValue(validUser[0].username)
            await expect(loginPage.passwordLocator).toHaveValue(validUser[0].password)
        })

        for (const users of validUser) {
            test(`TC-005 | Should logged in successfully with valid credentials ${users.username}`, async () => {
                await loginPage.fillUsernamePassword(users.username,users.password)
                await loginPage.clickLoginBtn()
                await loginPage.returnInventortUrl()
            })

        }
}) 

test.describe('login Fail', () => {
    let loginPage : LoginPage
        test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page)
            await loginPage.goto()
        })
            test('TC-002 | Should show an error message if log in without a username', async () => {
                await loginPage.fillUsernamePassword('',validUser[0].password)
                await loginPage.clickLoginBtn()
                return await expect(loginPage.errorMsg_invalid).toHaveText(/Epic sadface:/)
            })

            test('TC-003 | Should show an error message if log in without a password', async () => {
                await loginPage.fillUsernamePassword(validUser[0].username,'')
                await loginPage.clickLoginBtn()
                return await expect(loginPage.errorMsg_invalid).toHaveText(/Epic sadface:/)
            })

            test('TC-004 | Should show an error message if log in with both fields blank', async ()=> {
                await loginPage.fillUsernamePassword('','')
                await loginPage.clickLoginBtn()
                return await expect(loginPage.errorMsg_invalid).toHaveText(/Epic sadface:/)
            })

            test('TC-006 | Should logged in fails with an error message when using invalid credentials', async () => {
                await loginPage.fillUsernamePassword(invalidUser[0].username,invalidUser[0].password)
                await loginPage.clickLoginBtn()
                return await expect(loginPage.errorMsg_invalid).toHaveText(/Epic sadface:/)
            })

})








