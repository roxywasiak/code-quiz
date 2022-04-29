//
const startQuiz = document.getElementById("start-quiz");
const startButton = document.getElementById("start-button");
const questionSection = document.getElementById("question-section");
const questionHeader = document.querySelector(".question-header");
const answerList = document.getElementById("list");
// const timer = document.querySelector("timer");
const timerSpan = document.getElementById("timer-span");
const main = document.getElementById("main");
const formSection = document.getElementById("form-section");

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
const answers = [
  "JavaScript",
  "Scripting",
  "Brendan",
  "1995",
  "intentional absence of a value",
  "print a message",
];

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
    question: "When was JavaScript created?",
    choices: ["1995", "1982", "1992"],
    answer: "1995",
  },

  {
    question: "What does null in JavaScript mean?",
    choices: ["null", "intentional absence of a value", "some value"],
    answer: "intentional absence of a value",
  },

  {
    question: "What does console log mean?",
    choices: ["delete a message ", "print a message", "record a message"],
    answer: "print a message",
  },
];

//target main element
const mainElement = document.getElementById("main");

//current question index

const renderQuestions = () => {
  console.log("render-questions");
  //create section
  const section = document.createElement("question-section");
  section.setAttribute("class", "question-section");

  //create h2 element
  const h2 = document.createElement("question-header");
  //set the h2 attribute
  section.setAttribute("class", "question-header");
  //set the text content what do you want in the h2
  h2.textContent = "Answer the question";

  //create the ul and add(append) 3 list answers
  const ul = document.createElement("list");
  //add a class attribute
  ul.setAttribute("class", "list");

  // loop over options to create and append ui to ul

  //create li item
  const li1 = document.createElement("list-items");
  //add a class attribute
  li1.setAttribute("class", "list-items");
  //append child list item  to the parent which is the  ul
  // add content to the list items which is the answers set the text content reference your array and the index
  li1.textContent = "A";

  const li2 = document.createElement("list-items");
  li2.setAttribute("class", "list-items");
  li2.textContent = "B";

  const li3 = document.createElement("list");
  li3.setAttribute("class", "list-items");
  li3.textContent = "C";

  ul.append(li1, li2, li3);

  //append h2 and and the ul to the section
  section.append(h2, ul);
  //append the section to the document
  main.append(section);
};

startButton.removeEventListener("click", renderQuestions);

//add the click event listener on the start button
startButton.addEventListener("click", renderQuestions);

//when the page loads to the browser
// const onLoad = () => {};

// const startTimer = () => {
//   timerValue--;
//   timer.textContent = " " + timerValue + " seconds ";

//another function to execute every second
// const countdown = () => {
//   //decrease the time
//   // if quizComplete is true then stop the timer
//   // check if timer reaches 0
//   //if true then game is over
// };

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
