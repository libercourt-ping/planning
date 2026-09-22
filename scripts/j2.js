import { Poule, datesJuniors } from "./matches.js";

const j2_1 = new Poule(
  "J2",
  "LABOURSE TT 1",
  "LIBERCOURT CP 1",
  "QUIERY LA MOTTE 1",
  "LABOURSE TT2",
);
const j2_2 = new Poule(
  "J2",
  "BULLY LP 1",
  "BETHUNE-B ASTT 1",
  "NOYEL/GODAU PPC 1",
  "LIBERCOURT CP 2",
  "WINGLES TT 1",
  "CARVIN ATT 1",
  "ESSARS TT 1",
  "ST LAURENT/BLANGY 1",
);

Poule.init(Poule.getFormat(4), datesJuniors, j2_1);
Poule.init(Poule.getFormat(8), datesJuniors, j2_2);
j2_1.addScoreJournee(1, ["4-5", "1-9"]);
j2_2.addScoreJournee(1, ["6-4", "6-4", "7-3", "5-5"]);
