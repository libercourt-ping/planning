export class Match {
  /**
   *
   * @param {string} date
   * @param {string} equipe1
   * @param {string} equipe2
   * @param {boolean} domicile
   * @param {boolean} exterieur
   * @param {number} indexMark
   */
  constructor(date, equipe1, equipe2, domicile, exterieur, indexMark) {
    this.date = date;
    this.equipe1 = equipe1;
    this.equipe2 = equipe2;
    this.domicile = domicile;
    this.exterieur = exterieur;
    this.indexMark = indexMark;
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
    this.clubs = clubs;
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
    return null;
  }

  addMatch(date, index1, index2) {
    /**
     * @type {string[]}
     */
    const clubs = [this.clubs[index1], this.clubs[index2]];
    const isInteresting = clubs.findIndex((el) =>
      el.toUpperCase().includes("LIBERCOURT"),
    );
    const domicile = clubs[0].toUpperCase().includes("LIBERCOURT");
    const exterieur = clubs[1].toUpperCase().includes("LIBERCOURT");
    this.allMatchs.push(
      new Match(date, clubs[0], clubs[1], domicile, exterieur, isInteresting),
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

  display() {
    const div = document.createElement("div");
    div.classList.add(
      "ligues",
      "flex",
      "flex-col",
      "border",
      "border-solid",
      "rounded-xl",
    );
    const title = document.createElement("span");
    const valueTitle = this.ligue + " - " + this.name;
    div.id = valueTitle;
    Poule.ligues.push(valueTitle);
    title.textContent = valueTitle;
    title.classList.add(
      "text-center",
      "border-b",
      "border-b-solid",
      "rounded-2xl",
    );
    const ligues = ["D1", "D2", "D3", "D4", "D5"];
    const valueCss = [
      "bg-red-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
    ];
    ligues.forEach((el, index) => {
      if (valueTitle.startsWith(el)) {
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
          "mb-1",
          "text-sm",
          "text-blue-800",
          "italic",
        );
        div.appendChild(date);
        dealedDate.push(el.date);
        if (index % 4 === 0 && index > 0) {
          date.classList.add(
            "my-1",
            "border-t",
            "border-t-solid",
            "border-black",
          );
        }
      }
      const divTeam = document.createElement("div");
      divTeam.classList.add(
        "lg:mx-[10%]",
        "mx-2",
        "px-1",
        "text-xs",
        "w-fit",
        "flex",
        "items-center",
      );

      const spanTeam1 = document.createElement("span");
      spanTeam1.textContent = el.equipe1;

      const spanSpace = document.createElement("span");
      spanSpace.textContent = "\u00A0-\u00A0";
      const spanTeam2 = document.createElement("span");
      spanTeam2.textContent = el.equipe2;
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
