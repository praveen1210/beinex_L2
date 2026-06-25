import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../data/user_details.json';
import { generateCheckoutData, errorMessages } from '../utils/validation';

test.describe('Checkout Tests', () => {

  test('End-to-end checkout flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      users.standard_user.username,
      users.standard_user.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    const inventoryPage = new InventoryPage(page);

    // Add two products
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);

    // Open Cart
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);

    // Calculate expected subtotal from actual cart items
    const price1 = Number((await cartPage.getItemPrice(0))?.replace('$', ''));
    const price2 = Number((await cartPage.getItemPrice(1))?.replace('$', ''));

    const expectedSubtotal = price1 + price2;

    // Checkout
    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);

    const checkoutData = generateCheckoutData();

    await checkoutPage.fillCheckoutInfo(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.zipCode
    );

    await checkoutPage.continue();

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutPage.finish();

    expect(await checkoutPage.getConfirmationMessage())
      .toBe(errorMessages.checkoutComplete);

    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

  });

  test('Checkout without first name shows validation error', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      users.standard_user.username,
      users.standard_user.password
    );

    await expect(page).toHaveURL(/inventory.html/);

    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart(0);
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);

    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);

    const checkoutData = generateCheckoutData();

    await checkoutPage.fillCheckoutInfo(
      '',
      checkoutData.lastName,
      checkoutData.zipCode
    );

    await checkoutPage.continue();

    expect(await checkoutPage.getErrorMessage())
      .toBe(errorMessages.checkoutFirstNameRequired);

  });

});