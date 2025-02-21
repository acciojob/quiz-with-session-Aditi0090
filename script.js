const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Gorilla"],
        answer: "Blue Whale"
    },
    {
        question: "Which is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        answer: "2"
    }
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

function loadProgress() {
    const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach(option => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            if (savedProgress[`question${index}`] === option) {
                input.checked = true;
            }
            input.addEventListener("change", () => saveProgress(index, option));

            const label = document.createElement("label");
            label.textContent = option;

            questionDiv.appendChild(input);
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(questionDiv);
    });

    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        scoreDisplay.textContent = `Your last score: ${storedScore} out of 5`;
    }
}

function saveProgress(questionIndex, selectedOption) {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[`question${questionIndex}`] = selectedOption;
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

function calculateScore() {
    let score = 0;
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

    questions.forEach((q, index) => {
        if (progress[`question${index}`] === q.answer) {
            score++;
        }
    });

    scoreDisplay.textContent = `Your score is ${score} out of 5`;
    localStorage.setItem("score", score);
}

loadProgress();

submitButton.addEventListener("click", calculateScore);
