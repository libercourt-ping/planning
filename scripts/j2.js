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
  "SAINT LAUREN/BLANG 1",
);

Poule.init(Poule.getFormat(4), datesJuniors, j2_1);
Poule.init(Poule.getFormat(8), datesJuniors, j2_2);
