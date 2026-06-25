export const config = {
    baseUrl: 'https://automationexercise.com/',
    timeout: 45000,
    browser: process.env.BROWSER || 'chrome',
    headless: process.env.HEADLESS === 'true'
};
