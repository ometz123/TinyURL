
describe('E2E', () => {
    const { createPageAndBrowser } = require("./src/page")
    let page;

    describe('Load Page', () => {

        jest.setTimeout(20 * 1000);

        test("should Open the browser on URL: http://localhost:3000/ and get the header's title", async () => {

            page = await createPageAndBrowser("http://localhost:3000/");
            await page.waitForSelector(`[testid="MyHeader"]`)
            expect(await page.getInnerText("MyHeader")).toEqual("Tiny URL");
        });

        test('Table Headers should be ["Tiny", "Full"]', async () => {
            expect(await page.getTableHeaders("URLsTableHeader")).toEqual(["Tiny", "Full"]);
        });

        test('Table content should be empty', async () => {
            expect(await page.getTableContent()).toEqual([]);
        });

        test('should Insert new URL', async () => {
            //await page.$eval(`input[testid=URLInput]`, el => el.value = 'https://www.google.com/');
            await page.focus(`[testid="input_URLInput"]`);
            await page.keyboard.type('https://www.google.com/');
            expect(await page.getText("input_URLInput")).toEqual("https://www.google.com/")
        });

        test('should create a new Tiny URL', async () => {
            await page.clickTI("Button_CreateTinyURL");
            await page.waitForSelector(`[testid="URLTable_full_https://www.google.com/"]`);
            expect((await page.getTableContent())[1]).toEqual("https://www.google.com/");
        });

        test("should close the browser", async () => {
            await page.closeBrowser();
        });
    });
});


