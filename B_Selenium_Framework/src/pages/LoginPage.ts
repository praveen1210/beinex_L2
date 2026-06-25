import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Signup
    private signupNameInput = By.css('input[data-qa="signup-name"]');
    private signupEmailInput = By.css('input[data-qa="signup-email"]');
    private signupBtn = By.css('button[data-qa="signup-button"]');

    // Registration Form
    private passwordInput = By.id('password');
    private firstNameInput = By.id('first_name');
    private lastNameInput = By.id('last_name');
    private addressInput = By.id('address1');
    private stateInput = By.id('state');
    private cityInput = By.id('city');
    private zipcodeInput = By.id('zipcode');
    private mobileInput = By.id('mobile_number');
    private createAccountBtn = By.css('button[data-qa="create-account"]');
    private accountCreatedMsg = By.css('h2[data-qa="account-created"]');

    // Login
    private loginEmailInput = By.css('input[data-qa="login-email"]');
    private loginPasswordInput = By.css('input[data-qa="login-password"]');
    private loginBtn = By.css('button[data-qa="login-button"]');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async signup(name: string, email: string) {
        await this.type(this.signupNameInput, name);
        await this.type(this.signupEmailInput, email);
        await this.click(this.signupBtn);
    }

    async fillRegistrationDetails(password: string, firstName: string, lastName: string, address: string, state: string, city: string, zipcode: string, mobile: string) {
        await this.type(this.passwordInput, password);
        await this.type(this.firstNameInput, firstName);
        await this.type(this.lastNameInput, lastName);
        await this.type(this.addressInput, address);
        await this.type(this.stateInput, state);
        await this.type(this.cityInput, city);
        await this.type(this.zipcodeInput, zipcode);
        await this.type(this.mobileInput, mobile);
        await this.click(this.createAccountBtn);
    }

    async isAccountCreated(): Promise<boolean> {
        return await this.isElementDisplayed(this.accountCreatedMsg);
    }

    async login(email: string, password: string) {
        await this.type(this.loginEmailInput, email);
        await this.type(this.loginPasswordInput, password);
        await this.click(this.loginBtn);
    }
}
