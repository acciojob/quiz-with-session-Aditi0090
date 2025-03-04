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

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

const questionElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

function renderQuestions() {
  questionElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceContainer = document.createElement("div");
      const choiceInput = document.createElement("input");

      choiceInput.setAttribute("type", "radio");
      choiceInput.setAttribute("name", `question-${i}`);
      choiceInput.setAttribute("value", choice);
      choiceInput.id = `question-${i}-choice-${j}`;

      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      choiceInput.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        
        // Ensure the checked attribute updates immediately
        document.querySelectorAll(`input[name='question-${i}']`).forEach(input => {
          input.checked = input.value === choice;
        });
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.setAttribute("for", choiceInput.id);
      choiceLabel.textContent = choice;

      choiceContainer.appendChild(choiceInput);
      choiceContainer.appendChild(choiceLabel);
      questionContainer.appendChild(choiceContainer);
    }
    questionElement.appendChild(questionContainer);
  }
}

submitButton.addEventListener("click", function () {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Display stored score if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your last score was ${savedScore} out of 5.`;
}

renderQuestions();
