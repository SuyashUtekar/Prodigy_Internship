let startTime;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const laps = document.getElementById("laps");
let lapCounter = 0;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = timeToString(elapsedTime);
  }, 10);
  showButton("STOP");
  showActionText("Start");
}

function stop() {
  clearInterval(timerInterval);
  showButton("START");
  showActionText("Stop");
}

function reset() {
  clearInterval(timerInterval);
  display.innerHTML = "00:00:00.00";
  elapsedTime = 0;
  laps.innerHTML = "";
  lapCounter = 0;
  showButton("START");
  showActionText("Reset");
}

function lap() {
  lapCounter++;
  let li = document.createElement("li");
  li.innerHTML = timeToString(elapsedTime);
  laps.appendChild(li);
  showActionText(`Lap ${lapCounter}`);
}

function showButton(buttonKey) {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");
  const lapButton = document.getElementById("lap");

  if (buttonKey === "START") {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    lapButton.disabled = true;
  } else {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

function showActionText(action) {
  let actionText = document.createElement("div");
  actionText.className = "action-text";
  actionText.innerHTML = action;
  document.querySelector(".container").appendChild(actionText);

  setTimeout(() => {
    actionText.remove();
  }, 500);
}

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

showButton("START");
