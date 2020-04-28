var shuffledQuest, questions;

var questions = [
  {
    question: "What is Jose's favorite animal?",
    choices: ["dog", "cat", "bird", "lizzard"],
    answer: "dog",
  },
  {
    question: "What orange vegetable do rabbits like to eat?",
    choices: ["oranges", "carrots", "radish", "lettuce"],
    answer: "carrots",
  },
  {
    question: "How much wood would a Woodchuck Chuck?",
    choices: ["one", "five", "many", "stupid question"],
    answer: "stupid question",
  },
  {
    question: "How are you feeling today?",
    choices: ["happy", "blue", "sick", "blah"],
    answer: "happy",
  },
  {
    question: "But why?",
    choices: ["you", "please", "tell", "me"],
    answer: "please",
  },
  {
    question: "How has JS affect you?",
    choices: ["hair ripping", "love it", "frustrated", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "question?",
    choices: ["oranges", "carrots", "radish", "lettuce"],
    answer: "carrots",
  },
  {
    question: "question2?",
    choices: ["oranges", "carrots", "radish", "lettuce"],
    answer: "carrots",
  },
  {
    question: "question3?",
    choices: ["oranges", "carrots", "radish", "lettuce"],
    answer: "carrots",
  },
  {
    question: "peter piper, what kind of peppers did he pick?",
    choices: ["oranges", "carrots", "radish", "lettuce"],
    answer: "carrots",
  },
];

//update the html with question data from questions
// var lastQuestionsIndex = questions.length - 1;
var questionIndex = 0;
var getQuestion = function () {
  //remove correct and wrong tags
  var allChoicesEl = document.querySelectorAll(".choice");
  for (i = 0; i < allChoicesEl.length; i++) {
    allChoicesEl[i].classList.remove("correct");
    allChoicesEl[i].classList.remove("wrong");
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
      allChoicesEl[i].classList.add("wrong");
    }
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

      //update url slug
      //   window.location.href = "./highscores.html";

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
  console.log("answer click handle working");
  //1. check if the choice is right
  var eventTargetChoice = document.querySelector(event.target.nodeName);
  console.log(eventTargetChoice);
  if (eventTargetChoice.classList.contains("correct") > -1) {
    //2. correct answer count ++
    points++;
    console.log("current-points: ", points);
    localStorage.setItem("points", points);
  }

  //3. if the answer choice is right display on screen then move to the next question
  questionIndex++;
  //4. end the quiz
  console.log("questionIndex: ", questionIndex);
  if (questionIndex >= 10) {
    //update url slug
    // window.location.href = "./highscores.html";
    var questionDiv = document.querySelector("#questions");
    questionDiv.classList.remove("show");
    questionDiv.classList.add("hide");
    var endScreen = document.querySelector("#end-screen");
    endScreen.classList.remove("hide");
    endScreen.classList.add("show");
  }
  getQuestion();

  // 5. if answered incorrectly display on screen and 5 secs is subtracted from the clock
  time = time - 5;
  //update time text
  var timeSpan = document.querySelector("#time");
  timeSpan.textContent = time;
};

//add start quiz event listener
var startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz);

//set parent delegator
document
  .querySelector("#questions")
  .addEventListener("click", function (event) {
    console.log("event.target", event.target.className);
    //check if target element has class name choice
    if (event.target.className.indexOf("choice") > -1) {
      answerButtonHandler();
    }
  });
