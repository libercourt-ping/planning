import { Poule, datesDepartementales } from "./matches.js";

const d4_1 = new Poule(
  "D4",
  "NOYELLES/LENS 3",
  "/",
  "HAISNES-HULLUCH TT 5",
  "LIBERCOURT CP 4",
  "BILLY-MONTIGNY 4",
  "NOY/GODAUL TTSM 4",
  "CARVIN ATT 14",
  "BIACHE TT 4",
);

const d4_2 = new Poule(
  "D4",
  "BILLY-MONTIGNY 5",
  "BILLY BERCLAU 6",
  "DAINVILLE ASTT 9",
  "ST LAURENT/BLANGY 15",
  "LOISON/LENS 3",
  "FOUQUIÈRES/LENS 7",
  "LEFOREST TT 7",
  "LIBERCOURT CP 5",
);

Poule.init(Poule.getFormat(8), datesDepartementales, d4_1, d4_2);
d4_1.addScoreJournee(1, ["10-4", "/", "11-3", "0-14"]);
d4_2.addScoreJournee(1, ["8-6", "5-9", "3-11", "14-0"]);
