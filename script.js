const START = document.querySelector("#start-button");
const CIRCLE = document.querySelector(".circle");
let audio = new Audio("leo_ordinary_person.mp3");
let isPaused = false; 
function getId(id) {
  return document.getElementById(id);
}

document.querySelector(".settings-bar").addEventListener("input", function() {
  let worktime = document.querySelector("#work-t").value;
  let shortbreak = document.querySelector("#short-t").value;
  let longbreak = document.querySelector("#long-t").value;

  document.querySelector("#work-time-value").textContent = worktime;
  document.querySelector("#minute").textContent = worktime;
  document.querySelector("#short-time-value").textContent = shortbreak;
  document.querySelector("#long-time-value").textContent = longbreak;
});

document.querySelector(".menu").addEventListener("click", function() {
  document.querySelector(".settings-bar").style.transform = "translateX(0%)";
  document.querySelectorAll(".bar").forEach(function(eve) {
      eve.style.backgroundColor = "black";
  });

});
document.querySelector(".close-button").addEventListener("click", function() {
  document.querySelector(".settings-bar").style.transform = "translateX(300%)";
  document.querySelectorAll(".bar").forEach(function(eve) {
      eve.style.backgroundColor = "white";
  });

});
function playsound() {
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 15000);
}
let work = true;
let short = false;
let long = false;
let shortbreakcount = 0;
let minute;
let second;

var starttimer;
function timer() {
  if (isPaused === true) { 
    isPaused = false;
    return;
  }
 
  starttimer = setInterval(function() {
    minute = document.querySelector("#minute");
    second = document.querySelector("#second");
    let totalseconds = parseInt(minute.textContent) * 60 + parseInt(second.textContent);
    totalseconds--;
    minute.textContent = `${Math.floor(totalseconds / 60)}`.padStart(2, '0');
    second.textContent = `${totalseconds % 60}`.padStart(2, '0');
    if (totalseconds <= 0) {
      clearInterval(starttimer);
      if (getId("notification").checked) {
        playsound();
      }
      if (work) {
        if (shortbreakcount === 2) {
          work = false;
          long = true;
          shortbreakcount = 0;
          minute.textContent = document.querySelector("#long-time-value").textContent;
        } else {
          shortbreakcount++;
          work = false;
          short = true;
          minute.textContent = document.querySelector("#short-time-value").textContent;
        }
      } else if (short) {
        short = false;
        work = true;
        minute.textContent = document.querySelector("#work-time-value").textContent;
      } else if (long) {
        work = true;
        short = false;
        long = false;
        minute.textContent = document.querySelector("#work-time-value").textContent;
      }
      if (getId("auto-notification").checked) { // Corrected checkbox ID
        timer();
      }
    }
  }, 1000);
}

document.querySelector(".replay").addEventListener("click", function() {
  console.log("hello")
  clearInterval(starttimer);
  CIRCLE.classList.remove("ani"); 
  minute.textContent = document.querySelector("#work-time-value").textContent;
  second.textContent = "00";
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".start-bt").style.display = "block";
});

START.addEventListener('click', function() {
  isPaused = false;
  CIRCLE.classList.add("ani"); 
  timer();
  document.querySelector(".pause").style.display = "block";
  document.querySelector(".start-bt").style.display = "none";
});

document.querySelector(".pause").addEventListener("click", function() {
  isPaused = true;
  CIRCLE.classList.remove("ani"); 
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".start-bt").style.display = "block";
  clearInterval(starttimer);
});

document.querySelector(".info-icon").addEventListener('click',function(){
  document.querySelector(".instruction").style.transform = "scale(1)";

  });

document.querySelector(".ok").addEventListener('click',function(){
document.querySelector(".instruction").style.transform = "scale(0)";

});