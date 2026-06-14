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

loadThemes();
