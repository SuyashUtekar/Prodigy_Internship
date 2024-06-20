let startTime;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

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
}

function stop() {
    clearInterval(timerInterval);
    showButton("START");
}

function reset() {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    elapsedTime = 0;
    laps.innerHTML = '';
    showButton("START");
}

function lap() {
    let li = document.createElement("li");
    li.innerHTML = timeToString(elapsedTime);
    laps.appendChild(li);
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

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

showButton("START");
