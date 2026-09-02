import { Poule } from "./matches.js";

function handleData() {
  const height = document.body.clientHeight;
  const width = document.body.clientWidth;

  const isMobile = width < 800 || height < 800;
  if (!isMobile) {
    return;
  }

  const select = document.createElement("select");
  select.classList.add("mx-4", "my-3", "border", "border-solid", "rounded-lg", "px-2");
  const allOption = document.createElement("option");
  allOption.value = null;
  allOption.textContent = "Toutes les équipes";
  select.appendChild(allOption);

  const options = Poule.ligues.forEach((el) => {
    const res = document.createElement("option");
    res.value = el;
    res.textContent = el;
    select.appendChild(res);
  });
  const banner = document.getElementById("banner");
  banner.insertAdjacentElement("afterend", select);
  select.addEventListener("change", function () {
    const toDisplay = Array.from(document.getElementsByClassName("ligues"));
    if (this.value === "null") {
      toDisplay.forEach((el) => (el.style.display = "flex"));
      localStorage.setItem("team", null);
    } else {
      toDisplay
        .filter((el) => el.id !== this.value)
        .forEach((el) => (el.style.display = "none"));
      const searched = toDisplay.find((el) => el.id === this.value);
      if (searched) {
        searched.style.display = "flex";
        localStorage.setItem("team", this.value);
      }
    }
  });
  const ligueToDisplay = localStorage.getItem("team");
  if (ligueToDisplay != null) {
    select.value = ligueToDisplay;
    select.dispatchEvent(new Event("change"));
  }
}

handleData();
