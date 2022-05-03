const countryDatas = [
  {
    country: "Greece",
    ports: [
      { country: "Greece", name: "Port of Achladi" },
      { country: "Greece", name: "Port of Volos" },
      { country: "Greece", name: "Port of Piraeus" },
    ],
  },
  {
    country: "Albania",
    ports: [
      { country: "Albania", name: "Port of Durres" },
      { country: "Albania", name: "Port of Shengjin" },
    ],
  },
  {
    country: "Croatia",
    ports: [
      { country: "Croatia", name: "Port of Ploce" },
      { country: "Croatia", name: "Port of Rijeka" },
    ],
  },
  {
    country: "Slovenia",
    ports: [{ country: "Slovania", name: "Port of Koper" }],
  },
  {
    country: "Italy",
    ports: [
      { country: "Italy", name: "Port of Ancona" },
      { country: "Italy", name: "Genoa Port" },
      { country: "Italy", name: "Port of Cagliari" },
    ],
  },
  {
    country: "France",
    ports: [
      { country: "France", name: "Port of Le Havre" },
      { country: "France", name: "Port of bordeaux" },
      { country: "France", name: "Port of Marseille" },
    ],
  },
  {
    country: "Spain",
    ports: [
      { country: "Spain", name: "Port of Valencia" },
      { country: "Spain", name: "Port of A Coruna" },
      { country: "Spain", name: "Port of almeria" },
    ],
  },
  {
    country: "Portugal",
    ports: [
      { country: "Portugal", name: "Port of lisbon" },
      { country: "Portugal", name: "port of Leixoes" },
    ],
  },
  {
    country: "Belgium",
    ports: [
      { country: "Belguim", name: "port of Antwerp" },
      { country: "Belgium", name: "Port of Bruges" },
    ],
  },
  {
    country: "Netherlands",
    ports: [
      { country: "Netherlands", name: "port of rotterdam" },
      { country: "Netherlands", name: "Port of Amsterdam" },
    ],
  },
  {
    country: "Poland",
    ports: [
      { country: "Poland", name: "Port of Gdansk" },
      { country: "Poland", name: "Port of Szkuner" },
    ],
  },
  {
    country: "Germany",
    ports: [
      { country: "Germany", name: "port of hamburg" },
      { country: "Germany", name: "Port of Duisburg" },
      { country: "GErmany", name: "Port of Wilhelmshaven" },
    ],
  },
  {
    country: "Lithuania",
    ports: [{ country: "Lithuania", name: "Port of Klaipeda" }],
  },
  {
    country: "Latvia",
    ports: [
      { country: "Latvia", name: "Freeport of Riga" },
      { country: "Latvia", name: "port of  Ventspils" },
    ],
  },
  {
    country: "Estonia",
    ports: [
      { country: "Estonia", name: "Muuga Harbour" },
      { country: "Estonia", name: "Port of Tallinn" },
    ],
  },
  {
    country: "Finland",
    ports: [
      { country: "Finland", name: "Kilpilahti Harbour" },
      { country: "Finland", name: "port of Raahe" },
      { country: "Finland", name: "port of helsinki" },
    ],
  },
  {
    country: "Sweden",
    ports: [
      { country: "Sweden", name: "Ports of Stockholm" },
      { country: "Sweden", name: "Port of Goteborg " },
      { country: "Sweden", name: "Copenhagen Malmo Port" },
    ],
  },
  {
    country: "Norway",
    ports: [
      { country: "Norway", name: "Port of Bergen" },
      { country: "Norway", name: "Port of Oslo" },
    ],
  },
  {
    country: "Iceland",
    ports: [
      { country: "Iceland", name: "port of Reykjavik" },
      { country: "Iceland", name: "Port of Seydhisfjordhur" },
    ],
  },
  {
    country: "Ireland",
    ports: [
      { country: "Ireland", name: "Dublin Port" },
      { country: "Ireland", name: "Limerick Dock" },
    ],
    isIsland: true,
  },
  {
    country: "United Kingdom",
    ports: [
      { country: "United Kingdom", name: "port of liverpool" },
      { country: "United Kingdom", name: "Port of Immingham" },
      { country: "United Kingdom", name: "Port of london" },
    ],
    isIsland: true,
  },
  {
    country: "Denmark",
    ports: [
      { country: "Denmark", name: "port of Aarhus" },
      { country: "Denmark", name: "Copenhagen Malmö Port" },
      { country: "Denmark", name: "port of Aalborg" },
    ],
  },
  {
    country: "Bulgaria",
    ports: [
      { country: "Bulgaria", name: "port of varna" },
      { country: "Bulgaria", name: "Port of Bourgas" },
    ],
  },
  {
    country: "Romania",
    ports: [
      { country: "Romania", name: "Port of Constanta" },
      { country: "Romania", name: "Poarta Alba" },
    ],
  },
  {
    country: "Moldova",
    ports: [{ country: "Moldova", name: "Giurgiuleşti (Cahul) Terminal" }],
  },
  {
    country: "Ukranie",
    ports: [{ country: "Ukranie", name: "Port of Odessa" }],
  },
  {
    country: "Russia",
    ports: [
      { country: "Russia", name: "Port of Saint-Petersburg" },
      { country: "Russia", name: "Novorossiysk Commercial Sea Port" },
      { country: "Russia", name: "Port of Baltiysk" },
    ],
  },
  {
    country: "BosniaAndHerzegovina",
    ports: [{ country: "BosniaAndHerzegovina", name: "Port of Neum" }],
  },
  {
    country: "Serbia",
    ports: [{ country: "Serbia", name: "Serbia" }],
  },
  {
    country: "Hungary",
    ports: [{ country: "Hungary", name: "Port of Csepel" }],
  },
  {
    country: "Austria",
    ports: [
      { country: "Austria", name: "Port of Enns" },
      { country: "Austria", name: "Port of Vienna" },
    ],
  },
  {
    country: "Switzerland",
    ports: [{ country: "Switzerland", name: "Port of Basle" }],
  },
  {
    country: "Slovakia",
    ports: [{ country: "Slovakia", name: "Port of Bratislava" }],
  },
  {
    country: "CzechRepublic",
    ports: [
      { country: "Austria", name: "Port of Vienna" },
      { country: "Poland", name: "Port of Gdansk" },
    ],
  },
  {
    country: "Belarus",
    ports: [
      { country: "Lithuania", name: "Port of Klaipeda" },
      { country: "Latvia", name: "Freeport of Riga" },
    ],
  },
  {
    country: "NorthMacedonia",
    ports: [
      { country: "Albania", name: "Port of Durres" },
      { country: "Greece", name: "Port of Volos" },
    ],
  },
  {
    country: "Kosovo",
    ports: [{ country: "Albania", name: "Port of Shengjin" }],
  },
  {},
];

module.exports = { countryDatas };
