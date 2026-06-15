const themeSelect = document.getElementById("themeSelect");

const newThemeInput = document.getElementById("newThemeInput");
const addThemeBtn = document.getElementById("addThemeBtn");

const continueBtn = document.getElementById("continueBtn");
const themeSection = document.getElementById("theme-section");
const recordSection = document.getElementById("record-section");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayer = document.getElementById("audioPlayer");
const recordStatus = document.getElementById("recordStatus");
const saveBtn = document.getElementById("saveBtn");

const constellationSection = document.getElementById("constellation-section");
const constellation = document.getElementById("constellation");

let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;

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

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, {
        type: "audio/webm"
      });

      audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioUrl;

      recordStatus.textContent = "Recording finished. You can listen now.";
      saveBtn.disabled = false;
    };

    mediaRecorder.start();

    recordStatus.textContent = "Recording...";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (error) {
    recordStatus.textContent = "Microphone access denied.";
    console.error(error);
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder) {
    mediaRecorder.stop();

    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});




saveBtn.addEventListener("click", () => {
  const selectedTheme = localStorage.getItem("selectedTheme");

  const reflection = {
    id: Date.now(),
    theme: selectedTheme,
    date: new Date().toLocaleString(),
    audio: audioUrl
  };

  let reflections =
    JSON.parse(localStorage.getItem("reflections")) || [];

  reflections.push(reflection);

  localStorage.setItem(
    "reflections",
    JSON.stringify(reflections)
  );

  recordSection.style.display = "none";
  constellationSection.style.display = "block";

  renderConstellation();
});

function renderConstellation() {
  constellation.innerHTML = "";

  let reflections =
    JSON.parse(localStorage.getItem("reflections")) || [];

  const usedThemes = [];

  reflections.forEach((reflection) => {
    if (!usedThemes.includes(reflection.theme)) {
      usedThemes.push(reflection.theme);
    }
  });

  usedThemes.forEach((theme) => {
    const count = reflections.filter((reflection) => {
      return reflection.theme === theme;
    }).length;

    const planet = document.createElement("div");
    planet.classList.add("planet");

    planet.innerHTML = `
      <span>${count}</span>
      <strong>${theme}</strong>
    `;

    planet.style.left = Math.random() * 70 + "%";
    planet.style.top = Math.random() * 70 + "%";

    constellation.appendChild(planet);
  });
}
loadThemes();