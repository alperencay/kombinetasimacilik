const { countryDatas } = require("./assets/country");
const {
  alDenizVerisi,
  alKaraVerisi,
  getirKombineRotalari,
} = require("./assets/helper");

var express = require("express");
var app = express();

var http = express();

app.enable("trust proxy");
app.use((req, res, next) => {
  !req.secure ? next() : res.redirect("http://" + req.headers.host + req.url);
});

let locker = false;

let requests = [];

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
app.use("/rota-sonuc", express.static("public"));

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
    const { baslangic, bitis, eposta } = req.body;

    requests.push({ baslangic, bitis, eposta });

    if (requests.length == 1) createControlInterval();
    res.sendStatus(200);
  } catch (error) {
    res.end(JSON.stringify({ message: "HATALI VERİ GİRİŞİ" }));
  }
});

let controlIntervalId = null;

app.get("/disable-interval", function (req, res) {
  clearInterval(controlIntervalId);
  res.end("OK");
});

app.get("/enable-interval", function (req, res) {
  controlIntervalId = createControlInterval();
  res.end("OK");
});

function createControlInterval() {
  return setInterval(async function () {
    console.log(locker);
    console.log(requests.length);

    if (requests.length == 0) {
      clearInterval(this);
      return;
    }

    if (locker) {
      return;
    }

    console.log("kuyruktan cikti");
    locker = true;
    try {
      const { baslangic, bitis, eposta } = requests[0];
      const hesaplananVeri = {
        data: await getirKombineRotalari({
          baslangic,
          bitis,
        }),
      };

      var mailOptions = {
        from: "kombinerotahesaplayici@gmail.com",
        to: eposta,
        subject: "Kombine Taşımacılık Harita Linki",
        text: `http://kombine-tasimacilik-v1.glitch.me/rota-sonuc?data=${encodeURIComponent(
          JSON.stringify(hesaplananVeri)
        )}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      requests.shift();
      locker = false;
    }
  }, 1 * 10000);
}

app.get("/rota-sonuc", function (req, res) {
  res.sendFile("./public/page.html", { root: __dirname });
});
