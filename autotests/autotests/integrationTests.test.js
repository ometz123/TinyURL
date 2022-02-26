const axios = require("axios");
const request = require('supertest')

describe('Integration', () => {

    describe('GET/', () => {

        test('should return "No URLs"', async () => {
            const res = await request("http://localhost:5000").get("/");
            expect(res.text).toEqual("No URLs");
        });

    });

    describe('POST/shortUrls', () => {
        let tiny = '';

        test('should post a new URL', async () => {
            const res = await axios.post("http://localhost:5000/shortUrls", { url: "https://www.google.com/" });

            tiny = res.data.shortUrl.short;
            expect(res.data.shortUrl.full).toEqual("https://www.google.com/");
        });

        describe('GET/:shortUrl', () => {

            test('should return 404', async () => {
                const res = await request("http://localhost:5000/").get(`123`);
                expect(res.statusCode).toEqual(404);
            });

            test('should redirect', async () => {
                const res = await request("http://localhost:5000/").get(tiny);
                //const res = await axios.get(`http://localhost:5000/${tiny}`)

                expect(res.text).toEqual("Found. Redirecting to https://www.google.com/");
            });
        });
    });


});