const { countryDatas } = require("./assets/country");
const {
  alDenizVerisi,
  alKaraVerisi,
  getirKombineRotalari,
} = require("./assets/helper");

var express = require("express");
var app = express();

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kombinerotahesaplayici@gmail.com",
    pass: "trnnsgqtmeqhueyi",
  },
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// push them above the router middleware!

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname)));
app.use('/rota-sonuc', express.static('public'))

/* app.get("/", function (req, res) {
  res.sendFile("./public/page.html", { root: __dirname });
}); */

app.get("/", function (req, res) {
  res.sendFile("./Homepage/Anasayfa.html", { root: __dirname });
});

app.post("/deniz-verisi", async function (req, res) {
  try {
    const { baslangicAdi, bitisAdi } = req.body;

    const hesaplananVeri = {
      data: await alDenizVerisi(baslangicAdi, bitisAdi),
    };

    res.end(JSON.stringify(hesaplananVeri));
  } catch (error) {
    res.end(JSON.stringify({ message: "HATALI VERİ GİRİŞİ" }));
  }
});

app.post("/kara-verisi", async function (req, res) {
  try {
    const { baslangicAdi, bitisAdi } = req.body;

    const hesaplananVeri = { data: await alKaraVerisi(baslangicAdi, bitisAdi) };

    res.end(JSON.stringify(hesaplananVeri));
  } catch (error) {
    res.end(JSON.stringify({ message: "HATALI VERİ GİRİŞİ" }));
  }
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

app.post("/rota-hesapla", async function (req, res) {
  try {
    const { baslangic, bitis } = req.body;

    console.log("basladi");
    console.time("test");
    const hesaplananVeri = {
      data: await getirKombineRotalari({
        baslangic,
        bitis,
      }),
    };

    var mailOptions = {
      from: "kombinerotahesaplayici@gmail.com",
      to: "napcan4827@gmail.com, alperenlider@gmail.com",
      subject: "Sending Email using Node.js",
      text: `http://probable-near-gastonia.glitch.me/rota-sonuc?data=${encodeURIComponent(JSON.stringify(hesaplananVeri))}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.timeEnd("test");

    console.log(JSON.stringify(hesaplananVeri));
    res.end(JSON.stringify(hesaplananVeri));
  } catch (error) {
    res.end(JSON.stringify({ message: "HATALI VERİ GİRİŞİ" }));
  }
});

app.get("/rota-sonuc", function (req, res) {
  console.log(__dirname)
  res.sendFile("./public/page.html", { root: __dirname });
});
