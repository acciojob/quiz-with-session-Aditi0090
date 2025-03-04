const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    }
];

const questionsContainer = document.getElementById('questions');
const scoreDisplay = document.getElementById('score');
const submitButton = document.getElementById('submit');

// Load questions and previous selections
function loadQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h2>${q.question}</h2>`;
        
        q.options.forEach((option, i) => {
            const checked = sessionStorage.getItem('progress') ? JSON.parse(sessionStorage.getItem('progress'))[index] === i : false;
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}" ${checked ? 'checked' : ''}>
                    ${option}
                </label><br>
            `;
        });
        
        questionsContainer.appendChild(questionDiv);
    });
}

// Save progress to session storage
function saveProgress() {
    const progress = [];
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        progress[index] = selectedOption ? parseInt(selectedOption.value) : null;
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Calculate score
function calculateScore() {
    let score = 0;
    const progress = JSON.parse(sessionStorage.getItem('progress'));
    
    questions.forEach((q, index) => {
        if (progress[index] !== null && progress[index] === q.answer) {
            score++;
        }
    });
    
    return score;
}

// Handle quiz submission
submitButton.addEventListener('click', () => {
    saveProgress();
    const score = calculateScore();
    scoreDisplay.innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
});

// Load quiz on page load
window.onload = () => {
    loadQuiz();
    const savedScore = localStorage.getItem('score');
    if (savedScore !== null) {
        scoreDisplay.innerText = `Your last score was ${savedScore} out of ${questions.length}.`;
    }
};