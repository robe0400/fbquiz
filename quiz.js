// ... continuing from previous code ...

    readQuestion() {
        const speech = new SpeechSynthesisUtterance(this.currentQuestion.question);
        speechSynthesis.speak(speech);
    }

    readOption(option) {
        const speech = new SpeechSynthesisUtterance(option);
        speechSynthesis.speak(speech);
    }

    startPlayClock() {
        if (this.playClockInterval) clearInterval(this.playClockInterval);
        this.playClock = 40;
        document.getElementById('playClock').textContent = this.playClock;
        
        this.playClockInterval = setInterval(() => {
            this.playClock--;
            document.getElementById('playClock').textContent = this.playClock;
            
            if (this.playClock <= 0) {
                this.handleDelayOfGame();
            }
        }, 1000);
    }

    handleDelayOfGame() {
        clearInterval(this.playClockInterval);
        this.soundManager.play('whistle');
        this.showMessage('Delay of Game - 5 Yard Penalty');
        this.yardsToGo += 5;
        this.updateDisplay();
        setTimeout(() => this.selectQuestion(), 2000);
    }

    checkAnswer(selectedOption) {
        clearInterval(this.playClockInterval);
        const isCorrect = selectedOption === this.currentQuestion.answer;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
    }

    handleCorrectAnswer() {
        const yards = this.currentQuestion.yards || 10;
        this.ballPosition += yards;
        this.yardsToGo -= yards;
        this.score += yards;
        
        this.soundManager.play('cheer');
        
        const playerSprite = document.querySelector('.player-sprite');
        playerSprite.classList.add('running');
        
        if (this.ballPosition >= 100) {
            this.handleTouchdown();
        } else if (this.yardsToGo <= 0) {
            this.handleFirstDown();
        } else {
            this.down++;
            if (this.down > 4) {
                this.handleTurnover();
            }
        }
        
        this.updateDisplay();
        setTimeout(() => {
            playerSprite.classList.remove('running');
            this.selectQuestion();
        }, 1500);
    }

    handleIncorrectAnswer() {
        this.soundManager.play('whistle');
        this.down++;
        this.showMessage('Incomplete Pass!');
        
        if (this.down > 4) {
            this.handleTurnover();
        } else {
            this.updateDisplay();
            setTimeout(() => this.selectQuestion(), 1500);
        }
    }

    handleTouchdown() {
        this.score += 7; // Touchdown + extra point
        this.soundManager.play('touchdown');
        this.showMessage('TOUCHDOWN! +7 Points');
        this.resetDrivePosition();
    }

    handleFirstDown() {
        this.soundManager.play('firstDown');
        this.showMessage('FIRST DOWN!');
        this.down = 1;
        this.yardsToGo = 10;
    }

    handleTurnover() {
        this.soundManager.play('whistle');
        this.showMessage('Turnover on Downs!');
        this.resetDrivePosition();
    }

    resetDrivePosition() {
        this.down = 1;
        this.yardsToGo = 10;
        this.ballPosition = 20;
    }

    showMessage(text) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 2000);
    }

    endGame() {
        clearInterval(this.gameInterval);
        clearInterval(this.playClockInterval);
        this.showTrophy();
    }

    showTrophy() {
        const trophyContainer = document.createElement('div');
        trophyContainer.className = 'trophy-container';
        
        let trophyType, message;
        if (this.score >= 400) {
            trophyType = 'mvp';
            message = 'NFL MVP! You\'re a Legend!';
        } else if (this.score >= 300) {
            trophyType = 'all-pro';
            message = 'All-Pro! Outstanding Performance!';
        } else if (this.score >= 200) {
            trophyType = 'pro';
            message = 'Pro Bowl Caliber!';
        } else if (this.score >= 100) {
            trophyType = 'rookie';
            message = 'Rookie of the Year!';
        } else {
            trophyType = 'practice';
            message = 'Keep Practicing!';
        }

        trophyContainer.innerHTML = `
            <div class="trophy-popup">
                <img src="images/${trophyType}-trophy.png" alt="${trophyType} Trophy">
                <h2>${message}</h2>
                <p>Final Score: ${this.score}</p>
                <button class="play-again">Play Again</button>
            </div>
        `;

        document.body.appendChild(trophyContainer);
        this.soundManager.play('victory');

        trophyContainer.querySelector('.play-again').addEventListener('click', () => {
            trophyContainer.remove();
            this.startGame();
        });
    }
}

// All the recent NFL questions (2020 onwards)
const questions = [
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Who kicked the game-winning field goal for the Chiefs in the 2024 AFC Championship against the Ravens?",
        options: ["Harrison Butker", "Justin Tucker", "Jake Moody"],
        answer: "Harrison Butker",
        yards: 15
    },
    {
        type: 'pass',
        difficulty: 'long',
        question: "Which Lions receiver caught 2 touchdowns in their 2024 playoff win against the Rams?",
        options: ["Amon-Ra St. Brown", "Josh Reynolds", "Sam LaPorta"],
        answer: "Sam LaPorta",
        yards: 20
    },
    {
        type: 'run',
        difficulty: 'medium',
        question: "Who scored the game-winning touchdown for the Chiefs against the Bills in the 2024 Divisional Round?",
        options: ["Isiah Pacheco", "Patrick Mahomes", "Travis Kelce"],
        answer: "Isiah Pacheco",
        yards: 12
    },
    {
        type: 'pass',
        difficulty: 'long',
        question: "Which 49ers player caught the game-winning TD in the 2024 Divisional Round against the Packers?",
        options: ["Christian McCaffrey", "George Kittle", "Brandon Aiyuk"],
        answer: "Christian McCaffrey",
        yards: 20
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Who caught the game-winning touchdown in Super Bowl LVIII (2024)?",
        options: ["Mecole Hardman Jr.", "Travis Kelce", "Rashee Rice"],
        answer: "Mecole Hardman Jr.",
        yards: 15
    },
    {
        type: 'run',
        difficulty: 'short',
        question: "Which 49ers running back emerged as a star in 2023?",
        options: ["Christian McCaffrey", "Elijah Mitchell", "Jordan Mason"],
        answer: "Christian McCaffrey",
        yards: 8
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Which rookie quarterback was drafted first overall by the Panthers in 2023?",
        options: ["Bryce Young", "C.J. Stroud", "Anthony Richardson"],
        answer: "Bryce Young",
        yards: 15
    },
    {
        type: 'pass',
        difficulty: 'short',
        question: "Who won NFL MVP in 2023?",
        options: ["Patrick Mahomes", "Josh Allen", "Lamar Jackson"],
        answer: "Lamar Jackson",
        yards: 10
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Which receiver broke the single-season receiving yards record in 2023?",
        options: ["Justin Jefferson", "Tyreek Hill", "CeeDee Lamb"],
        answer: "Tyreek Hill",
        yards: 15
    },
    {
        type: 'run',
        difficulty: 'medium',
        question: "Which rookie running back for the Falcons had a breakout season in 2023?",
        options: ["Bijan Robinson", "Jahmyr Gibbs", "Kendre Miller"],
        answer: "Bijan Robinson",
        yards: 12
    },
    {
        type: 'pass',
        difficulty: 'short',
        question: "Who won Offensive Rookie of the Year in 2023?",
        options: ["C.J. Stroud", "Anthony Richardson", "Bryce Young"],
        answer: "C.J. Stroud",
        yards: 10
    },
    {
        type: 'run',
        difficulty: 'medium',
        question: "Which Lions running back helped lead them to the NFC Championship in 2023?",
        options: ["Jahmyr Gibbs", "David Montgomery", "D'Andre Swift"],
        answer: "Jahmyr Gibbs",
        yards: 15
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Who threw the game-winning touchdown in the Bills vs Steelers 2024 playoff game?",
        options: ["Josh Allen", "Kenny Pickett", "Mason Rudolph"],
        answer: "Josh Allen",
        yards: 15
    },
    {
        type: 'pass',
        difficulty: 'medium',
        question: "Which Packers receiver had 2 touchdowns in their 2024 playoff win against the Cowboys?",
        options: ["Romeo Doubs", "Christian Watson", "Jayden Reed"],
        answer: "Romeo Doubs",
        yards: 15
    }
];

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new NFLQuizGame();
});