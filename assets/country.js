const countryDatas = [
  {
    country: "Turkey",
    ports: [
      {
        country: "Turkey",
        name: "istanbul",
      },
      {
        country: "Turkey",
        name: "izmir",
      },
      {
        country: "Turkey",
        name: "mersin",
      },
    ],
  },
  {
    country: "Greece",
    ports: [
      {
        country: "Greece",
        name: "achladi",
      },
      {
        country: "Greece",
        name: "volos",
      },
      {
        country: "Greece",
        name: "piraeus",
      },
    ],
  },
  {
    country: "Albania",
    ports: [
      {
        country: "Albania",
        name: "durres",
      },
      {
        country: "Albania",
        name: "shengjin",
      },
    ],
  },
  {
    country: "Croatia",
    ports: [
      {
        country: "Croatia",
        name: "ploce",
      },
      {
        country: "Croatia",
        name: "rijeka",
      },
    ],
  },
  {
    country: "Slovenia",
    ports: [
      {
        country: "Slovania",
        name: "koper",
      },
    ],
  },
  {
    country: "Italy",
    ports: [
      {
        country: "Italy",
        name: "ancona",
      },
      {
        country: "Italy",
        name: "genoa",
      },
      {
        country: "Italy",
        name: "cagliari",
      },
    ],
  },
  {
    country: "France",
    ports: [
      {
        country: "France",
        name: "le havre",
      },
      {
        country: "France",
        name: "bordeaux",
      },
      {
        country: "France",
        name: "marseille",
      },
    ],
  },
  {
    country: "Spain",
    ports: [
      {
        country: "Spain",
        name: "valencia",
      },
      {
        country: "Spain",
        name: "a coruna",
      },
      {
        country: "Spain",
        name: "almeria",
      },
    ],
  },
  {
    country: "Portugal",
    ports: [
      {
        country: "Portugal",
        name: "lisbon",
      },
      {
        country: "Portugal",
        name: "leixoes",
      },
    ],
  },
  {
    country: "Belgium",
    ports: [
      {
        country: "Belguim",
        name: "antwerp",
      },
      {
        country: "Belgium",
        name: "bruges",
      },
    ],
  },
  {
    country: "Netherlands",
    ports: [
      {
        country: "Netherlands",
        name: "rotterdam",
      },
      {
        country: "Netherlands",
        name: "amsterdam",
      },
    ],
  },
  {
    country: "Poland",
    ports: [
      {
        country: "Poland",
        name: "gdansk",
      },
      {
        country: "Poland",
        name: "szkuner",
      },
    ],
  },
  {
    country: "Germany",
    ports: [
      {
        country: "Germany",
        name: "hamburg",
      },
      {
        country: "Germany",
        name: "duisburg",
      },
      {
        country: "Germany",
        name: "wilhelmshaven",
      },
    ],
  },
  {
    country: "Lithuania",
    ports: [
      {
        country: "Lithuania",
        name: "klaipeda",
      },
    ],
  },
  {
    country: "Latvia",
    ports: [
      {
        country: "Latvia",
        name: "freeriga",
      },
      {
        country: "Latvia",
        name: "ventspils",
      },
    ],
  },
  {
    country: "Estonia",
    ports: [
      {
        country: "Estonia",
        name: "muuga harbour",
      },
      {
        country: "Estonia",
        name: "tallinn",
      },
    ],
  },
  {
    country: "Finland",
    ports: [
      {
        country: "Finland",
        name: "kilpilahti harbour",
      },
      {
        country: "Finland",
        name: "raahe",
      },
      {
        country: "Finland",
        name: "helsinki",
      },
    ],
  },
  {
    country: "Sweden",
    ports: [
      {
        country: "Sweden",
        name: "stockholm",
      },
      {
        country: "Sweden",
        name: "goteborg",
      },
      {
        country: "Sweden",
        name: "copenhagen malmo port",
      },
    ],
  },
  {
    country: "Norway",
    ports: [
      {
        country: "Norway",
        name: "bergen",
      },
      {
        country: "Norway",
        name: "oslo",
      },
    ],
  },
  {
    country: "Iceland",
    ports: [
      {
        country: "Iceland",
        name: "reykjavik",
      },
      {
        country: "Iceland",
        name: "seydhisfjordhur",
      },
    ],
  },
  {
    country: "Ireland",
    isIsland: true,
    ports: [
      {
        country: "Ireland",
        name: "dublin port",
      },
      {
        country: "Ireland",
        name: "limerick dock",
      },
    ],
  },
  {
    country: "United Kingdom",
    isIsland: true,
    ports: [
      {
        country: "United Kingdom",
        name: "liverpool",
      },
      {
        country: "United Kingdom",
        name: "immingham",
      },
      {
        country: "United Kingdom",
        name: "london",
      },
    ],
  },
  {
    country: "Denmark",
    ports: [
      {
        country: "Denmark",
        name: "aarhus",
      },
      {
        country: "Denmark",
        name: "copenhagen malmö port",
      },
      {
        country: "Denmark",
        name: "aalborg",
      },
    ],
  },
  {
    country: "Bulgaria",
    ports: [
      {
        country: "Bulgaria",
        name: "varna",
      },
      {
        country: "Bulgaria",
        name: "bourgas",
      },
    ],
  },
  {
    country: "Romania",
    ports: [
      {
        country: "Romania",
        name: "constanta",
      },
      {
        country: "Romania",
        name: "alba",
      },
    ],
  },
  {
    country: "Moldova",
    ports: [
      {
        country: "Moldova",
        name: "giurgiuleşti (cahul) terminal",
      },
    ],
  },
  {
    country: "Ukranie",
    ports: [
      {
        country: "Ukranie",
        name: "odessa",
      },
    ],
  },
  {
    country: "Russia",
    ports: [
      {
        country: "Russia",
        name: "saint-petersburg",
      },
      {
        country: "Russia",
        name: "novorossiysk",
      },
      {
        country: "Russia",
        name: "baltiysk",
      },
    ],
  },
  {
    country: "Bosnia and Herzegovina",
    ports: [
      {
        country: "Bosnia and Herzegovina",
        name: "neum",
      },
    ],
  },
  {
    country: "Serbia",
    ports: [
      {
        country: "Serbia",
        name: "belgrade",
      },
    ],
  },
  {
    country: "Hungary",
    ports: [
      {
        country: "Hungary",
        name: "csepel",
      },
    ],
  },
  {
    country: "Austria",
    ports: [
      {
        country: "Austria",
        name: "enns",
      },
      {
        country: "Austria",
        name: "vienna",
      },
    ],
  },
  {
    country: "Switzerland",
    ports: [
      {
        country: "Switzerland",
        name: "basle",
      },
    ],
  },
  {
    country: "Slovakia",
    ports: [
      {
        country: "Slovakia",
        name: "bratislava",
      },
    ],
  },
  {
    country: "Czechia",
    ports: [
      {
        country: "Austria",
        name: "vienna",
      },
      {
        country: "Poland",
        name: "gdansk",
      },
    ],
  },
  {
    country: "Belarus",
    ports: [
      {
        country: "Lithuania",
        name: "klaipeda",
      },
      {
        country: "Latvia",
        name: "freeriga",
      },
    ],
  },
  {
    country: "North Macedonia",
    ports: [
      {
        country: "Albania",
        name: "durres",
      },
      {
        country: "Greece",
        name: "volos",
      },
    ],
  },
  {
    country: "Kosovo",
    ports: [
      {
        country: "Albania",
        name: "shengjin",
      },
    ],
  },
];

module.exports = { countryDatas };
