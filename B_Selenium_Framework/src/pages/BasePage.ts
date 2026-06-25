import { WebDriver, WebElement, until, By, Locator } from 'selenium-webdriver';
import { Logger } from '../utils/logger';
import { config } from '../utils/config';

export class BasePage {
    constructor(protected driver: WebDriver) {}

    protected async findElement(locator: Locator): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(locator), config.timeout);
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), config.timeout);
        return element;
    }

    protected async click(locator: Locator) {
        await this.removeAds();
        Logger.info(`Clicking on element: ${locator.toString()}`);
        const element = await this.findElement(locator);
        await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', element);
        try {
            await element.click();
        } catch (error) {
            if (error instanceof Error && (error.name === 'ElementClickInterceptedError' || error.name === 'StaleElementReferenceError')) {
                Logger.warn(`Click issue detected (${error.name}), retrying with JavaScript click for ${locator.toString()}`);
                await this.jsClick(element);
            } else {
                throw error;
            }
        }
    }

    protected async jsClick(element: WebElement) {
        await this.driver.executeScript('arguments[0].click();', element);
    }

    protected async removeAds() {
        try {
            await this.driver.executeScript(`
                const remove = (selector) => {
                    document.querySelectorAll(selector).forEach(el => el.remove());
                };
                remove('iframe');
                remove('ins.adsbygoogle');
                remove('div[id^="google_ads"]');
                remove('#dismiss-button');
                remove('div[id="aswift_0_host"]');
            `);
        } catch (e) {
            // Silently ignore
        }
    }

    protected async type(locator: Locator, text: string) {
        Logger.info(`Typing "${text}" into element: ${locator.toString()}`);
        const element = await this.findElement(locator);
        await element.clear();
        await element.sendKeys(text);
    }

    protected async getText(locator: Locator): Promise<string> {
        const element = await this.findElement(locator);
        return await element.getText();
    }

    protected async isElementDisplayed(locator: Locator): Promise<boolean> {
        try {
            const element = await this.findElement(locator);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async navigateTo(url: string = '') {
        const targetUrl = config.baseUrl + url;
        Logger.info(`Navigating to: ${targetUrl}`);
        await this.driver.get(targetUrl);
    }

    async getTitle(): Promise<string> {
        return await this.driver.getTitle();
    }
}
