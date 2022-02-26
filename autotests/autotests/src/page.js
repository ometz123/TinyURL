const puppeteer = require('puppeteer');

let browser = {};
let page = {};

const createTestSelector = (testid) => { return `[testid="${testid}"]`; }

const createPageAndBrowser = async (link) => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    extendPage(page);
    await page.goto(link, { waitUntil: "networkidle2" });

    return page;
};


const extendPage = (page) => {
    page.closeBrowser = async () => {
        await browser.close();
    };

    page.createSelector = (testid) => {
        return (`[testid="${testid}"]`);
    };

    page.getInnerText = async (testid) => {
        testid = createTestSelector(testid);

        return await page.evaluate((testid) => {
            return document.querySelector(testid).innerText
        }, [testid]);
    };

    page.getTableHeaders = async (testid) => {

        testid = createTestSelector(testid);

        const headers = await page.evaluate((testid) => {
            return document.querySelector(testid).innerText.trim(" ").split("\t")
        }, [testid]);
        return headers
    };

    page.getTableContent = async () => {
        const urls = await page.evaluate(() => {
           return [...document.querySelectorAll(`[testid*="URLTable_"]`)].map((el)=>{
                return el.innerText
            })
        }, []);
        return urls
    };

    page.clickTI = (testid) => {
        page.click(`[testid="${testid}"]`)
    }

    page.getText = async (testid) => {
        return await page.evaluate((testid) => {
            return document.querySelector(`[testid="${testid}"]`).value
        }, [testid])

    }
};



module.exports = { createPageAndBrowser }