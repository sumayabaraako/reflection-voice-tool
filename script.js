const themeSelect = document.getElementById("themeSelect");

const newThemeInput = document.getElementById("newThemeInput");
const addThemeBtn = document.getElementById("addThemeBtn");

const continueBtn = document.getElementById("continueBtn");
const themeSection = document.getElementById("theme-section");
const recordSection = document.getElementById("record-section");

let themes =
  JSON.parse(localStorage.getItem("themes")) ||
  [
    "Growth",
    "Work",
    "Learning"
  ];

function loadThemes() {

  themeSelect.innerHTML = "";

  themes.forEach((theme) => {

    const option = document.createElement("option");

    option.value = theme;
    option.textContent = theme;

    themeSelect.appendChild(option);

  });

}

addThemeBtn.addEventListener("click", () => {

  const newTheme = newThemeInput.value.trim();

  if (newTheme === "") {
    return;
  }

  themes.push(newTheme);

  localStorage.setItem(
    "themes",
    JSON.stringify(themes)
  );

  loadThemes();

  themeSelect.value = newTheme;

  newThemeInput.value = "";

});

continueBtn.addEventListener("click", () => {

  localStorage.setItem(
    "selectedTheme",
    themeSelect.value
  );

  themeSection.style.display = "none";
  recordSection.style.display = "block";

});

loadThemes();