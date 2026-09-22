import { datesJuniors, Poule } from "./matches.js";

const j3 = new Poule(
  "J3",
  "LIBERCOURT CP 3",
  "NOYEL/GODAU PPC 2",
  "HAISNES-HULLUCH 2",
  "STE CATHERINE 1",
  "AVION TT 1",
  "LIÉVIN USA TT 2",
  "CARVIN ATT 2",
  "LOISON/LENS 1",
);

Poule.init(Poule.getFormat(8), datesJuniors, j3);
j3.addScoreJournee(1, ["4-6", "2-8", "10-0", "7-3"]);
