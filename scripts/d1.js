import { Poule, datesDepartementales } from "./matches.js";

const d1_1 = new Poule(
  "D1",
  "LIEVIN USA TT 5",
  "ARRAS TT 3",
  "VIOLAINES TT 1",
  "PONT A VENDIN 1",
  "MEURCHIN ESPOIR 4",
  "DUISANS ES 1",
  "TILLOY LES MOFFLAINES TT 4",
  "LIBERCOURT CP 1",
);

const d1_2 = new Poule(
  "D1",
  "BIENVILLERS AP 1",
  "NOYEL/GODAU PPC 5",
  "LEFOREST TT 4",
  "LIBERCOURT CP 2",
  "LOISON / LENS 1",
  "LOOS EN GOHELLE TT 2",
  "WINGLES TT 2",
  "ARLEUX/GOHELLE 2",
);

Poule.init(Poule.getFormat(8), datesDepartementales, d1_1, d1_2);
