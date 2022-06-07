const puppeteer = require("puppeteer");
const { countryDatas } = require("./country");

function gecikmeEkle(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function alDenizVerisi(baslangic = "istanbul", bitis = "volos") {
  console.log("al deniz verisi", baslangic, bitis);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `http://ports.com/sea-route/#/?a=0&b=0&c=${
      "port of " + baslangic
    }&d=${"port of " + bitis}`;
    await page.goto(url, { timeout: 120000 });

    await page.waitForFunction(
      'document.getElementById("route-toolbox").style.display === "block"'
    );

    let element = await page.$("#route-d");

    let distance = Number(await page.evaluate((el) => el.textContent, element));

    console.log(url);
    const data = {
      link: url,
      distance,
      type: "deniz",
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
  console.log("al kara verisi", baslangic, bitis);

  const limanIceriyorMu =
    baslangic.includes("port of") || bitis.includes("port of");

  console.log(limanIceriyorMu);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `https://www.mapdevelopers.com/distance_from_to.php?&from=${baslangic}&to=${bitis}`;
    await page.goto(url, { timeout: 120000 });

    await page.waitForFunction(
      'document.getElementById("driving_status").textContent != "Driving distance: 0.0 miles , 0.0 kilometers (km) , 0 feet , 0 meters"'
    );

    let distanceElement = await page.$("#driving_status");
    let distance = stringtenSayiyaCevir(
      (await page.evaluate((el) => el.textContent, distanceElement)).split(
        ","
      )[0]
    );

    if (limanIceriyorMu && !distance) {
      //Limanı varsa ve mesafeyi bulamamışsa liman ibaresi olan port of kaldırılıyor
      baslangic = baslangic.replace("port of", "").trim();

      bitis = bitis.replace("port of", "").trim();

      const url = `https://www.mapdevelopers.com/distance_from_to.php?&from=${baslangic}&to=${bitis}`;
      await page.goto(url, { timeout: 120000 });

      await page.waitForFunction(
        'document.getElementById("driving_status").textContent != "Driving distance: 0.0 miles , 0.0 kilometers (km) , 0 feet , 0 meters"'
      );

      let distanceElement = await page.$("#driving_status");
      distance = stringtenSayiyaCevir(
        (await page.evaluate((el) => el.textContent, distanceElement)).split(
          ","
        )[0]
      );
    }

    const data = {
      link: url,
      distance: Number(distance),
      type: "kara",
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
  console.log("hangi ülkeye gidiliyor", bitis);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();

    const url = `https://www.mapdevelopers.com/what-country-am-i-in.php?address=${bitis}`;
    await page.goto(url, { timeout: 120000 });

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
  console.log("bul kara yolu bağlantısı var mı", ulkeAdi);
  return countryDatas.find(({ country }) => country == ulkeAdi).isIsland;
}

function bulUlkeninLimanlarini(ulkeAdi) {
  console.log("bul ülkenin limanlarini", ulkeAdi);
  return countryDatas.find(({ country }) => country == ulkeAdi).ports;
}

async function enYakinKaradanLimanaBul(yer, limanlar) {
  console.log("En yakin karadan limana bul", yer, limanlar);
  let karadanLimana = { link: "", distance: Number.POSITIVE_INFINITY };
  let enIyiLiman = "";

  let datas = await Promise.all(
    limanlar.map((liman) => alKaraVerisi(yer, liman.name))
  );

  datas.forEach((data, i) => {
    if (karadanLimana.distance > data.distance) {
      enIyiLiman = "port of " + limanlar[i].name;
      karadanLimana = data;
    }
  });
  return { enIyiLiman, karadanLimana };
}

async function enYakinLimandanLimanaBul(yer, limanlar) {
  let limandanLimana = { link: "", distance: Number.POSITIVE_INFINITY };
  let enIyiLiman = "";
  console.log("En yakin limandan limana bul");

  let datas = await Promise.all(
    limanlar.map((liman) => alDenizVerisi(yer, liman.name))
  );

  datas.forEach((data, i) => {
    if (limandanLimana.distance > data.distance) {
      enIyiLiman = "port of " + limanlar[i].name;
      limandanLimana = data;
    }
  });
  return { enIyiLiman, limandanLimana };
}

async function getirKombineRotalari({ baslangic, bitis }) {
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

  cozumler.push([karadanKaraya]);

  const baslangicUlkeninLimanlari = bulUlkeninLimanlarini(baslangicUlkeAdi);
  const bitisIlkeninLimanlari = bulUlkeninLimanlarini(bitisUlkeAdi);

  console.log(
    bitisIlkeninLimanlari.filter(({ country }) => country == bitisUlkeAdi)
  );
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
        console.log("baslangic yeri LİMAN olup bitis yeri LİMAN olan");

        let limandanLimana = await alDenizVerisi(baslangic, bitis);
        cozumler.push([limandanLimana]);
      } else {
        console.log("baslangic yeri KARA olup bitis yeri LİMAN olan");

        const { enIyiLiman, karadanLimana } = await enYakinKaradanLimanaBul(
          baslangic,
          baslangicUlkeninLimanlari
        );
        const limandanLimana = await alDenizVerisi(enIyiLiman, bitis);
        cozumler.push([karadanLimana, limandanLimana]);
      }
    } else {
      baslangicYeriLimanMi = baslangicUlkeninLimanlari.find(
        ({ name }) => name == baslangic
      );
      if (baslangicYeriLimanMi) {
        console.log("baslangic yeri LİMAN olup bitis yeri KARA olan");
        const { enIyiLiman, limandanLimana } = await enYakinLimandanLimanaBul(
          baslangic,
          bitisIlkeninLimanlari
        );

        const limandanKaraya = await alKaraVerisi(enIyiLiman, bitis);

        cozumler.push([limandanLimana, limandanKaraya]);
      } else {
        console.log("baslangic yeri KARA olup bitis yeri KARA olan");

        const { enIyiLiman, karadanLimana } = await enYakinKaradanLimanaBul(
          baslangic,
          baslangicUlkeninLimanlari
        );
        const { enIyiLiman: enIyiHedefLiman, limandanLimana } =
          await enYakinLimandanLimanaBul(enIyiLiman, bitisIlkeninLimanlari);

        const limandanKaraya = await alKaraVerisi(enIyiHedefLiman, bitis);

        cozumler.push([karadanLimana, limandanLimana, limandanKaraya]);
      }
    }
  } else {
    baslangicYeriLimanMi = baslangicUlkeninLimanlari.find(
      ({ name }) => name == baslangic
    );
    if (baslangicYeriLimanMi) {
      console.log(
        "baslangic yeri LİMAN olup bitis yeri KARA olan (Limansız ülke)"
      );
      const { enIyiLiman, limandanLimana } = await enYakinLimandanLimanaBul(
        baslangic,
        bitisIlkeninLimanlari
      );

      const limandanKaraya = await alKaraVerisi(enIyiLiman, bitis);

      cozumler.push([limandanLimana, limandanKaraya]);
    } else {
      console.log(
        "baslangic yeri KARA olup bitis yeri KARA olan(Limansız ülke)"
      );

      const { enIyiLiman, karadanLimana } = await enYakinKaradanLimanaBul(
        baslangic,
        baslangicUlkeninLimanlari
      );
      const { enIyiLiman: enIyiHedefLiman, limandanLimana } =
        await enYakinLimandanLimanaBul(enIyiLiman, bitisIlkeninLimanlari);

      const limandanKaraya = await alKaraVerisi(enIyiHedefLiman, bitis);

      cozumler.push([karadanLimana, limandanLimana, limandanKaraya]);
    }
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
  getirKombineRotalari,
  hangiUlkeyeGidiliyor,
};
