let selectedNumber; 
let minRange = 1;
let maxRange = 100;
let maxAttempts = 10;
let attempts = 0;
let currentLevel=1;
let startTime, endTime;

const selectedNumberDisplay = document.getElementById('selected_number_display');
const guessedNumberDisplay = document.getElementById('guessed_number_display');
const submit = document.getElementById('submit');
const nextLevel= document.getElementById('continue');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNewLevel() {
    maxRange = Math.max(minRange + 10, Math.floor(maxRange * 0.8)); 
    selectedNumber = getRandomNumber(minRange, maxRange); 
    attempts = 0;
    currentLevel++;
    submit.disabled= false;
    nextLevel.disabled= true;
    selectedNumberDisplay.textContent = `Welcome to Level ${currentLevel}: Guess a number between ${minRange} and ${maxRange}.`;
    guessedNumberDisplay.textContent = "";
    startTime = new Date();
}

function guessNumber() {
    submit.addEventListener('click', () => {
        const guessedNumber = Number(document.getElementById('guessed_number').value);
        if (guessedNumber < minRange || guessedNumber > maxRange) {
            guessedNumberDisplay.textContent = `Choose a number between ${minRange} and ${maxRange}.`;
            return;
        }
        if (guessedNumber === selectedNumber) {
            let endTime = new Date();
            submit.disabled = true;
            nextLevel.disabled = false;
            guessedNumberDisplay.textContent = `Correct! It took you ${attempts + 1} attempts.Elapsed time: ${endTime - startTime}ms`;
            selectedNumberDisplay.textContent = `The number was: ${selectedNumber}`;
        } else {
            attempts++;
            guessedNumberDisplay.textContent = guessedNumber < selectedNumber ? "Too low" : "Too high";
        }
    });
}

submit.addEventListener('click', ()=>{
    guessNumber();
});
nextLevel.addEventListener('click', startNewLevel);
function initializeGame() {
    nextLevel.disabled= true;
    selectedNumber = getRandomNumber(minRange, maxRange);
    startTime = new Date();
    selectedNumberDisplay.textContent = `Guess a number between ${minRange} and ${maxRange}.`;
}
initializeGame();
guessNumber();


