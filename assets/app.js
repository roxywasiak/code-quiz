//
const startQuiz = document.getElementById("start-quiz");
const startButton = document.getElementById("start-button");
const questionSection = document.getElementById("question-section");
const questionHeader = document.querySelector(".question-header");
const answerList = document.getElementById("list");
// const timer = document.getElementById("timer");
const timerSpan = document.getElementById("timer-span");

// questionSection.style.display = "none";
// let timeLeft;

// startButton.addEventListener("click", function () {
//   startQuiz.remove();
//   questionSection.style.display = "block";
//   timeLeft = setInterval(startTimer, 1000);
// });
let timer = 100;

//callback function
// this is a callback function
const handleStartButtonClick = () => {
  console.log("start button clicked");

  const updateTimerValue = () => {
    // increase the  timer by 1
    timer -= 1;

    // set text to new timer figures
    timerSpan.textContent = timer;

    // check if timer is equal to 10
    if (timer === 0) {
      clearInterval(timerId);
    }
  };

  // start the timer
  const timerId = setInterval(updateTimerValue, 1000);
  console.log(timerId);
};

//adding event listener function as a higer order function
startButton.addEventListener("click", handleStartButtonClick);

document.getElementById("timer-span").addEventListener("click", () => {
  timer -= 5;
});

let questionIndex = 0;
//questions[quesionIndex].question -> this would reference the question in index 0
//the answers
const choices = ["A", "B", "C"];

//will make a variable to store answers
const answers = [];

//gloabal declarations
const questions = [
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSpeed", "JavaScripting"],
    answer: "JavaScript",
  },
  {
    question: "When type of language is JavaScript?",
    choices: ["Scripting", "styling", "operational"],
    answer: "Scripting",
  },
  {
    question: "Who created JavaScript?",
    choices: ["Javed", "Daniel", "Brendan"],
    answer: "Brendan",
  },

  {
    question: "",
    choices: ["JavaScript", "JavaSpeed"],
    answer: "JavaScript",
  },

  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSpeed"],
    answer: "JavaScript",
  },

  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSpeed"],
    answer: "JavaScript",
  },
];

// let timerValue = 10 * questions.length;
// let quizComplete;
const renderQuestions = () => {
  console.log("render-questions");
  //create section
  const section = document.createElementById("question-section");
  section.setAttribute("class", "question-section");
  //create h2 element
  const h2 = document.createElementById("question-header");
  section.setAttribute("class", "question-header");
  //todo this needs to change as it is hardcoded for now
  h2.textContent = "Answer the question";
  //create the ul and add(append) 3 list answers
  const ul = document.createElementById("list");
};

//when the page loads to the browser
const onLoad = () => {};

const removeStartSection = () => {};

// const startTimer = () => {
//   timerValue--;
//   timer.textContent = " " + timerValue + " seconds ";

//another function to execute every second
const countdown = () => {
  //decrease the time
  // if quizComplete is true then stop the timer
  // check if timer reaches 0
  //if true then game is over
};
//set interval of 1000ms (1s)

// on click which calls a fiunction called startQuiz
// inside that function you're going to start the timer then you wiould call another function which presents the first question
// displayQuestion function ->
// get the first questions values and stuff using questionIdex -> create an element and set the textContent of that element as the question and put it in the html
// for loop -> loop over the choices. questions[questionIndex].choices -> looping over the choices array and creating buttons for each choice
// each of these buttons would have a 'value' attribute they will also have an onclick -> when clicked another function to check answer will be triggered
// validateAnswer function -> if this.value === questions[questionIndex].answer then they answered correctly else incorrectly
// after checking answer = increment questionindex and if questionIndex isnt larger than questions.length call display question again
//if it is the same as question.length we would call another function which ends the quiz -> end timer, get the users score, display and let them submit details
// after submission - render hghscores page.
