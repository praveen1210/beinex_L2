import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private cartItems = By.css('tr[id^="product-"]');
    private cartTotal = By.css('.cart_total_price');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async getCartItemsCount(): Promise<number> {
        const elements = await this.driver.findElements(this.cartItems);
        return elements.length;
    }

    async getFirstItemTotalPrice(): Promise<string> {
        return await this.getText(this.cartTotal);
    }
}
