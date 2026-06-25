import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { mochaHooks } from './hooks';

describe('Authentication Flow', function () {
    let driver: WebDriver;
    let homePage: HomePage;
    let loginPage: LoginPage;

    before(async function () {
        await mochaHooks.beforeAll.call(this);
        driver = this.driver;
        homePage = new HomePage(driver);
        loginPage = new LoginPage(driver);
    });

    after(async function () {
        await mochaHooks.afterAll.call(this);
    });

    afterEach(async function () {
        await mochaHooks.afterEach.call(this);
    });

    it('should register a new user successfully', async function () {
        const timestamp = Date.now();
        const userName = `User_${timestamp}`;
        const userEmail = `test_${timestamp}@example.com`;

        await homePage.navigateTo();
        await homePage.clickSignupLogin();
        
        await loginPage.signup(userName, userEmail);
        await loginPage.fillRegistrationDetails('Password123', 'John', 'Doe', '123 Test St', 'California', 'San Jose', '95101', '1234567890');
        
        expect(await loginPage.isAccountCreated()).to.be.true;
    });

    it('should login with existing credentials', async function () {
        // First register (or use existing)
        const email = `login_test_${Date.now()}@example.com`;
        await homePage.navigateTo();
        await homePage.clickSignupLogin();
        await loginPage.signup('LoginUser', email);
        await loginPage.fillRegistrationDetails('Password123', 'Login', 'User', '123 St', 'CA', 'SJ', '95101', '1234512345');

        // Logout and Login again (simplified for the flow)
        await homePage.navigateTo('/login');
        await loginPage.login(email, 'Password123');
        
        expect(await homePage.isLoggedIn()).to.be.true;
    });
});
