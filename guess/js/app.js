class AnimalGuessGame {
  constructor(words, totalWords = 10) {
    this.allWords = words.filter(w => w.length === 5);
    this.selectedWords = this.shuffleWords(this.allWords).slice(0, totalWords);
    this.currentWordIndex = 0;
    this.currentWord = '';
    this.guessedLetters = [];
    this.score = 0;
    this.hearts = 3;
    this.timer = 60;
    this.timerInterval = null;
    this.totalTime = 0;
    this.totalTimeInterval = null;

    this.qwertyLayout = [
      ['Q','W','E','R','T','Y','U','I','O','P'],
      ['A','S','D','F','G','H','J','K','L'],
      ['Z','X','C','V','B','N','M']
    ];

    // DOM elements
    this.guessInput = document.getElementById("guess");
    this.keyboardContainer = document.getElementById("keyboard");
    this.scoreSpan = document.getElementById("score");
    this.heartsSpan = document.getElementById("hearts");
    this.wordCountSpan = document.getElementById("word-count");
    this.timerSpan = document.getElementById("timer");
    this.startButton = document.getElementById("start-game");

    // Bind events
    this.startButton.addEventListener("click", () => this.startGame());
    document.addEventListener("keydown", (e) => {
      const letter = e.key.toUpperCase();
      // Only process A-Z keys
      if (
        letter.length === 1 &&
        letter >= 'A' && letter <= 'Z' &&
        !this.guessedLetters.includes(letter)
      ) {
        this.handleGuess(letter);
      }
      // Ignore all other keys (Enter, Backspace, etc.)
    });
  }

  shuffleWords(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  createKeyboard() {
    this.keyboardContainer.innerHTML = "";
    this.qwertyLayout.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("keyboard-row");
      row.forEach(letter => {
        const btn = document.createElement("button");
        btn.classList.add("letter-btn");
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.addEventListener("click", () => this.handleGuess(letter));
        rowDiv.appendChild(btn);
      });
      this.keyboardContainer.appendChild(rowDiv);
    });
  }

  disableKey(letter) {
    const btn = document.querySelector(`.letter-btn[data-letter="${letter}"]`);
    if (btn) btn.disabled = true;
  }

  updateDisplayWord() {
    const guessWordDiv = document.getElementById("guess-word");
    guessWordDiv.innerHTML = "";
    this.currentWord.split("").forEach(char => {
      const box = document.createElement("div");
      box.className = "guess-box";
      box.textContent = this.guessedLetters.includes(char) ? char : "*";
      guessWordDiv.appendChild(box);
    });
  }

  handleGuess(letter) {
    if (this.guessedLetters.includes(letter)) return;

    this.guessedLetters.push(letter);
    this.disableKey(letter);

    if (this.currentWord.includes(letter)) {
      this.updateDisplayWord();

      if (this.currentWord.split("").every(c => this.guessedLetters.includes(c))) {
        this.score++;
        this.scoreSpan.textContent = this.score;
        this.nextWord();
      }
    } else {
      if (--this.hearts === 0) {
        this.endGame("Game Over! You lost all lives.");
      }
      this.heartsSpan.textContent = this.hearts;
    }
  }

  nextWord() {
    clearInterval(this.timerInterval);
    if (this.currentWordIndex + 1 >= this.selectedWords.length) {
      // Only show modal if all words are guessed
      if (this.currentWordIndex + 1 === this.selectedWords.length) {
        this.currentWordIndex++; // Increment to show 10/10 in modal
        this.wordCountSpan.textContent = this.currentWordIndex;
        this.updateWordProgress();
        this.endGame("Congratulations! You guessed all animals.");
      }
      return;
    }
    this.currentWordIndex++;
    this.wordCountSpan.textContent = this.currentWordIndex; // Show progress before next word
    this.updateWordProgress();
    this.startNewWord();
  }

  startNewWord() {
    this.currentWord = this.selectedWords[this.currentWordIndex];
    this.guessedLetters = [];
    this.timer = 60;
    this.timerSpan.textContent = this.timer;
    this.createKeyboard();
    this.updateDisplayWord();
    this.updateWordProgress();
    this.startTimer();
  }

  updateWordProgress() {
    const wordCount = this.currentWordIndex;
    const totalWords = this.selectedWords.length;
    document.getElementById('word-count').textContent = wordCount;
    document.getElementById('word-progress').style.width = `${(wordCount/totalWords)*100}%`;
    document.getElementById('word-progress').setAttribute('aria-valuenow', wordCount);
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.timerSpan.textContent = this.timer;

      if (this.timer === 0) {
        clearInterval(this.timerInterval);
        this.hearts--;
        this.heartsSpan.textContent = this.hearts;

        if (this.hearts === 0) {
          this.endGame("Time's up! You lost all lives.");
        } else {
          // Only reset timer and guessed letters, do NOT advance progress
          this.guessedLetters = [];
          this.timer = 60;
          this.timerSpan.textContent = this.timer;
          this.createKeyboard();
          this.updateDisplayWord();
          this.startTimer();
        }
      }
    }, 1000);
  }

  startGame() {
    this.startButton.textContent = "Restart Game";
    this.score = 0;
    this.hearts = 3;
    this.timer = 60;
    this.currentWordIndex = 0;
    this.wordCountSpan.textContent = 0; // Start at 0
    this.scoreSpan.textContent = 0;
    this.heartsSpan.textContent = 3;
    this.timerSpan.textContent = 60;
    this.updateWordProgress(); // Set progress bar to 0

    // Start total time tracking
    this.totalTime = 0;
    clearInterval(this.totalTimeInterval);
    this.totalTimeInterval = setInterval(() => this.totalTime++, 1000);

    this.startNewWord();
  }

  endGame(message) {
    clearInterval(this.timerInterval);
    clearInterval(this.totalTimeInterval);

    // Set values in modal
    document.getElementById("modalScore").textContent = this.score;
    document.getElementById("modalLives").textContent = this.hearts;
    document.getElementById("modalWords").textContent = this.currentWordIndex;
    document.getElementById("modalTime").textContent = this.totalTime;

    // Show Bootstrap modal
    const summaryModal = new bootstrap.Modal(document.getElementById('gameSummaryModal'));
    summaryModal.show();
  }
}

// Words list
const allAnimalWords = [
  "HORSE", "SHEEP", "BISON", "LLAMA", "TIGER", 
  "RAVEN", "PANDA", "SHARK", "CRANE", "OTTER",
];

// Instantiate the game
const game = new AnimalGuessGame(allAnimalWords);

console.log("Animal Guess Game Initialized!");
console.log("Randomized 10 animals:", game.selectedWords);