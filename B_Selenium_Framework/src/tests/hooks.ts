import { WebDriver } from 'selenium-webdriver';
import { DriverFactory } from '../utils/DriverFactory';
import { Logger } from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

export const mochaHooks = {
    async beforeAll(this: any) {
        this.driver = await DriverFactory.createDriver();
        await this.driver.manage().window().maximize();
    },

    async afterAll(this: any) {
        if (this.driver) {
            await this.driver.quit();
        }
    },

    async afterEach(this: any) {
        if (this.currentTest && this.currentTest.state === 'failed') {
            const testName = this.currentTest.fullTitle().replace(/[^a-z0-9]/gi, '_');
            const screenshotsDir = path.join(process.cwd(), 'screenshots');
            const screenshotPath = path.join(screenshotsDir, `${testName}_failure.png`);
            
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir, { recursive: true });
            }

            Logger.error(`Test failed: ${this.currentTest.fullTitle()}. Taking screenshot...`);
            
            if (this.driver) {
                try {
                    const screenshot = await (this.driver as WebDriver).takeScreenshot();
                    fs.writeFileSync(screenshotPath, screenshot, 'base64');
                    Logger.info(`Screenshot saved to: ${screenshotPath}`);
                } catch (error) {
                    Logger.error(`Failed to take/save screenshot: ${error}`);
                }
            }
        }
    }
};
