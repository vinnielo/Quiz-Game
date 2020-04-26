var questions = [
    {
        question: 'What is Jose\'s favorite animal?',
        choices: ['dog','cat','bird','lizzard'],
        answer: 'dog'
    },
    {
        question: 'what color is the sky?',
        choices: ['pink','blue','black','green'],
        answer: 'blue'
    }
];

//update the html with question data from questions
var questionIndex = 0;
var getQuestion = function() {
    var questionEl = document.querySelector('#question-title');
    questionEl.textContent = questions[questionIndex].question;
    console.log('choice-1: ',questions[questionIndex].choices[0]);
    var choice1El = document.querySelector('#choice-1');
    choice1El.textContent = questions[questionIndex].choices[0];
    var choice2El = document.querySelector('#choice-2');
    choice2El.textContent = questions[questionIndex].choices[1];
    var choice3El = document.querySelector('#choice-3');
    choice3El.textContent = questions[questionIndex].choices[2];
    var choice4El = document.querySelector('#choice-4');
    choice4El.textContent = questions[questionIndex].choices[3];
    //mark the right answer with correct attribute
    var allChoicesEl = document.querySelectorAll('.choice');
    var correctAnswer = questions[questionIndex].answer;
    for (i=0;i<allChoicesEl.length;i++) {
        var choiceText = allChoicesEl[i].textContent;
        //compare correct answer
        if (choiceText === correctAnswer) {
            allChoicesEl[i].classList.add('correct');
        }
    }
}

//handle timer function
var time = 75;
var handleTimer = function() {
    //subtract time
    time--;
    //update time text
    var timeSpan = document.querySelector('#time');
    timeSpan.textContent = time;
}

//start quiz o nthe click of the button
var startQuiz = function() {
    console.log("starting quiz is working");
    //1. hide start elements
    var startDiv = document.querySelector("#start-screen");
    console.log('startDiv: ', startDiv);
    startDiv.classList.add('hide');

    //2. show the question
    var questionDiv = document.querySelector("#questions");
    console.log('questionDiv: ', questionDiv);
    questionDiv.classList.remove('hide');
    questionDiv.classList.add('show');

    //3. get the question info
    getQuestion();
   
    //4. start the timer
    setInterval(handleTimer,1000);

}

var points = 0;
var answerButtonHandler = function() {
    console.log('answer click handle working');
    //1. check if the choice is right
    var eventTargetChoice = document.querySelector(event.target);
    if (eventTargetChoice.className.indexOf('correct') > -1) {
        //2. correct answer count ++
        points++;
        console.log('current-points: ',points);
    }

    //3. if the answer choice is right then move to the next question
    questionIndex++;
    getQuestion();

}

var startButton = document.querySelector('#start');
startButton.addEventListener('click',startQuiz);
var choiceBtn = document.querySelector('.choice');
choiceBtn.addEventListener('click',answerButtonHandler);
