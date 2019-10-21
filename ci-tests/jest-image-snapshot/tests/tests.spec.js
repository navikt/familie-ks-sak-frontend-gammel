// @ts-nocheck

const puppeteer = require('puppeteer');

const large = { width: 1920, height: 1080 };

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

        test('fagsak-innvilget', async () => {
            await page.goto('http://ci-test-server:8000/1');
            await page.waitFor('.personkort');
            await takeSnapshot(`fagsak-innvilget-${name}`, page);
        });

        test('fagsak-adressehistorikk', async () => {
            await page.goto('http://ci-test-server:8000/1');
            await page.waitFor('.personkort');
            await page.click('#visadressehistorikk');
            await page.waitFor('.adressehistorikkmodal');
            await takeSnapshot(`fagsak-adressehistorikk-${name}`, page);
        });

        test('fagsak-avslått', async () => {
            await page.goto('http://ci-test-server:8000/2');
            await page.waitFor('.personkort');
            await takeSnapshot(`fagsak-avslått-${name}`, page);
        });

        test('fagsak-ikketilgang', async () => {
            await page.goto('http://ci-test-server:8000/3');
            await page.waitFor('.alertstripe');
            await takeSnapshot(`fagsak-ikketilgang-${name}`, page);
        });

        test('fagsak-feilet', async () => {
            await page.goto('http://ci-test-server:8000/4');
            await page.waitFor('.alertstripe');
            await takeSnapshot(`fagsak-feilet-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
