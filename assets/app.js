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
const scores = document.getElementById("scores");
const gameOver = document.getElementById("gameOver");
const betterLuckNextTime = document.getElementById("betterLuckNextTime");

let timer = 60;
let timerId;
let quizComplete = false;

let questionIndex = 0;
//questionindex this would reference the question in index 0 numbers

//array
const questions = [
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSpeed", "JavaScripting"],
    answer: "JavaScript",
  },
  {
    question: "What type of language is JavaScript?",
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

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

//callback function
// this is a callback function

const startTimer = () => {
  const updateTimerValue = () => {
    // increase the  timer by 1
    timer -= 1;

    // set text to new timer figures
    timerSpan.textContent = `Count Down ${timer > 0 ? timer : 0}`;

    // check if timer is 0
    if (timer <= 0) {
      clearInterval(timerId);

      removeQuestion();

      renderGameOver();
    } else {
    }
  };

  // start the timer
  timerId = setInterval(updateTimerValue, 1000);
};

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  console.log("start button clicked");
  removeBanner();
  timerSpan.textContent = `Count Down ${timer > 0 ? timer : 0}`;
  renderQuestions();
  startTimer();
};

const removeBanner = () => {
  startQuiz.remove();
};

//function to handle the clicks on the answer choices from the object array
const handleChoiceClicked = (event) => {
  console.log("clicked something in the question section");
  //get current target
  const currentTarget = event.currentTarget;
  console.log(currentTarget);
  //get target
  const target = event.target;
  console.log(target.tagName);

  //make sure click is from the list-items li & if it is an li
  if (target.tagName === "LI") {
    //GET THE OPTION THE USER CLICKS ON
    const userAnswer = target.getAttribute("data-value");
    console.log("answer", userAnswer);
    //get the answer from user
    const correctAnswer = questions[questionIndex].answer;
    console.log("correct answer", correctAnswer);

    // check answer
    if (userAnswer !== correctAnswer) {
      // deduct 5 seconds from timer
      timer -= 5;
    }

    questionSection.innerHTML = "";

    if (questionIndex < questions.length - 1) {
      //go to next question if not the last one
      questionIndex += 1;
      renderQuestions();
    } else {
      //if its the last question then render the results to go on highscore page
      //remove the last question as it cant be on the highscore page
      // renderScores();
      clearInterval(timerId);
      renderForm();
    }
  }
};

const renderGameOver = () => {
  //make elements in game over
  const h1 = document.createElement("h1");
  h1.setAttribute("class", "gameOver");
  h1.textContent = "Game Over";

  const h2 = document.createElement("h2");
  h2.setAttribute("class", "betterLuckNextTime");
  h2.textContent = "betterLuckNextTime";

  main.append(h1, h2);
};

const handleFormSubmission = (event) => {
  event.preventDefault();

  //full name input grab
  const fullName = document.getElementById("fullName").value;

  //validation
  if (fullName) {
    //store in ls if valid
    const highscores = readFromLocalStorage("highscores", []);

    //object with fullName and results
    const result = {
      fullName,
      score: timer,
    };

    highscores.push(result);

    ///add them back into the ls
    writeToLocalStorage("highscores", highscores);

    //remove the form
    document.getElementById("form-section").remove();
  } else {
    alert("enter your full name please");
  }
};

//show the results
const renderResults = () => {
  console.log("render results");
};

//function to render the submit form
const renderForm = () => {
  const section = document.createElement("form-section");
  section.setAttribute("class", "form-section position");
  section.setAttribute("id", "form-section");

  const form = document.createElement("form");

  const formDiv = document.createElement("form-items");
  formDiv.setAttribute("class", "form-items position");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "fullName");
  input.setAttribute("placeholder", "Enter Full Name");

  const button = document.createElement("button");
  button.setAttribute("class", "button");
  button.setAttribute("type", "submit");
  button.textContent = "Submit Score";

  formDiv.append(input, button);

  form.append(formDiv);

  section.append(form);

  main.append(section);

  form.addEventListener("submit", handleFormSubmission);
};

//FUNCTION TO MAKE QUESTIONS APPEAR
const renderQuestions = () => {
  console.log("render-questions");

  //get the current question
  const currentQuestion = questions[questionIndex];
  //the questions

  console.log(" questions ", currentQuestion);

  //create section
  const section = document.createElement("section");
  section.setAttribute("class", "question-section");

  //create h2 element
  const h2 = document.createElement("h2");
  //set the h2 attribute
  section.setAttribute("class", "question-header");
  //set the text content what do you want in the h2
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.question}`;

  //create the ul and add(append) 3 list answers
  const ul = document.createElement("ul");
  //add a class attribute
  ul.setAttribute("class", "list");

  //create li item
  const li1 = document.createElement("li");
  //add a class attribute
  li1.setAttribute("class", "list-items");
  li1.setAttribute("data-value", currentQuestion.choices[0]);
  //append child list item  to the parent which is the  ul
  // add content to the list items which is the answers set the text content reference your array and the index
  li1.textContent = currentQuestion.choices[0];

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-items");
  li2.setAttribute("data-value", currentQuestion.choices[1]);
  li2.textContent = currentQuestion.choices[1];

  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-items");
  li3.setAttribute("data-value", currentQuestion.choices[2]);
  li3.textContent = currentQuestion.choices[2];

  ul.append(li1, li2, li3);

  //append h2 and and the ul to the section
  section.append(h2, ul);
  //append the section to the document
  questionSection.append(section);
  // main.append(section);
  //add event listener on the questions section
  section.addEventListener("click", handleChoiceClicked);
};

//remove the questions from the page
const removeQuestion = () => {
  if (document.getElementById("question-section")) {
    document.getElementById("question-section").remove();
  }
};

// add event listener to start button
startButton.addEventListener("click", handleStartButtonClick);
