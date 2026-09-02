window.onload = function () {
  const them = document.getElementById("thematic");
  const icons = {
    light: initSvg("icons/icon-light.svg"),
    dark: initSvg("icons/icon-dark.svg"),
  };
  if (them) {
    setThem(icons, true);
    them.addEventListener("click", function () {
      setThem(icons);
    });
  }
  syncThemByHour();
  setInterval(syncThemByHour, 3_600_000);
};

function initSvg(name) {
  const svg = document.createElement("img");
  svg.src = name;
  return svg;
}

function setThem(icons, init = false) {
  const element = document.getElementById("thematic");
  const children = Array.from(element.children);
  const applyLightThem = () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    if (element.classList.contains("border-white")) {
      element.classList.remove("border-white");
    }
    element.classList.add("border-black");
    element.title = "Thème sombre";
    if (children.length > 0) element.removeChild(children[0]);
    element.appendChild(icons.dark);
  };
  const applyDarkThem = () => {
    document.body.classList.add("dark");
    if (element.classList.contains("border-black")) {
      element.classList.remove("border-black");
    }
    element.classList.add("border-white");
    document.body.classList.remove("light");
    element.title = "Thème clair";
    if (children.length > 0) element.removeChild(children[0]);
    element.appendChild(icons.light);
  };
  if (init) {
    if (document.body.classList.contains("dark")) {
      applyDarkThem();
    } else if (document.body.classList.contains("light")) {
      applyLightThem();
    }
  } else {
    if (document.body.classList.contains("dark")) {
      applyLightThem();
    } else if (document.body.classList.contains("light")) {
      applyDarkThem();
    }
  }
}

function syncThemByHour() {
  const heure = new Date().getHours();
  if (heure >= 9 && heure <= 18) {
    if (document.body.classList.contains("dark")) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  } else if (document.body.classList.contains("light")) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
}
