// @ts-nocheck

const puppeteer = require('puppeteer');

const large = { width: 1800, height: 1400 };

const config = [['large', large]];

describe('dsop-kontroll', () => {
    let browser;
    beforeAll(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    });

    describe.each(config)('%s', (name, size) => {
        let page;

        beforeAll(async () => {
            page = await browser.newPage();
            page.setViewport(size);
            await page.goto('http://ci-test-server:8000/');
        });

        test('startside', async () => {
            await page.waitFor(1000);
            await takeSnapshot(`startside-${name}`, page);
        });

        test('fagsak', async () => {
            await page.goto('http://ci-test-server:8000/1');
            await page.waitFor('.personkort');
            await takeSnapshot(`fagsak-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
