var shuffledQuest, questions;
var initInput = document.querySelector("#initials");

var player = [];

var questions = [
  {
    question: "HTML is a subset of...",
    choices: ["SGMD", "SGML", "SGMH", "none of the above"],
    answer: "SGML",
  },
  {
    question: "What does the <br> tag add to your webpage?",
    choices: ["Long-break", "Paragraph-break", "Line-break", "none"],
    answer: "Line-break",
  },
  {
    question: "The first tag inside <TABLE> is",
    choices: ["<HEAD>", "<CAPTION>", "<TH>", "<TD>"],
    answer: "<CAPTION>",
  },
  {
    question: "Which of these can be returned by the operator &",
    choices: ["Integer", "Boolean", "Character", "Integer/Boolean"],
    answer: "Integer/Boolean",
  },
  {
    question: "Which tag tells the browser where the page starts and stops?",
    choices: ["<html>", "<body>", "<head>", "<title>"],
    answer: "<html>",
  },
  {
    question: " How to sort an array?",
    choices: [
      "Array.sort()",
      "Arrays.sort()",
      "Collection.sort()",
      "System.sort(",
    ],
    answer: "Arrays.sort()",
  },
  {
    question: "How to copy contents of array?",
    choices: [
      "System.arrayCopy()",
      "Array.copy(",
      "Arrays.copy()",
      "Collection.copy()",
    ],
    answer: "System.arrayCopy()",
  },
  {
    question: "Which tag will you add to specify a font for your whole page?",
    choices: ["<defaultfont>", "<targetfont>", "<basefont>", "<font>"],
    answer: "<defaultfont>",
  },
  {
    question: "Where is an array stored in memory",
    choices: [
      "heap space",
      "stack space",
      "heap space and stack space",
      "first generation memory",
    ],
    answer: "heap space",
  },
  {
    question:
      "An array elements are always stored in ________ memory locations.",
    choices: ["Sequential", "Random", "Sequential and Random", "Binary search"],
    answer: "Sequential",
  },
];

//update the html with question data from questions

var questionIndex = 0;
var getQuestion = function () {
  //remove correct tags
  var allChoicesEl = document.querySelectorAll(".choice");
  for (i = 0; i < allChoicesEl.length; i++) {
    allChoicesEl[i].classList.remove("correct");
  }
  //build the question
  var questionEl = document.querySelector("#question-title");
  questionEl.textContent = questions[questionIndex].question;
  var choice1El = document.querySelector("#choice-1");
  choice1El.textContent = questions[questionIndex].choices[0];
  var choice2El = document.querySelector("#choice-2");
  choice2El.textContent = questions[questionIndex].choices[1];
  var choice3El = document.querySelector("#choice-3");
  choice3El.textContent = questions[questionIndex].choices[2];
  var choice4El = document.querySelector("#choice-4");
  choice4El.textContent = questions[questionIndex].choices[3];
  //mark the right answer with correct attribute
  var correctAnswer = questions[questionIndex].answer;
  //tag the correct answer
  for (i = 0; i < allChoicesEl.length; i++) {
    var choiceText = allChoicesEl[i].textContent;
    //compare correct answer
    if (choiceText === correctAnswer) {
      allChoicesEl[i].classList.add("correct");
    } else {
    }
  }
  questionIndex++;

  if (questionIndex === 10) {
   
    var questionDiv = document.querySelector("#questions");
    questionDiv.classList.remove("show");
    questionDiv.classList.add("hide");
    var endScreen = document.querySelector("#end-screen");
    endScreen.classList.remove("hide");
    endScreen.classList.add("show");
    var score = document.querySelector("#final-score");
    score.textContent = points;
    // var timerDiv = document.querySelector("#timer")
    // timerDiv.classList.add("hide");
    
  }
};

//handle timer function
var time = 60;

// need to stop timer at 0 --game over--

//start quiz on the click of the button
var startQuiz = function () {
  console.log("starting quiz is working");
  //1. hide start elements
  var startDiv = document.querySelector("#start-screen");
  console.log("startDiv: ", startDiv);
  startDiv.classList.add("hide");
  shuffledQuest = questions.sort(() => Math.random() - 0.5);

  //2. show the question
  var questionDiv = document.querySelector("#questions");
  console.log("questionDiv: ", questionDiv);
  questionDiv.classList.remove("hide");
  questionDiv.classList.add("show");

  //3. get the question info
  getQuestion();

  //4. start the timer
  var timeStop = setInterval(handleTimer, 1000);
  function handleTimer() {
    //subtract time
    time--;

    //update time text
    var timeSpan = document.querySelector("#time");
    timeSpan.textContent = time;

    //stop time at zero
    if (time === 0) {
      //clear interval
      clearInterval(timeStop);

      //5.when the timer reaches 0 it is game over. Hide questions and show total points and enter initials
      var questionDiv = document.querySelector("#questions");
      questionDiv.classList.remove("show");
      questionDiv.classList.add("hide");
      var endScreen = document.querySelector("#end-screen");
      endScreen.classList.remove("hide");
      endScreen.classList.add("show");      
    }
  }
};

var points = 0;
var answerButtonHandler = function () {
//   console.log("answer click handle working");
  //1. check if the choice is right
  var eventTargetChoice = event.target;
//   console.log(eventTargetChoice);
  if (eventTargetChoice.classList.contains("correct")) {
    //2. correct answer count ++
    points++;

    // console.log(points);
  } else {
    // 3. if answered incorrectly 5 secs is subtracted from the clock
    time = time - 5;
    //update time text
    var timeSpan = document.querySelector("#time");
    timeSpan.textContent = time;
  }

  getQuestion();
 
};

// local storage of initials

  if(JSON.parse(localStorage.getItem("player")) !== null) { player = JSON.parse(localStorage.getItem("player"))

  }
console.log(player)

function endGame() {
  event.preventDefault();
  
  var initText = initInput.value.trim();

  var newScore= {
      initials: initText,
      score: points
  }
  player.push(newScore);  
  initInput.value = "";
  localStorage.setItem("player", JSON.stringify(player));
  window.location.href = "./highscores.html";
}

//add start quiz event listener
var startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz);

//set parent delegator
document
  .querySelector("#questions")
  .addEventListener("click", function (event) {
    // console.log("event.target", event.target.className);
    //check if target element has class name choice
    if (event.target.className.indexOf("choice") > -1) {
      answerButtonHandler();
    }
  });

var endGameButton = document.querySelector("#submit");
endGameButton.addEventListener("click", endGame);

