export class Match {
  /**
   *
   * @param {string} date
   * @param {string} equipe1
   * @param {string} equipe2
   * @param {boolean} domicile
   * @param {boolean} exterieur
   * @param {number} indexMark
   * @param {boolean} isExemptMatch
   */
  constructor(
    date,
    equipe1,
    equipe2,
    domicile,
    exterieur,
    indexMark,
    isExemptMatch,
  ) {
    this.date = date;
    this.equipe1 = equipe1;
    this.equipe2 = equipe2;
    this.domicile = domicile;
    this.exterieur = exterieur;
    this.indexMark = indexMark;
    this.isExemptMatch = isExemptMatch;
  }

  /**
   *
   * @param {string} score
   */
  addScore(score1, score2) {
    this.score1 = score1;
    this.score2 = score2;
  }
}

export class Poule {
  /**
   * @type {string[]}
   */
  static ligues = [];
  /**
   *
   * @param {string} ligue
   * @param {string[]} clubs
   */
  constructor(ligue, ...clubs) {
    this.ligue = ligue;
    this.clubs = clubs.map((el) => ({ name: el, score: 0 }));
    this.name = clubs.filter((el) => el.toUpperCase().includes("LIBERCOURT"));
    /**
     * @type { Match[] }
     */
    this.allMatchs = [];
    this.icons = {
      home: initSvg("icons/home.svg"),
      outdoor: initSvg("icons/outdoor.svg"),
    };
  }

  static getFormat(nbEquipes) {
    if (nbEquipes === 8) {
      return [
        "0-7,1-6,2-5,3-4",
        "6-0,5-1,4-2,7-3",
        "0-5,1-4,2-3,7-6",
        "4-0,3-1,2-7,5-6",
        "0-3,1-2,6-4,7-5",
        "2-0,1-7,3-6,4-5",
        "0-1,6-2,5-3,7-4",
      ];
    }
    if (nbEquipes === 4) {
      return ["0-3,1-2", "2-0,3-1", "0-1,2-3", "1-0,2-3", "0-2,1-3", "3-0,2-1"];
    }
    return null;
  }

  getClassement() {
    if (!this.allMatchs.some((el) => el.score1 != null)) {
      return;
    }
    const destAfter = document.getElementById("title-" + this.valueTitle);
    const recap = document.createElement("div");
    recap.classList.add(
      "flex",
      "flex-col",
      "w-[calc(100%-1rem)]",
      "min-h-2",
      "gap-2",
      "m-2",
      "p-2",
      "recap",
      "rounded-lg",
    );
    destAfter.insertAdjacentElement("afterend", recap);
    this.allMatchs.forEach((match) => {
      const score1 = match.score1;
      const score2 = match.score2;
      if (score1 != null && score2 != null) {
        const club1 = this.clubs.find((el) => el.name === match.equipe1);
        const club2 = this.clubs.find((el) => el.name === match.equipe2);
        if (score1 < score2) {
          club1.score += 1;
          club2.score += 3;
        } else if (score1 > score2) {
          club1.score += 3;
          club2.score += 1;
        } else if (score1 === score2) {
          club1.score += 2;
          club2.score += 2;
        }
      }
    });
    const title = document.createElement("span");
    title.textContent = "Classement";
    title.classList.add(
      "py-2",
      "mb-2",
      "text-center",
      "w-full",
      "uppercase",
      "font-semibold",
    );
    recap.appendChild(title);
    const sortedClubs = [...this.clubs]
      .filter((el) => el.name !== "/")
      .sort((a, b) => b.score - a.score);

    let lastIndex = 0;
    sortedClubs.forEach((el, index, arr) => {
      const divInfo = document.createElement("div");
      const spanSpace = document.createElement("span");
      spanSpace.classList.add("flex-1");
      divInfo.classList.add("flex", "w-full", "gap-4", "items-center");
      const numero = document.createElement("span");
      numero.classList.add(
        "px-2",
        "py-0.5",
        "rounded-lg",
        "numero",
        "text-sm",
        "font-bold",
      );
      const team = document.createElement("span");
      team.classList.add("text-sm", "capitalize");
      if (el.name.toUpperCase().includes("LIBERCOURT")) {
        team.classList.add("bg-amber-200", "text-[#333]", "p-1", "rounded-lg");
      }
      const points = document.createElement("span");
      team.textContent = el.name.toLowerCase();
      const previous = arr[index - 1];
      if (!previous) {
        lastIndex += 1;
      } else if (previous.score !== el.score) {
        lastIndex += 1;
      }
      numero.textContent = lastIndex;
      points.textContent = el.score + " points";
      points.classList.add("text-sm", "italic", "underline")
      divInfo.appendChild(numero);
      divInfo.appendChild(team);
      divInfo.appendChild(spanSpace);
      divInfo.appendChild(points);
      recap.appendChild(divInfo);
    });
  }

  /**
   *
   * @param {number} journee
   * @param {string[]} scores
   */
  addScoreJournee(journee, ...scores) {
    scores.forEach((el, index) => {
      if (el === "/") {
        return;
      }
      const indexMatch = (journee - 1) * scores.length + index;
      const divTeam = document.getElementById(
        `${this.ligue}-${this.name}_journey_${journee}_${indexMatch}`,
      );

      divTeam.classList.add("relative");
      const divScore = document.createElement("div");
      divScore.classList.add(
        "flex",
        "h-full",
        "absolute",
        "top-0",
        "-right-14",
        "ml-4",
      );

      const scoresMap = el.split("-").map((el) => parseInt(el));
      const [scoreA, scoreB] = scoresMap;
      this.allMatchs[indexMatch].addScore(scoreA, scoreB);

      const spanScore = document.createElement("span");
      spanScore.classList.add(
        "font-bold",
        "text-[10px]",
        "my-auto",
        "text-yellow-300",
        "w-fit",
        "px-2",
        "inline-flex",
        "h-fit",
        "rounded-lg",
        "bg-gray-500",
      );
      spanScore.textContent = `${scoreA}\u00A0\u00A0-\u00A0\u00A0${scoreB}`;
      divScore.appendChild(spanScore);
      divTeam.insertAdjacentElement("beforeend", divScore);

      // Ajout des couleurs en fonction de la victoire ou non
      const children = Array.from(divTeam.children);
      const [childA, _, childB] = children;

      const colors = {
        WIN: "text-green-600",
        LOSE: "text-red-600",
        EQUAL: "text-gray-600",
      };
      if (scoreA > scoreB) {
        childA.classList.add(colors.WIN);
        childB.classList.add(colors.LOSE);
      } else if (scoreA < scoreB) {
        childA.classList.add(colors.LOSE);
        childB.classList.add(colors.WIN);
      } else {
        childA.classList.add(colors.EQUAL, "italic");
        childB.classList.add(colors.EQUAL, "italic");
      }
    });
  }

  addMatch(date, index1, index2) {
    /**
     * @type {string[]}
     */
    const clubs = [this.clubs[index1].name, this.clubs[index2].name];
    const isInteresting = clubs.findIndex((el) =>
      el.toUpperCase().includes("LIBERCOURT"),
    );
    const domicile = clubs[0].toUpperCase().includes("LIBERCOURT");
    const exterieur = clubs[1].toUpperCase().includes("LIBERCOURT");
    const isExemptMatch = clubs.includes("/");
    this.allMatchs.push(
      new Match(
        date,
        clubs[0],
        clubs[1],
        domicile,
        exterieur,
        isInteresting,
        isExemptMatch,
      ),
    );
  }

  /**
   *
   * @param {string[]} journees
   * @param  {Poule[]} ligues
   */
  static init(journees, dates, ...ligues) {
    journees.forEach((el, index) => {
      const data = el.split(",");
      data.forEach((d) => {
        const teams = d.split("-");
        const index1 = parseInt(teams[0]);
        const index2 = parseInt(teams[1]);
        ligues.forEach((l) => {
          l.addMatch(dates[index], index1, index2);
        });
      });
    });
    ligues.forEach((l) => {
      l.display();
    });
  }

  /**
   * Permet de rajouter une majuscule sur les initiales de chaque mot
   * @param {string} value
   */
  static capitalize(value) {
    return value
      .trim()
      .toLowerCase()
      .split(" ")
      .map((el) => el[0].toUpperCase() + el.substring(1))
      .join(" ");
  }

  display() {
    const div = document.createElement("div");
    div.classList.add(
      "ligues",
      "flex",
      "flex-col",
      "border",
      "border-solid",
      "rounded-xl",
      "h-fit",
    );
    const title = document.createElement("span");
    this.valueTitle = this.ligue + " - " + this.name;
    div.id = this.valueTitle;
    Poule.ligues.push(this.valueTitle);
    title.textContent = this.valueTitle;
    title.id = "title-" + this.valueTitle;
    title.classList.add(
      "text-center",
      "border-b",
      "border-b-solid",
      "rounded-2xl",
    );
    const ligues = ["D1", "D2", "D3", "D4", "D5", "J2", "J3"];
    const valueCss = [
      "bg-red-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-orange-500",
      "bg-indigo-500",
    ];
    ligues.forEach((el, index) => {
      if (this.valueTitle.startsWith(el)) {
        title.classList.add(valueCss[index]);
      }
    });
    div.appendChild(title);
    document.getElementById("grille").appendChild(div);
    const dealedDate = [];

    this.allMatchs.forEach((el, index, arr) => {
      if (!dealedDate.includes(el.date)) {
        const date = document.createElement("span");
        date.textContent = el.date;
        date.classList.add(
          "text-center",
          "mb-3",
          "text-sm",
          "title-journey",
          "italic",
        );
        div.appendChild(date);
        dealedDate.push(el.date);
        if (index % (this.clubs.length / 2) === 0 && index > 0) {
          date.classList.add(
            "my-1",
            "border-t",
            "border-t-solid",
            "border-black",
          );
        }
      }
      const divTeam = document.createElement("div");
      const nbJournee = parseInt(index / (this.clubs.length / 2));

      divTeam.id = `${this.ligue}-${this.name}_journey_${nbJournee + 1}_${index}`;
      divTeam.classList.add(
        "lg:ml-[10%]",
        "ml-2",
        "px-1",
        "text-xs",
        "w-fit",
        "flex",
        "items-center",
      );

      if (el.isExemptMatch) {
        const span = document.createElement("span");
        span.textContent =
          "Aucun match pour " +
          (el.equipe1 === "/"
            ? Poule.capitalize(el.equipe2)
            : Poule.capitalize(el.equipe1)) +
          " (exempté)";
        span.classList.add("italic", "font-semibold", "text-amber-700");
        divTeam.appendChild(span);
        div.appendChild(divTeam);
      } else {
        const spanTeam1 = document.createElement("span");
        spanTeam1.textContent = Poule.capitalize(el.equipe1);

        const spanSpace = document.createElement("span");
        spanSpace.textContent = "\u00A0-\u00A0";
        const spanTeam2 = document.createElement("span");
        spanTeam2.textContent = Poule.capitalize(el.equipe2);
        divTeam.appendChild(spanTeam1);
        divTeam.appendChild(spanSpace);
        divTeam.appendChild(spanTeam2);

        if (el.indexMark >= 0) {
          divTeam.classList.add("bg-yellow-50", "rounded-xl", "px-2");
          if (el.indexMark === 0) {
            spanTeam1.classList.add("font-bold");
          } else if (el.indexMark === 1) {
            spanTeam2.classList.add("font-bold");
          }
        }
        if (el.domicile || el.exterieur) {
          const subDiv = document.createElement("div");
          subDiv.classList.add(
            "flex",
            "gap-1",
            "text-black",
            "items-center",
            "justify-between",
            "w-[95%]",
          );
          const spanDomicile = document.createElement("span");
          spanDomicile.classList.add(
            "text-xs",
            "lowercase",
            "flex",
            "font-bold",
            "w-fit",
            "px-1",
            "rounded-xl",
          );
          if (el.domicile) {
            spanDomicile.appendChild(this.icons.home.cloneNode(true));
          } else if (el.exterieur) {
            spanDomicile.appendChild(this.icons.outdoor.cloneNode(true));
          }

          subDiv.appendChild(divTeam);
          subDiv.appendChild(spanDomicile);
          div.appendChild(subDiv);

          if (index === arr.length - 1) {
            subDiv.classList.add("mb-1");
          }
        } else {
          div.appendChild(divTeam);
          if (index === arr.length - 1) {
            divTeam.classList.add("mb-1");
          }
        }
      }
    });
  }
}

function initSvg(name) {
  const svg = document.createElement("img");
  svg.src = name;
  return svg;
}

export const datesDepartementales = [
  "20 septembre 2026",
  "04 octobre 2026",
  "18 octobre 2026",
  "08 novembre 2026",
  "22 novembre 2026",
  "06 décembre 2026",
  "13 décembre 2026",
].map((el, index) => `Journée ${index + 1} ---------- ${el}`);

export const datesJuniors = [
  "19 septembre 2026",
  "03 octobre 2026",
  "17 octobre 2026",
  "07 novembre 2026",
  "21 novembre 2026",
  "05 décembre 2026",
  "12 décembre 2026",
].map((el, index) => `Journée ${index + 1} ---------- samedi ${el}`);
