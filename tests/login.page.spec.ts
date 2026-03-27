import { test, expect, } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com')
});

test('TC01 | Display Swag Labs login Page', async ({ page }) => {
    await expect(page.locator('.login_logo')).toBeVisible()
    await expect(page.locator('#user-name')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.locator('#login-button')).toBeVisible()
});

test('TC02 | Login Success', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    
    await expect(page.locator('#user-name')).toHaveValue('standard_user')
    await expect(page.locator('#password')).toHaveValue('secret_sauce')
    await expect(page.locator('#login-button')).toHaveAttribute('type','submit')

    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});

test('TC03 | locked_out_user', async ({ page }) => {
    await page.locator('#user-name').fill('locked_out_user')
    await page.locator('#password').fill('secret_sauce')

    await expect(page.locator('#user-name')).toHaveValue('locked_out_user')
    await expect(page.locator('#password')).toHaveValue('secret_sauce')
    
    await page.locator('#login-button').click()
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    await expect(page).toHaveURL('https://www.saucedemo.com')
});

test('TC04 | fill Username only' , async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[type="submit"]').click()

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required')
});

test('TC05 | skip fill username and password' , async ({ page }) => {
    await page.locator('[type="submit"]').click()

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
});






