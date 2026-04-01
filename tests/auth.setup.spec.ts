import { test as setup , expect } from '@playwright/test'
import { LoginPage } from "../page/login.page";

setup('login and save seeions', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.fillUsernamePassword('standard_user','secret_sauce')
    await loginPage.clickLoginBtn()
    page.waitForURL('**/inventory.html')
    // เก็บ sessions
    await page.context().storageState({
        path: './auth/user.json',
    })
})

