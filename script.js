const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load progress from session storage
const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[index] === choice) {
        choiceElement.checked = true;
      }

      choiceElement.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionElement.appendChild(label);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Submit quiz and calculate score
submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Show previous score if available
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

// Render the quiz
renderQuestions();
