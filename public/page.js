let denizVerisiURL = `/deniz-verisi`

let karaVerisiURL = `/kara-verisi`
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

function verErisimDenizHaritasi() {
  $("#deniz-haritasi").removeClass("d-none");
  $("#deniz-haritasi").scrollTop(390);
  $("#deniz-haritasi").scrollLeft(760);
  $("#deniz-haritasi").addClass("overflow-hidden");
}

function verErisimKaraHaritasi() {
  $("#kara-haritasi").removeClass("d-none");
  $("#kara-haritasi").scrollTop(235);
  $("#kara-haritasi").addClass("overflow-hidden");
}

$("#btn-hesapla").click(() => {
  $("#deniz-haritasi").addClass("d-none");
  $("#deniz-mesafe").text("####");
  $("#kara-haritasi").addClass("d-none");
  $("#kara-mesafe").text("####");

  postData(denizVerisiURL, {
    baslangicAdi: $("#baslangicKonum").val(),
    bitisAdi: $("#bitisKonum").val(),
  })
    .then((response) => {
      // handle the response
      console.log(response.data)
      const { link, distance } = response.data;

      let harita = document.createElement("iframe");

      harita.id = "deniz-iframe";
      harita.width = "1920";
      harita.height = "1080";
      harita.onload = verErisimDenizHaritasi;
      harita.src = link;
      $("#deniz-haritasi").empty();
      $("#deniz-mesafe").text(distance);

      document.getElementById("deniz-haritasi").appendChild(harita);
    })
    .catch((error) => {
      console.log(error);
      // handle the error
    });

  postData(karaVerisiURL, {
    baslangicAdi: $("#baslangicKonum").val(),
    bitisAdi: $("#bitisKonum").val(),
  })
    .then((response) => {
      // handle the response

      console.log(response.data)
      let { link, distance } = response.data;
      console.log(link, distance);
      let harita = document.createElement("iframe");

      harita.id = "kara-iframe";
      harita.width = "768";
      harita.height = "1024";
      harita.onload = verErisimKaraHaritasi;
      harita.src = link;
      $("#kara-haritasi").empty();
      $("#kara-mesafe").text(distance);

      document.getElementById("kara-haritasi").appendChild(harita);
    })
    .catch((error) => {
      console.log(error);
      // handle the error
    });
});
