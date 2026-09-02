import { Poule, datesDepartementales } from "./matches.js";

const d4_1 = new Poule(
  "D4",
  "NOYELLES/LENS 3",
  "QUIERY LA MOTTE 4",
  "HAISNES-HULLUCH TT 5",
  "LIBERCOURT CP 4",
  "BILLY-MONTIGNY 4",
  "NOY/GODAUL TTSM 4",
  "CARVIN ATT 14 ",
  "BIACHE TT 4",
);

const d4_2 = new Poule(
  "D4",
  "BILLY-MONTIGNY 5",
  "BILLY BERCLAU 6",
  "DAINVILLE ASTT 9",
  "ST LAUREN/BLANG 15",
  "LOISON / LENS 3",
  "FOUQUIERES/LENS 7",
  "LEFOREST TT 7",
  "LIBERCOURT CP 5",
);

const d4_3 = new Poule(
  "D4",
  "BILLY-MONTIGNY 6",
  "LIBERCOURT CP 6",
  "MAZINGARB MAEJS 8",
  "PPC TINQUEUX 2",
  "VIOLAINES TT 6",
  "PING VENDINOIS 1",
  "Wingles TT 5",
  "SAILLY LABOURSE 8",
);

Poule.init(Poule.getFormat(8), datesDepartementales, d4_1, d4_2, d4_3);
