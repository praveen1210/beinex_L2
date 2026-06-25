import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private searchInput = By.id('search_product');
    private searchBtn = By.id('submit_search');
    private productItems = By.className('single-products');
    private firstProductAddToCart = By.xpath('(//a[text()="Add to cart"])[1]');
    private continueShoppingBtn = By.css('button.close-checkout-modal');
    private viewCartLink = By.xpath('//u[text()="View Cart"]');

    // Category and Brand Filters
    private categoryHeader = By.xpath('//h2[text()="Category"]');
    private womenCategory = By.xpath('//a[@href="#Women"]');
    private dressSubCategory = By.xpath('//a[@href="/category_products/1"]');
    private brandFilterProductCount = By.css('.features_items .col-sm-4');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async searchProduct(name: string) {
        await this.type(this.searchInput, name);
        await this.click(this.searchBtn);
    }

    async getProductResultsCount(): Promise<number> {
        const elements = await this.driver.findElements(this.productItems);
        return elements.length;
    }

    async addFirstProductToCart() {
        await this.click(this.firstProductAddToCart);
        await this.click(this.continueShoppingBtn);
    }

    async goToCart() {
        await this.click(this.viewCartLink);
    }

    async filterByCategory() {
        await this.click(this.womenCategory);
        await this.click(this.dressSubCategory);
    }

    async getBrandFilterResultsCount(): Promise<number> {
        const elements = await this.driver.findElements(this.brandFilterProductCount);
        return elements.length;
    }
}
