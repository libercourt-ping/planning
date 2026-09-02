import { datesJuniors, Poule } from "./matches.js";

const j3 = new Poule(
  "J3",
  "LIBERCOURT CP 3",
  "NOYEL/GODAU PPC 2",
  "HAISNES-HULLUCH 2",
  "STE CATHERINE 1",
  "AVION TT 1",
  "LIEVIN USA TT 2",
  "CARVIN ATT 2",
  "LOISON/LENS 1",
);

Poule.init(Poule.getFormat(8), datesJuniors, j3);
