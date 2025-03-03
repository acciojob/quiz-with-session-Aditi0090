const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Austen", "Dickens"], answer: "Shakespeare" }
];

const questionContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuiz() {
    questionContainer.innerHTML = "";
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = option;
            input.checked = savedProgress[index] === option;
            input.addEventListener("change", () => {
                savedProgress[index] = option;
                sessionStorage.setItem("progress", JSON.stringify(savedProgress));
            });
            const label = document.createElement("label");
            label.textContent = option;
            questionDiv.appendChild(input);
            questionDiv.appendChild(label);
        });
        questionContainer.appendChild(questionDiv);
    });
}

submitButton.addEventListener("click", () => {
    let score = 0;
    questions.forEach((q, index) => {
        if (savedProgress[index] === q.answer) {
            score++;
        }
    });
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});

const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
    scoreDisplay.textContent = `Your last score was ${lastScore} out of 5.`;
}

// Initial rendering
renderQuiz();
