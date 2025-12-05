/*------------------------------------------------------------ CONSTANT DECLERATION ------------------------------------------------------------*/
const clockTime = document.querySelector(".clock_container");
const workTime = document.querySelector(".work");
const breakTime = document.querySelector(".break");
const bells = new Audio("./audio/alarm.wav");

/*------------------------------------------------------------ MAIN BUTTONS ------------------------------------------------------------*/
function showClock() {
  clockTime.style.display = "block";
  workTime.style.display = "none";
  breakTime.style.display = "none";
  document.getElementById("btn_clock").style.backgroundColor =
    "var(--clr-text)";
  document.getElementById("btn_clock").style.color = "black";
  document.getElementById("btn_work").style.backgroundColor = "transparent";
  document.getElementById("btn_work").style.color = "var(--clr-text)";
  document.getElementById("btn_break").style.backgroundColor = "transparent";
  document.getElementById("btn_break").style.color = "var(--clr-text)";
}
function showWork() {
  clockTime.style.display = "none";
  workTime.style.display = "block";
  breakTime.style.display = "none";
  document.getElementById("btn_clock").style.backgroundColor = "transparent";
  document.getElementById("btn_clock").style.color = "var(--clr-text)";
  document.getElementById("btn_work").style.backgroundColor = "var(--clr-text)";
  document.getElementById("btn_work").style.color = "black";
  document.getElementById("btn_break").style.backgroundColor = "transparent";
  document.getElementById("btn_break").style.color = "var(--clr-text)";
}
function showBreak() {
  clockTime.style.display = "none";
  workTime.style.display = "none";
  breakTime.style.display = "block";
  document.getElementById("btn_clock").style.backgroundColor = "transparent";
  document.getElementById("btn_clock").style.color = "var(--clr-text)";
  document.getElementById("btn_work").style.backgroundColor = "transparent";
  document.getElementById("btn_work").style.color = "var(--clr-text)";
  document.getElementById("btn_break").style.backgroundColor =
    "var(--clr-text)";
  document.getElementById("btn_break").style.color = "black";
}

/*------------------------------------------------------------ CLOCK ------------------------------------------------------------*/
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var session = "AM";
  if (h == 0) {
    h = 12;
  }
  if (h >= 12) {
    session = "PM";
  }
  if (h > 12) {
    h = h - 12;
  }
  m = m < 10 ? "0" + m : m;
  var time = h + ":" + m + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  setTimeout(showTime, 1000);
}
function showDate() {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var suffix = "TH";

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  if (m >= 1 && m <= 12) {
    m = months[m];
  }

  if (d == 1 || d == 21 || d == 31) {
    suffix = "st";
  }
  if (d == 2 || d == 22) {
    suffix = "nd";
  }
  if (d == 3 || d == 23) {
    suffix = "rd";
  }

  var time = d + suffix + " " + m + " " + y;
  document.getElementById("MyDateDisplay").innerText = time;
  document.getElementById("MyDateDisplay").textContent = time;
  setTimeout(showTime, 1000);
}

/*------------------------------------------------------------ WORK ------------------------------------------------------------*/
function showTimerWork() {
  let minWork = 25;
  let secWork = 0;
  let prevMinWork = minWork;
  let prevSecWork = secWork;
  let totalTimeWork = minWork * 60 + secWork;
  let state = false;
  let myInterval;

  function updateTimerWork() {
    if (state) {
      totalTimeWork--;

      let minWork = Math.floor(totalTimeWork / 60);
      let secWork = totalTimeWork % 60;

      minWork = minWork < 10 ? "0" + minWork : minWork;
      secWork = secWork < 10 ? "0" + secWork : secWork;

      var timeWork = minWork + " : " + secWork;
      document.getElementById("timerWork").innerHTML = timeWork;
      document.getElementById("timerWork").textContent = timeWork;

      if (minWork == 0 && secWork == 0) {
        bells.play();
        clearInterval(myInterval);
        setTimeout(resetTimer, 5000);
      }
    }
  }

  function startTimer() {
    if (!state) {
      state = true;
      myInterval = setInterval(updateTimerWork, 1000);
    }
  }

  function stopTimer() {
    state = false;
    clearInterval(myInterval);
  }

  function resetTimer() {
    state = false;
    clearInterval(myInterval);
    minWork = prevMinWork;
    secWork = prevSecWork;
    totalTimeWork = minWork * 60 + secWork; // Reset totalTimeWork to initial value
    let paddedMinWork = minWork < 10 ? "0" + minWork : minWork;
    let paddedSecWork = secWork < 10 ? "0" + secWork : secWork;
    var timeWork = paddedMinWork + " : " + paddedSecWork;
    document.getElementById("timerWork").innerHTML = timeWork;
    document.getElementById("timerWork").textContent = timeWork;
  }

  function increaseTime() {
    if (state == false) {
      totalTimeWork += 60;
      prevMinWork += 1;
      updateDisplay();
    }
  }

  function decreaseTime() {
    if (totalTimeWork >= 61 && state == false) {
      prevMinWork -= 1;
      totalTimeWork -= 60;
      updateDisplay();
    }
  }

  function updateDisplay() {
    let min = Math.floor(totalTimeWork / 60);
    let sec = totalTimeWork % 60;

    let paddedMin = min < 10 ? "0" + min : min;
    let paddedSec = sec < 10 ? "0" + sec : sec;

    var timeWork = paddedMin + " : " + paddedSec;
    document.getElementById("timerWork").innerHTML = timeWork;
    document.getElementById("timerWork").textContent = timeWork;
  }

  document.getElementById("startWork").addEventListener("click", startTimer);
  document.getElementById("pauseWork").addEventListener("click", stopTimer);
  document.getElementById("resetWork").addEventListener("click", resetTimer);
  document.getElementById("plusWork").addEventListener("click", increaseTime);
  document.getElementById("minusWork").addEventListener("click", decreaseTime);

  minWork = minWork < 10 ? "0" + minWork : minWork;
  secWork = secWork < 10 ? "0" + secWork : secWork;
  var timeWork = minWork + " : " + secWork;
  document.getElementById("timerWork").innerHTML = timeWork;
  document.getElementById("timerWork").textContent = timeWork;
}

/*------------------------------------------------------------ BREAK ------------------------------------------------------------*/
function showTimerBreak() {
  let minBreak = 5;
  let secBreak = 0;
  let prevMinBreak = minBreak;
  let prevSecBreak = secBreak;
  let totalTimeBreak = minBreak * 60 + secBreak;
  let state = false;
  let myInterval;

  function updateTimerBreak() {
    if (state) {
      totalTimeBreak--;

      let minBreak = Math.floor(totalTimeBreak / 60);
      let secBreak = totalTimeBreak % 60;

      minBreak = minBreak < 10 ? "0" + minBreak : minBreak;
      secBreak = secBreak < 10 ? "0" + secBreak : secBreak;

      var timeBreak = minBreak + " : " + secBreak;
      document.getElementById("timerBreak").innerHTML = timeBreak;
      document.getElementById("timerBreak").textContent = timeBreak;

      if (minBreak == 0 && secBreak == 0) {
        bells.play();
        clearInterval(myInterval);
        setTimeout(resetTimer, 5000);
      }
    }
  }

  function startTimer() {
    if (!state) {
      state = true;
      myInterval = setInterval(updateTimerBreak, 1000);
    }
  }

  function stopTimer() {
    state = false;
    clearInterval(myInterval);
  }

  function resetTimer() {
    state = false;
    clearInterval(myInterval);
    minBreak = prevMinBreak;
    secBreak = prevSecBreak;
    totalTimeBreak = minBreak * 60 + secBreak; // Reset totalTimeBreak to initial value
    let paddedMinBreak = minBreak < 10 ? "0" + minBreak : minBreak;
    let paddedSecBreak = secBreak < 10 ? "0" + secBreak : secBreak;
    var timeBreak = paddedMinBreak + " : " + paddedSecBreak;
    document.getElementById("timerBreak").innerHTML = timeBreak;
    document.getElementById("timerBreak").textContent = timeBreak;
  }

  function increaseTime() {
    if (state == false) {
      totalTimeBreak += 60;
      prevMinBreak += 1;
      updateDisplay();
    }
  }

  function decreaseTime() {
    if (totalTimeBreak >= 61 && state == false) {
      prevMinBreak -= 1;
      totalTimeBreak -= 60;
      updateDisplay();
    }
  }

  function updateDisplay() {
    let min = Math.floor(totalTimeBreak / 60);
    let sec = totalTimeBreak % 60;

    let paddedMin = min < 10 ? "0" + min : min;
    let paddedSec = sec < 10 ? "0" + sec : sec;

    var timeBreak = paddedMin + " : " + paddedSec;
    document.getElementById("timerBreak").innerHTML = timeBreak;
    document.getElementById("timerBreak").textContent = timeBreak;
  }

  document.getElementById("startBreak").addEventListener("click", startTimer);
  document.getElementById("pauseBreak").addEventListener("click", stopTimer);
  document.getElementById("resetBreak").addEventListener("click", resetTimer);
  document.getElementById("plusBreak").addEventListener("click", increaseTime);
  document.getElementById("minusBreak").addEventListener("click", decreaseTime);

  minBreak = minBreak < 10 ? "0" + minBreak : minBreak;
  secBreak = secBreak < 10 ? "0" + secBreak : secBreak;
  var timeBreak = minBreak + " : " + secBreak;
  document.getElementById("timerBreak").innerHTML = timeBreak;
  document.getElementById("timerBreak").textContent = timeBreak;
}

/*------------------------------------------------------------ FUNCTION CALL ------------------------------------------------------------*/
showDate();
showTime();
showTimerBreak();
showTimerWork();
