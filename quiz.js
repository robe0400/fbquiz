const questions = [
    { question: "What team won the Super Bowl in 2021?", options: ["Tampa Bay Buccaneers", "Kansas City Chiefs", "Green Bay Packers"], answer: "Tampa Bay Buccaneers" },
    { question: "How many points is a touchdown worth?", options: ["3", "6", "7"], answer: "6" },
    { question: "What is the name of the NFL championship game?", options: ["World Series", "Stanley Cup", "Super Bowl"], answer: "Super Bowl" },
    { question: "How many players are on the field for each team?", options: ["11", "12", "10"], answer: "11" },
    { question: "What color are the goal posts?", options: ["White", "Yellow", "Blue"], answer: "Yellow" },
    { question: "What are the officials called?", options: ["Judges", "Referees", "Umpires"], answer: "Referees" },
    { question: "How many yards for a first down?", options: ["5", "10", "15"], answer: "10" },
    { question: "What is the area called where touchdowns are scored?", options: ["End Zone", "Goal Line", "Touchline"], answer: "End Zone" },
    { question: "What is it called when the defense catches a pass?", options: ["Interception", "Fumble", "Sack"], answer: "Interception" },
    { question: "How many quarters are in a football game?", options: ["2", "3", "4"], answer: "4" },
    { question: "What is the length of a football field?", options: ["80 yards", "100 yards", "120 yards"], answer: "100 yards" },
    { question: "What is the name of the NFL's championship trophy?", options: ["Heisman Trophy", "Lombardi Trophy", "Stanley Cup"], answer: "Lombardi Trophy" },
    { question: "Who is the NFL's all-time leading rusher?", options: ["Walter Payton", "Emmitt Smith", "Barry Sanders"], answer: "Emmitt Smith" },
    { question: "What position does Tom Brady play?", options: ["Wide Receiver", "Running Back", "Quarterback"], answer: "Quarterback" },
    { question: "Which team has the most Super Bowl wins?", options: ["Pittsburgh Steelers", "Dallas Cowboys", "New England Patriots"], answer: "Pittsburgh Steelers" },
    { question: "What is a safety worth?", options: ["1 point", "2 points", "3 points"], answer: "2 points" },
    { question: "How long is the halftime break?", options: ["10 minutes", "12 minutes", "15 minutes"], answer: "12 minutes" },
    { question: "What is the home of the Dallas Cowboys?", options: ["Lambeau Field", "AT&T Stadium", "MetLife Stadium"], answer: "AT&T Stadium" },
    { question: "Who was the MVP of Super Bowl 50?", options: ["Tom Brady", "Von Miller", "Peyton Manning"], answer: "Von Miller" },
    { question: "Which team is known as the 'Cheeseheads'?", options: ["Chicago Bears", "Minnesota Vikings", "Green Bay Packers"], answer: "Green Bay Packers" },
    { question: "What is the name of Miami's NFL team?", options: ["Miami Marlins", "Miami Heat", "Miami Dolphins"], answer: "Miami Dolphins" },
    { question: "How many points is a field goal worth?", options: ["2", "3", "4"], answer: "3" }
];

let currentQuestionIndex = 0;
let score = 0;
let firstDowns = 0;

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('score');
    const yardlineElement = document.getElementById('yardline');

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
        speak("Quiz Over! Well done!");
    }

    scoreElement.textContent = `Score: ${score} yards`;
    yardlineElement.style.bottom = `${score}px`;
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10;
        firstDowns++;
        if (firstDowns === 4) {
            score += 40; // Touchdown (end zone)
            firstDowns = 0;
            speak("Touchdown! You gained 50 yards!");
        } else {
            speak("Correct! You gained 10 yards and got a first down!");
        }
    } else {
        firstDowns = 0;
        speak("Incorrect! It's an incomplete pass.");
    }
    currentQuestionIndex++;
    showQuestion();
}

showQuestion();
