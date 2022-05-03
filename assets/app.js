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

let timer = 60;
let quizComplete = false;

//callback function
// this is a callback function

const handleTimerButton = () => {
  console.log("start button clicked");
  const updateTimerValue = () => {
    // increase the  timer by 1
    timer -= 1;

    // set text to new timer figures
    timerSpan.textContent = timer;

    // check if timer is 0
    if (timer === 0) {
      clearInterval(timerId);
    }
  };

  // start the timer
  const timerId = setInterval(updateTimerValue, 1000);
  console.log(timerId);
};

//adding event listener function as a higher order function
startButton.addEventListener("click", handleTimerButton);

document.getElementById("timer-span").addEventListener("click", () => {
  timer -= 5;
});

//declare the event handler function for start button click
const handleStartButtonClick = () => {
  startQuiz.remove();
  formSection.remove();

  // initialise local storage
  initializeLocalStorage();
  // render question
  renderQuestion();
};

// add event listener to start button
startButton.addEventListener("click", handleStartButtonClick);

let questionIndex = 0;
//questionindex this would reference the question in index 0 numbers

//will make a variable to store answers
const answers = [
  "JavaScript",
  "Scripting",
  "Brendan",
  "1995",
  "intentional absence of a value",
  "print a message",
];

//array
const questions = [
  {
    question: "What does JS stand for?",
    choices: ["JavaScript", "JavaSpeed", "JavaScripting"],
    answer: answers[0],
  },
  {
    question: "What type of language is JavaScript?",
    choices: ["Scripting", "styling", "operational"],
    answer: answers[1],
  },
  {
    question: "Who created JavaScript?",
    choices: ["Javed", "Daniel", "Brendan"],
    answer: answers[2],
  },

  {
    question: "When was JavaScript created?",
    choices: ["1995", "1982", "1992"],
    answer: answers[3],
  },

  {
    question: "What does null in JavaScript mean?",
    choices: ["null", "intentional absence of a value", "some value"],
    answer: answers[4],
  },

  {
    question: "What does console log mean?",
    choices: ["delete a message ", "print a message", "record a message"],
    answer: answers[5],
  },
];

//target main element
const mainElement = document.getElementById("main");

//function to handle the clicks on the answer choices from the object array
const handleChoiceClicked = (event) => {
  console.log("clicked something in the question section");
  //get current target
  const currentTarget = event.currentTarget;
  //get target
  const target = event.target;

  //make sure click is from the list-items li & if it is an li
  if (target.tagName === "LI") {
    //GET THE OPTION THE USER CLICKS ON
    const value = target.getAttribute("data-value");
    console.log(value);
    //get the answer from user
    const question = questions[questionIndex].text;
    console.log(question);
    //build and answer object that contains questions and answer
    const answer = {
      question,
      value,
    };
    //store the answers in the ls
    storeInLS("feedbackResults", answer);

    //take question off
    removeQuestions();
    //checking if the button is clicked
    console.log(answers);
    if (questionIndex < questions.length - 1) {
      //go to next question if not the last one
      questionIndex += 1;
      renderQuestions();
    } else {
      //if its the last question then render the results to go on highscore page
      //remove the last question as it cant be on the highscore page
      renderScores();
      renderForm();
    }
  }
};

const handleFormSubmission = (event) => {
  event.preventDefault();

  //full name input grab
  const fullName = document.getElementById("fullName").value;

  //validation
  if (fullName) {
    //store in ls if valid
    const feedbackResults = JSON.parse(localStorage.getItem("feedbackResults"));

    //object with fullName and results
    const result = {
      fullName,
      feedbackResults,
    };
    ///add them back into the ls
    storeInLS("allResults", result);

    //clear the feedbackResults
    localStorage.removeItem("feedbackResults");

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
  section.setAttribute("class", "form-section");
  section.setAttribute("id", "form-section");

  const form = document.createElement("form");

  const formDiv = document.createElement("form-items");
  formDiv.setAttribute("class", "form-items");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "fullName");
  input.setAttribute("placeholder", "Enter Full Name");

  formDiv.append(input);

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "button");

  const button = document.createElement("score-submit");
  button.setAttribute("class", "score-submit");
  button.textContent = "Submit Score";

  buttonDiv.append(button);
};

//FUNCTION TO MAKE QUESTIONS APPEAR
const renderQuestions = () => {
  console.log("render-questions");

  //get the current question
  const currentQuestion = questions[questionIndex];
  //the questions

  console.log(" questions ", currentQuestion);

  //create section
  const section = document.createElement("question-section");
  section.setAttribute("class", "question-section");

  //create h2 element
  const h2 = document.createElement("question-header");
  //set the h2 attribute
  section.setAttribute("class", "question-header");
  //set the text content what do you want in the h2
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.questions}`;

  //create the ul and add(append) 3 list answers
  const ul = document.createElement("list");
  //add a class attribute
  ul.setAttribute("class", "list");

  //create li item
  const li1 = document.createElement("list-items");
  //add a class attribute
  li1.setAttribute("class", "list-items");
  li1.setAttribute("data-value", currentQuestion.choices[0]);
  //append child list item  to the parent which is the  ul
  // add content to the list items which is the answers set the text content reference your array and the index
  li1.textContent = currentQuestion.choices[0];

  const li2 = document.createElement("list-items");
  li2.setAttribute("class", "list-items");
  li2.setAttribute("data-value", currentQuestion.choices[1]);
  li2.textContent = currentQuestion.choices[1];

  const li3 = document.createElement("list");
  li3.setAttribute("class", "list-items");
  li3.setAttribute("data-value", currentQuestion.choices[2]);
  li3.textContent = currentQuestion.choices[2];

  ul.append(li1, li2, li3);

  //append h2 and and the ul to the section
  section.append(h2, ul);
  //append the section to the document
  main.append(section);
  //add event listener on the questions section
  section.addEventListener("click", handleStartButtonClick);
};

//remove the questions from the page
const removeQuestion = () => {
  document.getElementById("question-section").remove();
};

const initializeLocalStorage = () => {
  //feedback from ls
  const feedbackResultsFromLs = JSON.parse(
    localStorage.getItem("feedbackResults")
  );

  const allResultsFromLs = JSON.parse(localStorage.getItem("allResults"));

  if (!feedbackResultsFromLs) {
    localStorage.setItem("feedbackResults", JSON.stringify([]));
  }

  if (!allResultsFromLs) {
    localStorage.setItem("allResults", JSON.stringify([]));
  }
};

const storeInLS = (key, value) => {
  const arrayLS = JSON.parse(localStorage.getItem(key));

  //add the answer to arrayls
  arrayLS.push(value);

  localStorage.setItem(key, JSON.stringify(arrayLS));
};

//add the click event listener on the start button
startButton.addEventListener("click", renderQuestions);
startButton.addEventListener("click", handleChoiceClicked);
