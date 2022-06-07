const { countryDatas } = require("./assets/country");
const {
  alDenizVerisi,
  alKaraVerisi,
  getirKombineRotalari,
} = require("./assets/helper");

var express = require("express");
var app = express();

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
app.use(express.static(path.join(__dirname, "public")));

/* app.get("/", function (req, res) {
  res.sendFile("./public/page.html", { root: __dirname });
}); */

app.get("/", function (req, res) {
  res.sendFile("./Homage/Anasayfa.html", { root: __dirname });
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
    console.timeEnd("test");

    console.log(JSON.stringify(hesaplananVeri));
    res.end(JSON.stringify(hesaplananVeri));
  } catch (error) {
    res.end(JSON.stringify({ message: "HATALI VERİ GİRİŞİ" }));
  }
});
