import { Poule, datesDepartementales } from "./matches.js";

const d2 = new Poule(
  "D2",
  "BILLY BERCLAU 5",
  "NOYEL/GODAU PPC 7",
  "LIBERCOURT CP 3",
  "BULLY LP 5",
  "DAINVILLE ASTT 6",
  "NOYELLES GODAULT TTSM 3",
  "QUIERY LA MOTTE 2",
  "CARVIN ATT 11",
);

Poule.init(Poule.getFormat(8), datesDepartementales, d2);
d2.addScoreJournee("10-4", "2-12", "8-6", "8-6");
d2.addScoreJournee("13-1", "4-10", "12-2", "4-10");
d2.addScoreJournee("13-1", "6-8", "1-13", "4-10");
// d2.addScoreJournee("-", "-", "-", "-");
d2.getClassement();
