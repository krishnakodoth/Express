var express = require("express");
var router = express.Router();
const shortid = require('shortid');


const urlDatabase = {};
const appDomain = "https://kpk.com/";

function generateShortUrl() {
  // return appDomain+shortid.generate();
  return shortid.generate();
}

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("short url");
});

router.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

/* POST home page. */
router.post("/", function (req, res, next) {
  const originalUrl = req.body.url;
  console.log(req)
  console.log(originalUrl)
  const shortUrl = generateShortUrl();
  urlDatabase[shortUrl] = originalUrl;
  res.json({ shortUrl, originalUrl });
});

module.exports = router;
