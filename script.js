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



const colors = [
  "#6EF3D6",
  "#FF4DDF",
  "#42E87B",
  "#FFD28A",
  "#FF4D6D",
  "#7A8CFF",
  "#A77BFF",
  "#00D4FF",
  "#FFB703",
  "#C77DFF"
];

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

      const colorIndex = usedThemes.indexOf(theme);
      const planetColor = colors[colorIndex % colors.length];

    const planet = document.createElement("div");
    planet.classList.add("planet");

   planet.innerHTML = `
  <div class="planet-count">${count}</div>
  <div class="planet-text">memos</div>
`;
      const label = document.createElement("div");
      label.classList.add("planet-label");
      label.textContent = theme;

      planet.appendChild(label);

    
      const positions = [
       { left: "10%", top: "12%" },
       { left: "58%", top: "10%" },
       { left: "28%", top: "42%" },
      { left: "65%", top: "48%" },
      { left: "12%", top: "72%" },
       { left: "52%", top: "76%" }
];

const position = positions[colorIndex % positions.length];

planet.style.left = position.left;
planet.style.top = position.top;

    planet.style.background = `radial-gradient(
      circle at 35% 35%,
      #ffffff,
      ${planetColor} 35%,
      #0B0420 100%
    )`;

    planet.style.boxShadow = `0 0 35px ${planetColor}`;

    constellation.appendChild(planet);
  });
}

loadThemes();