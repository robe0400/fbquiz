const questions = [
    {
        question: "What team won the Super Bowl in 2021?",
        options: ["Tampa Bay Buccaneers", "Kansas City Chiefs", "Green Bay Packers"],
        answer: "Tampa Bay Buccaneers"
    },
    {
        question: "How many points is a touchdown worth?",
        options: ["3", "6", "7"],
        answer: "6"
    },
    {
        question: "What is the name of the NFL championship game?",
        options: ["World Series", "Stanley Cup", "Super Bowl"],
        answer: "Super Bowl"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('score');

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsElement.appendChild(button);
        });
        speak(question.question);
    } else {
        questionElement.textContent = "Quiz Over! Well done!";
        optionsElement.innerHTML = '';
    }

    scoreElement.textContent = `Score: ${score} yards`;
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10;
        speak("Correct! You gained 10 yards and got a first down!");
    } else {
        speak("Incorrect! It's an incomplete pass.");
    }
    currentQuestionIndex++;
    showQuestion();
}

showQuestion();
