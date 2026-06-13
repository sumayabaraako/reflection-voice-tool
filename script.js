const themeSelect = document.getElementById("themeSelect");

let themes = [
  "Crowth",
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

loadThemes();