const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const { User } = require('./models/user');
const cors = require('cors');
const characters = require("./characters.json");
const fs = require('fs');
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.post('/', async (req, res) => {
  const userName = req.body.userName;
  const isAdmin = req.body.isAdmin;
  const shortUrls = isAdmin ?
    await ShortUrl.find({}) :
    await ShortUrl.find({ userName })
  if (shortUrls.length > 0) {
    return res.send({ shortUrls });
  }
  else {
    return res.send("No URLs");
  }
})

app.get('/test', async (req, res) => {

  if (false) {

    const buffer = Buffer.alloc(8);
    console.log(buffer);
    // This will print out 8 bytes of zero:
    // <Buffer 00 00 00 00 00 00 00 00>

    const buffer2 = Buffer.from([8, 6, 7, 5, 3, 0, 9, 27]);
    console.log("buffer2");
    console.log(buffer2);
    // This will print out 8 bytes of certain values:
    // <Buffer 08 06 07 05 03 00 09 1b>

    const buffer3 = Buffer.from("I'm a string!", 'utf-8');
    console.log(buffer3);
    console.log(buffer3.toString("utf-8", 6, 12));
    // This will print out a chain of values in utf-8:
    // <Buffer 49 27 6d 20 61 20 73 74 72 69 6e 67 21>

    const buffer4 = Buffer.alloc(16)
    const num = buffer4.write("Hello", "utf-8")
    console.log(num, buffer4);
    console.log(buffer4.toString());

    const num2 = buffer4.write(" world!", 5, "utf-8")
    console.log(num2, buffer4);
    console.log(buffer4.toString());
    console.log(buffer4.toString('utf-8'));

    console.log(buffer4.toString());
    console.log(buffer4[12]);
    buffer4[12] = buffer4[11];
    console.log(buffer4[12]);
    console.log(buffer4.toString());
    //33
    buffer4[13] = "1".charCodeAt();
    console.log(buffer4.toString());
    console.log(buffer4[13]);
    //49
    buffer4[14] = buffer4[13];
    //49
    buffer4[15] = 33
    //33
    buffer4.toString("utf-8")
    //'Hello world!!11!'
    const snowman = "☃";
    console.log(snowman.length);
    //1
    console.log(Buffer.byteLength(snowman));
    //3

    const frosty = Buffer.alloc(24);
    console.log({ frosty })
    const snowman2 = Buffer.from("☃", "utf-8")
    console.log({ snowman2 })
    const num3 = frosty.write("Happy birthday! ", "utf-8")
    console.log({ frosty })
    console.log(num3)
    //16
    console.log(snowman2)
    console.log(frosty)
    const num4 = snowman2.copy(frosty, 16)
    // const num5 = frosty.copy(snowman2)
    // console.log({num5})
    console.log({ num4 })
    console.log({ snowman2 })
    console.log({ frosty })
    // 3
    console.log(frosty.toString("utf-8", 0, 19))
    //'Happy birthday! ☃'
    const puddle = frosty.slice(16, 19)
    console.log(puddle.toString())
    //'☃'
    puddle.write("___")//ref
    //  3
    console.log(frosty.toString("utf-8", 0, 19));
    console.log(frosty.toString());
    // "Happy birthday! ___"

    //res.send({ buffer, buffer2, buffer3, buffer4, frosty, puddle });


    const buffer6 = Buffer.from("I'm a very long string!", 'utf-8');
    console.log(buffer6);
    //const buf=Float32Array.from("I'm a very long string!")
    const buf = Float32Array.of(2, 4, 6, 88)
    //await wait(5000);
    const buffer7 = new ArrayBuffer(8);
    const uint8array1 = new Uint8Array(buffer7);
    console.log(uint8array1);
    uint8array1.byteOffset; // 0 (no offset specified)
    console.log(uint8array1.byteOffset);
    const uint8array2 = new Uint8Array(buffer7, 3);
    console.log(uint8array2.byteOffset);
  }
  let chars = [...characters];
  //console.log(characters.length);
  for (let i = 0; i < 1000; i++) {
    //chars = chars.concat(characters)
  }
  let str = JSON.stringify(chars);
  const retVal = {
    time: new Date().getTime(),
    data: characters,
  };
  str = "omer tzafrir\n"
  //const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
  const buff = Buffer.from(str, 'utf8');

  //res.write(buf, "utf8", () => { console.log("Writing string Data..."); });
  // res.write(buff, "utf8", () => { console.log("Writing string Data..."); });
  // fs.write()
  fs.open("input.txt", "w", (err, fd) => {
    if (err) {
      console.log("Cannot open file");
    } else {
      console.log("fd: ", fd);
      console.log("buff: ", buff);
      fs.write(fd, buff, 0, buff.length, null, (err, writtenBytes) => {
        if (err) {
          console.log("Cannot write to file");
        } else {
          console.log(writtenBytes + ` characters added to file`);
        }
      })
    }
  })

  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  return res.sendFile(`input.txt`, options, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Sent:', "input.txt");
    }
  });
  //res.end({ time: new Date().getTime() })
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.status(404).send("Not found");
  return res.redirect(shortUrl.full);
});

app.post('/shortUrls', async (req, res) => {
  const url = req.body.url;
  const userName = req.body.userName;
  await ShortUrl.create({
    full: url,
    userName
  })
  const shortUrl = await ShortUrl.findOne({ full: url, userName });
  if (shortUrl) {
    return res.send({ shortUrl });
  }
  else {
    return res.send("No URLs");
  }
});

app.post('/login', async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  console.log('====================================');
  console.log({ userName, password });
  console.log('====================================');
  if (userName !== undefined && password !== undefined) {

    const user = await User.findOne({ userName });

    if (!user) return res.status(404).send(`"${userName}" was not found`);

    if (user.password !== password) return res.status(404).send("Wrong user or password");

    return res.send({ userName: user.userName, isAdmin: user.isAdmin });
  }
});

app.post('/signUp', async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  if (userName !== undefined && password !== undefined) {

    let user = await User.findOne({ userName });
    if (user) return res.status(400).send('User already registered.');

    user = new User({ userName, password, isAdmin });
    await user.save();

    console.log(user);
    return res.send(`New user!: "${user.userName}"`)
  } else {
    return res.send(`error userName or password:${{ userName, password }}`)
  }

})
const wait = async (time) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
};

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.info(`> Listening on port ${port}...`));
module.exports = server;
