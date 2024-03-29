let denizVerisiURL = `/deniz-verisi`;

let karaVerisiURL = `/kara-verisi`;

let hesaplamaURL = `/rota-hesapla`;

var rotalar = [];
var sahteRotalar = [
  [
    {
      link: "https://www.mapdevelopers.com/distance_from_to.php?&from=ankara&to=hamburg",
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
      link: "https://www.mapdevelopers.com/distance_from_to.php?&from=port of duisburg&to=hamburg",
      distance: 340.16,
      type: "kara",
    },
  ],
];

console.log(sahteRotalar);

const rotaParametreleri = GetURLParameter("data");

if(rotaParametreleri) {
  $(".girdi-alani").addClass("d-none");
  $(".hesaplama-alan").addClass("d-none");
  rotalariOlustur(JSON.parse(decodeURIComponent(rotaParametreleri)).data)
}
  
else rotalariOlustur(sahteRotalar);



function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
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
  }, 3000);
}

function verErisimKaraHaritasi(selector) {
  setTimeout(() => {
    $(selector).removeClass("d-none");
    $(selector).scrollTop(340);
    $(selector).scrollLeft(175);
    $(selector).addClass("overflow-hidden");
  }, 3000);
}

function rotalariOlustur(rotaVerileri) {
  try {
    console.log(rotaVerileri)
    $("#sonuc-alan").empty();
    let rotaIndex = 0;

    rotaVerileri.forEach((rota) => {
      const rotaGrubu = document.createElement("div");
      rotaGrubu.className =
        "rota-grup col-12 d-flex align-items-center justify-content-center flex-wrap overflow-hidden";

      rota.map((rotaBirimi) => {
        console.log(rotaBirimi)
        rotaBirimi.id = ++rotaIndex;

        let sinifAdi = alTipineGöreSinifAdi(rotaBirimi.type);
        let htmlMetni = `
        <div class="rota my-4 my-lg-auto" class="h-100 d-flex flex-column align-items-center justify-content-center">
          <div class="${sinifAdi} d-none" id="rota-${rotaIndex}"></div>
          <h1 class="rota-mesafe text-center mt-4">${rotaBirimi.distance} Mil</h1>  
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
  } catch (e) {
    console.log(e);
  }
}

$("#btn-hesapla").click(() => {
  alert("İsteğiniz alınmıştır, hesaplamalar yapıldıktan sonra e-postanıza verilen link üzerinden haritalara istediğiniz zaman ulaşabilirsiniz.")
  postData(hesaplamaURL, {
    baslangic: $("#baslangicKonum").val(),
    bitis: $("#bitisKonum").val(),
    eposta : $("#epostaGirdi").val()
  })
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
