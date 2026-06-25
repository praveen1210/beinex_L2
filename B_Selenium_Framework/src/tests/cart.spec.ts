import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { mochaHooks } from './hooks';

describe('Cart Functionality', function () {
    let driver: WebDriver;
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    before(async function () {
        await mochaHooks.beforeAll.call(this);
        driver = this.driver;
        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
    });

    after(async function () {
        await mochaHooks.afterAll.call(this);
    });

    afterEach(async function () {
        await mochaHooks.afterEach.call(this);
    });

    it('should add a product/cart and validate cart summary', async function () {
        await homePage.navigateTo();
        await homePage.clickProducts();
        
        await productsPage.addFirstProductToCart();
        await productsPage.goToCart();
        
        const count = await cartPage.getCartItemsCount();
        expect(count).to.equal(1);
        
        const totalPrice = await cartPage.getFirstItemTotalPrice();
        expect(totalPrice).to.not.be.empty;
    });
});
