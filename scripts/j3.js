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

j3.addScoreJournee("4-6", "P-10", "10-P", "7-3");
j3.addScoreJournee("10-0", "P-P", "3-7", "4-6");
j3.addScoreJournee("3-7", "P-10", "10-0", "1-9");
j3.addScoreJournee("8-2", "10-P", "8-2", "P-10");
// j3.addScoreJournee("-", "-", "-", "-");
j3.getClassement();
