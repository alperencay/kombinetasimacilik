const puppeteer = require("puppeteer");

var express = require("express");
var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


let chromiumPath =
  "./node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux";

var fs = require("fs");
var files = fs.readdirSync(
  "./node_modules/puppeteer/.local-chromium/linux-970485/chrome-linux"
);

// push them above the router middleware!

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile("./public/page.html", { root: __dirname });
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
/* (async () => {
  alDenizVerisi();
  alKaraVerisi();
})(); */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function alDenizVerisi(baslangic = "istanbul", bitis = "volos") {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `http://ports.com/sea-route/#/?a=0&b=0&c=${baslangic}&d=${bitis}`;
    await page.goto(url);

    await page.waitForFunction(
      'document.getElementById("route-toolbox").style.display === "block"'
    );

    let element = await page.$("#route-d");

    let distance = await page.evaluate((el) => el.textContent, element);

    console.log(url);
    const data = {
      link: url,
      distance,
    };
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    await sleep(1000);
    await browser.close();
  }
}

async function alKaraVerisi(baslangic = "istanbul", bitis = "volos") {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `https://www.mapdevelopers.com/distance_from_to.php?&from=${baslangic}&to=${bitis}`;
    await page.goto(url);

    await page.waitForFunction(
      'document.getElementById("driving_status").textContent != "Driving distance: 0.0 miles , 0.0 kilometers (km) , 0 feet , 0 meters"'
    );

    let distanceElement = await page.$("#driving_status");
    let distance = parseNumberFromString(
      (await page.evaluate((el) => el.textContent, distanceElement)).split(
        ","
      )[0]
    );

    const data = {
      link: url,
      distance,
    };

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    await sleep(1000);
    await browser.close();
  }
}

function parseNumberFromString(str) {
  try {
    const match = str.match(/-?\d+\.?\d*/);
    return match ? match[0] : null;
  } catch (error) {
    console.log(error);
  }
}