function renderQuestions() {
  questionsElement.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionContainer = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      // Ensure the checked state is set before adding to the DOM
      if (savedProgress[i] === choice) {
        choiceElement.checked = true; 
      }

      choiceElement.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      questionContainer.appendChild(choiceElement);
      questionContainer.appendChild(choiceLabel);
    }
    questionsElement.appendChild(questionContainer);
  }
}
