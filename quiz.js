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
        this.currentSpeech = null;
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
        
        const playerContainer = document.querySelector('.player-container');
        playerContainer.style.left = `${this.playerPosition}%`;
    }

    stopSpeaking() {
        if (this.currentSpeech) {
            speechSynthesis.cancel();
        }
    }
}

const game = new GameState();

function speak(text) {
    game.stopSpeaking();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    game.currentSpeech = speech;
    speechSynthesis.speak(speech);
}

function readCurrentQuestion() {
    const question = questions[game.currentQuestionIndex];
    speak(question.question);
    setTimeout(() => {
        speak("The options are:");
        question.options.forEach((option, index) => {
            setTimeout(() => speak(option), (index + 1) * 2000);
        });
    }, 2000);
}

function showMessage(text, duration = 2000) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, duration);
}

function movePlayer() {
    const player = document.querySelector('.player-container');
    player.style.transition = 'left 1s ease';
    player.style.left = `${game.playerPosition}%`;
    
    const sprite = document.querySelector('.sprite');
    sprite.style.animation = 'run-animation 0.5s steps(6) infinite';
    
    setTimeout(() => {
        sprite.style.animation = 'none';
    }, 1000);
}

function handleCorrectAnswer() {
    game.score += 10;
    game.playerPosition += 10;
    game.down = 1;
    game.yardsToGo = 10;
    
    movePlayer();
    
    const player = document.getElementById('player');
    player.classList.add('celebrate');
    setTimeout(() => player.classList.remove('celebrate'), 1000);
    
    showMessage('First Down!');
    speak('First Down! Great job!');
}

function handleIncompletePass() {
    game.down++;
    
    if (game.down > 4) {
        game.incompletePasses++;
        showMessage('Turnover on downs!');
        speak('Turnover on downs! Try again!');
        setTimeout(() => {
            game.reset();
            showQuestion();
        }, 2000);
    } else {
        showMessage('Incomplete Pass! Try again!');
        speak('Incomplete Pass! Try again!');
        // Don't increment currentQuestionIndex here to allow retry
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
        button.onclick = () => checkAnswer(option, button);
        optionsContainer.appendChild(button);
    });

    readCurrentQuestion();
    game.updateDisplay();
}

function checkAnswer(selectedOption, button) {
    const question = questions[game.currentQuestionIndex];
    if (selectedOption === question.answer) {
        button.classList.add('correct');
        handleCorrectAnswer();
        game.currentQuestionIndex++;
        setTimeout(showQuestion, 1500);
    } else {
        button.classList.add('incorrect');
        handleIncompletePass();
        setTimeout(() => {
            button.classList.remove('incorrect');
        }, 1500);
    }
    
    game.updateDisplay();
}

document.getElementById('startGame').onclick = () => {
    game.reset();
    showQuestion();
};

document.getElementById('readQuestion').onclick = () => {
    readCurrentQuestion();
};

// Initialize the game
game.updateDisplay();
