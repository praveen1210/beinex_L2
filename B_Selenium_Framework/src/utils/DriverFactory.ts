import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import { config } from './config';

export class DriverFactory {
    static async createDriver(): Promise<WebDriver> {
        const browser = config.browser.toLowerCase();
        let builder = new Builder().forBrowser(browser);

        if (browser === 'chrome') {
            const options = new ChromeOptions();
            if (config.headless) {
                options.addArguments(
                    '--headless=new',
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-blink-features=AutomationControlled',
                    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                );
            }
            options.excludeSwitches('enable-automation');
            builder = builder.setChromeOptions(options);
        } else if (browser === 'firefox') {
            const options = new FirefoxOptions();
            if (config.headless) {
                options.addArguments('--headless');
            }
            builder = builder.setFirefoxOptions(options);
        }

        return await builder.build();
    }
}
