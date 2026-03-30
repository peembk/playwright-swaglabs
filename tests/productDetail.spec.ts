import { test, expect, } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click()
});

test('TC16 | select product "Sauce Labs Backpack" and see more detail' , async ({ page }) => {
    await page.locator('[data-test="inventory-item-name"]').filter({ hasText : 'Sauce Labs Backpack'}).click()

    await (expect(page)).toHaveURL(/inventory-item.html/)
    await (expect(page.locator('[data-test="inventory-item-name"]'))).toHaveText('Sauce Labs Backpack')

    // Check Add to cart button has click

    await page.locator('[data-test="add-to-cart"]').click()
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

    // Check Remove button has click
    await page.locator('#remove').click()
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden()

    // Check button 'Back to product
    await page.locator('#back-to-products').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6)
})

test('TC17 Check your cart add 2 products' , async ({ page }) => {
    // Click Product 1
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText('Add to cart')

    await page.locator('[name="add-to-cart-sauce-labs-backpack"]').click()

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove')

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')

    // click Product 2
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toHaveText('Add to cart')

    await page.locator('[name="add-to-cart-sauce-labs-bike-light"]').click()

    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveText('Remove')

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')
    
})

test('TC18 | Click cart to see product list ' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart')


})


test('TC19 | The cart badge should displays the correct number of items currently in the cart ' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

})

test('TC20 | click Continue to Shopping' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

    // click continue to Shopping
    await page.locator('[data-test="continue-shopping"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6)
})

test('TC21 | Check out' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

    // click Check out
    await page.locator('#checkout').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')
})

test('TC22 | fill information for CheckOut and click Cancel' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

    // click Check out
    await page.locator('#checkout').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')

    // fill ifformation and click cancel
    await page.locator('#first-name').fill('testfirstname')
    await page.locator('#last-name').fill('testlastname')
    await page.locator('#postal-code').fill('12345')
    await page.locator('#cancel').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
})

test('TC23 | fill information for CheckOut and click Continiue' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

    // click Check out
    await page.locator('#checkout').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')

    // fill ifformation and click continue
    await page.locator('#first-name').fill('testfirstname')
    await page.locator('#last-name').fill('testlastname')
    await page.locator('#postal-code').fill('12345')
    await page.locator('#continue').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview')
})

test('TC24 | Check out overview detail and click Finish' , async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    await page.locator('[data-test="shopping-cart-link"]').click()

    expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

    // click Check out
    await page.locator('#checkout').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')

    // fill ifformation and click continue
    await page.locator('#first-name').fill('testfirstname')
    await page.locator('#last-name').fill('testlastname')
    await page.locator('#postal-code').fill('12345')
    await page.locator('#continue').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview')

    // click Finish
    await page.locator('#finish').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!')
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
    await page.locator('[data-test="back-to-products"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('data-test="shopping-cart-badge"')).toBeHidden()
})


