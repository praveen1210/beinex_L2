import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private signupLoginBtn = By.css('a[href="/login"]');
    private productsBtn = By.css('a[href="/products"]');
    private cartBtn = By.css('a[href="/view_cart"]');
    private loggedInAs = By.xpath('//i[@class="fa fa-user"]/parent::a');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickSignupLogin() {
        await this.click(this.signupLoginBtn);
    }

    async clickProducts() {
        await this.click(this.productsBtn);
    }

    async clickCart() {
        await this.click(this.cartBtn);
    }

    async getLoggedInUser(): Promise<string> {
        return await this.getText(this.loggedInAs);
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.isElementDisplayed(this.loggedInAs);
    }
}
