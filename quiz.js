const questions = [
    {
        question: "Which NFL team has won the most Super Bowls?",
        options: ["Green Bay Packers", "New England Patriots", "Pittsburgh Steelers"],
        answer: "New England Patriots"
    },
    {
        question: "Who holds the NFL record for most career passing yards?",
        options: ["Tom Brady", "Peyton Manning", "Drew Brees"],
        answer: "Tom Brady"
    },
    {
        question: "What is the distance between yard lines on a football field?",
        options: ["5 yards", "10 yards", "15 yards"],
        answer: "10 yards"
    },
    {
        question: "How many points is a field goal worth?",
        options: ["2 points", "3 points", "4 points"],
        answer: "3 points"
    },
    {
        question: "Which team won the first Super Bowl?",
        options: ["Green Bay Packers", "Kansas City Chiefs", "New York Jets"],
        answer: "Green Bay Packers"
    },
    {
        question: "What is the NFL's overtime period length in regular season games?",
        options: ["10 minutes", "15 minutes", "Until someone scores"],
        answer: "10 minutes"
    },
    {
        question: "How many players are on the field per team during a play?",
        options: ["9", "11", "12"],
        answer: "11"
    },
    {
        question: "What is the maximum number of players allowed on an NFL team's roster?",
        options: ["45", "53", "60"],
        answer: "53"
    },
    {
        question: "Which NFL team is known as 'America's Team'?",
        options: ["Dallas Cowboys", "New England Patriots", "Green Bay Packers"],
        answer: "Dallas Cowboys"
    },
    {
        question: "What is the name of the NFL's championship trophy?",
        options: ["Vince Lombardi Trophy", "Super Bowl Trophy", "NFL Championship Cup"],
        answer: "Vince Lombardi Trophy"
    }
];

class GameState {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.down = 1;
        this.yardsToGo = 10;
        this.incompletePasses = 0;
        this.hasPossession = true;
        this.playerPosition = 10;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.down = 1;
        this.yardsToGo = 10;
        this.incompletePasses = 0;
        this.hasPossession = true;
        this.playerPosition = 10;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('down').textContent = this.down;
        document.getElementById('yardsToGo').textContent = this.yardsToGo;
        document.getElementById('score').textContent = this.score;
        document.getElementById('possession').textContent = this.hasPossession ? 'Offense' : 'Defense';
        document.getElementById('incompletePasses').textContent = this.incompletePasses;
        
        const player = document.getElementById('player');
        player.style.left = `${this.playerPosition}%`;
    }
}

const game = new GameState();

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

function showMessage(text, duration = 2000) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, duration);
}

function handleCorrectAnswer() {
    game.score += 10;
    game.playerPosition += 10;
    game.down = 1;
    game.yardsToGo = 10;
    
    const player = document.getElementById('player');
    player.classList.add('celebrate');
    setTimeout(() => player.classList.remove('celebrate'), 1000);
    
    showMessage('First Down!');
    speak('First Down!');
}

function handleIncompletePass() {
    game.incompletePasses++;
    game.down++;
    
    if (game.incompletePasses >= 4) {
        game.hasPossession = false;
        showMessage('Turnover!');
        speak('Turnover on downs!');
        setTimeout(() => {
            game.reset();
            showQuestion();
        }, 2000);
    } else {
        showMessage('Incomplete Pass!');
        speak('Incomplete Pass!');
    }
}

function showQuestion() {
    if (game.currentQuestionIndex >= questions.length) {
        showMessage('Game Over! Final Score: ' + game.score);
        speak('Game Over! Final Score: ' + game.score);
        return;
    }

    const question = questions[game.currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    speak(question.question);
    game.updateDisplay();
}

function checkAnswer(selectedOption) {
    const question = questions[game.currentQuestionIndex];
    if (selectedOption === question.answer) {
        handleCorrectAnswer();
    } else {
        handleIncompletePass();
    }
    
    game.currentQuestionIndex++;
    game.updateDisplay();
    setTimeout(showQuestion, 1500);
}

document.getElementById('startGame').onclick = () => {
    game.reset();
    showQuestion();
};

// Initialize the game
game.updateDisplay();
