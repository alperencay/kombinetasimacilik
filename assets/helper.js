const puppeteer = require("puppeteer");
const { countryDatas } = require("./country");

function gecikmeEkle(ms) {
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
    await gecikmeEkle(1000);
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
    let distance = stringtenSayiyaCevir(
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
    await gecikmeEkle(1000);
    await browser.close();
  }
}

async function hangiUlkeyeGidiliyor(bitis) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `https://www.mapdevelopers.com/what-country-am-i-in.php?address=${bitis}`;
    await page.goto(url);

    await page.waitForFunction(
      'document.getElementById("display_country").textContent != ""'
    );

    let ulkeHTMLElemani = await page.$("#display_country");
    let ulkeAdi = await page.evaluate((el) => el.textContent, ulkeHTMLElemani);

    return ulkeAdi;
  } catch (error) {
    console.error(error);
  } finally {
    await gecikmeEkle(1000);
    await browser.close();
  }
}

function bulKarayoluBaglantisiVarMi(ulkeAdi) {
  return countryDatas.find(({ country }) => country == ulkeAdi).isIsland;
}

function bulUlkeninLimanlarini(ulkeAdi) {
  console.log(ulkeAdi);
  return countryDatas.find(({ country }) => country == ulkeAdi).ports;
}

function varisLimanMi(adi) {}

function gidisLimanMi(adi) {}

function enIyiCozumuBul() {}

async function enIyiCozumuHesapla(baslangic = "istanbul", bitis = "volos") {
  const baslangicUlkeAdi = await hangiUlkeyeGidiliyor(baslangic);
  const bitisUlkeAdi = await hangiUlkeyeGidiliyor(bitis);

  const olmakMiAdaDevleti = bulKarayoluBaglantisiVarMi(bitisUlkeAdi);

  let baslangicYeriLimanMi = false;
  let bitisYeriLimanMi = false;

  const cozumler = [];
  let karadanKaraya = 0;

  karadanKaraya = !olmakMiAdaDevleti
    ? await alKaraVerisi(baslangic, bitis)
    : { link: "", distance: Number.POSITIVE_INFINITY };

  cozumler.push(karadanKaraya);

  const baslangicUlkeninLimanlari = bulUlkeninLimanlarini(baslangicUlkeAdi);
  const bitisIlkeninLimanlari = bulUlkeninLimanlarini(bitisUlkeAdi);

  const ulkeninKendiLimaniVarMi =
    bitisIlkeninLimanlari.filter(({ country }) => country == bitisUlkeAdi)
      .length > 0;

  if (ulkeninKendiLimaniVarMi) {
    bitisYeriLimanMi = bitisIlkeninLimanlari.find(({ name }) => name == bitis);

    if (bitisYeriLimanMi) {
      baslangicYeriLimanMi = baslangicUlkeninLimanlari.find(
        ({ name }) => name == baslangic
      );

      if (baslangicYeriLimanMi) {
        let limandanLimana = await alDenizVerisi(baslangic, bitis);
        cozumler.push(limandanLimana);
      } else {
        let karadanLimana = { link: "", distance: Number.POSITIVE_INFINITY };
        let enIyiLiman = "";
        console.log("BASLADI");

        let datas = await Promise.all(
          baslangicUlkeninLimanlari.map((liman) =>
            alKaraVerisi(baslangic, liman.name)
          )
        );

        datas.forEach((data, i) => {
          if (karadanLimana.distance > data.distance) {
            enIyiLiman = baslangicUlkeninLimanlari[i].name;
            karadanLimana = data;
          }
        });

        let limandanLimana = await alDenizVerisi(enIyiLiman, bitis);

        cozumler.push([karadanLimana, limandanLimana]);
      }
    }
  } else {
  }

  return cozumler;
}

function stringtenSayiyaCevir(str) {
  try {
    const match = str.match(/-?\d+\.?\d*/);
    return match ? match[0] : null;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  alDenizVerisi,
  alKaraVerisi,
  enIyiCozumuHesapla,
  hangiUlkeyeGidiliyor,
};
