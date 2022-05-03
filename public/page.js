let denizVerisiURL = `/deniz-verisi`;

let karaVerisiURL = `/kara-verisi`;

let hesaplamaURL = `/rota-hesapla`;

var rotalar = [];
/* var sahteRotalar = [
  [
    {
      link: "https://www.mapdevelopers.com/distance_from_to.php?&from=ankara&to=berlin",
      distance: 1636.89,
      type: "kara",
    },
  ],
  [
    {
      link: "https://www.mapdevelopers.com/distance_from_to.php?&from=ankara&to=istanbul",
      distance: 282.68,
      type: "kara",
    },
    {
      link: "http://ports.com/sea-route/#/?a=0&b=0&c=port of port of istanbul&d=port of duisburg",
      distance: 3837,
      type: "deniz",
    },
    {
      link: "https://www.mapdevelopers.com/distance_from_to.php?&from=port of duisburg&to=berlin",
      distance: 340.16,
      type: "kara",
    },
  ],
];
 */
$("#sonuc-alan").empty();

function haritaYukle(rotaBirimi) {
  let id = `rota-${rotaBirimi.id}`;
  let harita = document.createElement("iframe");

  harita.width = "1920";
  harita.height = "1080";
  harita.onload =
    rotaBirimi.type == "deniz"
      ? verErisimDenizHaritasi("#" + id)
      : verErisimKaraHaritasi("#" + id);
  harita.src = rotaBirimi.link;

  document.getElementById(id).appendChild(harita);
}

function alTipineGöreSinifAdi(tip) {
  let sinifAdi = "";
  switch (tip) {
    case "kara": {
      sinifAdi = "kara-haritasi";
      break;
    }
    case "deniz": {
      sinifAdi = "deniz-haritasi";
      break;
    }
    default:
      break;
  }
  return sinifAdi;
}

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function verErisimDenizHaritasi(selector) {
  setTimeout(() => {
    $(selector).removeClass("d-none");
    $(selector).scrollTop(390);
    $(selector).scrollLeft(760);
    $(selector).addClass("overflow-hidden");
  }, 1000);
}

function verErisimKaraHaritasi(selector) {
  setTimeout(() => {
    $(selector).removeClass("d-none");
    $(selector).scrollTop(340);
    $(selector).scrollLeft(175);
    $(selector).addClass("overflow-hidden");
  }, 1000);
}

function rotalariOlustur(rotaVerileri) {
  $("#sonuc-alan").empty();
  let rotaIndex = 0;

  rotaVerileri.forEach((rota) => {
    const rotaGrubu = document.createElement("div");
    rotaGrubu.className =
      "rota-grup col-12 d-flex align-items-center justify-content-center flex-wrap";

    rota.map((rotaBirimi) => {
      rotaBirimi.id = ++rotaIndex;

      let sinifAdi = alTipineGöreSinifAdi(rotaBirimi.type);
      let htmlMetni = `
    <div class="rota" class="h-100 d-flex flex-column align-items-center justify-content-center">
      <div class="${sinifAdi} d-none" id="rota-${rotaIndex}"></div>
      <h1 class="rota-mesafe">${rotaBirimi.distance}</h1>  
    </div>`;
      $(rotaGrubu).append(htmlMetni);
    });

    $("#sonuc-alan").append(rotaGrubu);
  });

  rotaVerileri.forEach((rota) => {
    rota.forEach((rotaBirimi) => {
      haritaYukle(rotaBirimi);
    });
  });
}

$("#btn-hesapla").click(() => {
  $("#deniz-haritasi").addClass("d-none");
  $("#deniz-mesafe").text("####");
  $("#kara-haritasi").addClass("d-none");
  $("#kara-mesafe").text("####");

  postData(hesaplamaURL, {
    baslangic: $("#baslangicKonum").val(),
    bitis: $("#bitisKonum").val(),
  })
    .then((response) => {
      // handle the response
      console.log(response.data);
      rotalariOlustur(response.data);
      /*   const { link, distance } = response.data;

      let harita = document.createElement("iframe");

      harita.id = "deniz-iframe";
      harita.width = "1920";
      harita.height = "1080";
      harita.onload = verErisimDenizHaritasi;
      harita.src = link;
      $("#deniz-haritasi").empty();
      $("#deniz-mesafe").text(distance);

      document.getElementById("deniz-haritasi").appendChild(harita); */
    })
    .catch((error) => {
      console.trace(error);
      // handle the error
    });
});

/* $(document).ready(() => {
  //Loader örneği
  console.log("start");
  console.log($("#progress-statue"));

  let simdikiDeger = 0;

  let loader = setInterval(() => {
    simdikiDeger++;
    $("#progress-statue").attr("aria-valuenow", simdikiDeger);
    $("#progress-statue").css({ width: `${simdikiDeger}%` });
    $("#progress-statue").text(`${simdikiDeger}%`);
    if (simdikiDeger >= 100) {
      clearInterval(loader);
    }
  }, 50);
});
 */
