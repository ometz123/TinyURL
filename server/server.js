const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})
);

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  if (shortUrls.length > 0) {
    res.send({ shortUrls });
  }
  else {
    res.send("No URLs")
  }
})

app.post('/shortUrls', async (req, res) => {
  const body = req.body.url;
  await ShortUrl.create({ full: body })
  const shortUrl = await ShortUrl.findOne({ full: body });
  if (shortUrl) {
    res.send({ shortUrl })
  }
  else {
    res.send("No URLs");
  }
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.status(404).send("Not found");
  res.redirect(shortUrl.full);
})


const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.info(`> Listening on port ${port}...`));
module.exports = server;
