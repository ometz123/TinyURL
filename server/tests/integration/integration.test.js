const axios = require("axios")

describe('GET/', () => {

    test('should return all urls', async () => {
        const res = await axios.get("/");

        expect(res.data.shortUrls).toEqual("No URLs");
    });


});

describe('POST/shortUrls', () => {

    test('should post a new URL', async () => {
        const res = await axios.post("/shortUrls",  "https://www.google.com/" )

        expect(res.data.shortUrls).toEqual();

    });
});