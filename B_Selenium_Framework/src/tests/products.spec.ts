import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { mochaHooks } from './hooks';

describe('Product Search and Filters', function () {
    let driver: WebDriver;
    let homePage: HomePage;
    let productsPage: ProductsPage;

    before(async function () {
        await mochaHooks.beforeAll.call(this);
        driver = this.driver;
        homePage = new HomePage(driver);
        productsPage = new ProductsPage(driver);
    });

    after(async function () {
        await mochaHooks.afterAll.call(this);
    });

    afterEach(async function () {
        await mochaHooks.afterEach.call(this);
    });

    it('should search for a product and validate results', async function () {
        await homePage.navigateTo();
        await homePage.clickProducts();
        
        await productsPage.searchProduct('tshirt');
        const count = await productsPage.getProductResultsCount();
        expect(count).to.be.greaterThan(0);
    });

    it('should apply category filters and validate results', async function () {
        await homePage.navigateTo();
        await homePage.clickProducts();
        
        await productsPage.filterByCategory();
        const count = await productsPage.getBrandFilterResultsCount();
        expect(count).to.be.greaterThan(0);
    });
});
