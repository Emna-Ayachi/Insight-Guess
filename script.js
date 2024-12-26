let selectedNumber; 
let minRange = 1;
let maxRange = 100;
let maxAttempts=10;
let attempts = 0;
let startTime, endTime;

const selectedNumberDisplay = document.getElementById('selected_number_display');
const guessedNumberDisplay = document.getElementById('guessed_number_display');
const alertDisplay = document.getElementById('alert');
const submit = document.getElementById('submit');
const nextLevel= document.getElementById('continue');

let userData = {
    successfulRounds: 0, 
    currentLevel: 0,      
    roundsPerGroup: 3,   
    performanceHistory: [] 
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNewLevel() {
    timeLimit = 60;
    attempts = 0;
    maxRange = Math.max(minRange + 10, Math.floor(maxRange * 0.8)); 
    selectedNumber = getRandomNumber(minRange, maxRange); 
    userData.currentLevel++;
    submit.disabled= false;
    nextLevel.disabled= true;
    selectedNumberDisplay.textContent = `Welcome to Level ${userData.currentLevel}: Guess a number between ${minRange} and ${maxRange}.`;
    guessedNumberDisplay.textContent = "";
    startTime = new Date();
}
let timeLimit=60;
function shortenTimeLimit(){
    const timerDisplay = document.getElementById('timer');
    const interval = setInterval(() => {
        timeLimit--;
        timerDisplay.textContent = `Time left: ${timeLimit}s`;
        if (timeLimit <= 0) {
            clearInterval(interval);
            submit.disabled = true; 
            guessedNumberDisplay.textContent = "Time's up!";
        }
    }, 1000);
}
function guessNumber() {
    const guessedNumber = Number(document.getElementById('guessed_number').value);
    if (guessedNumber < minRange || guessedNumber > maxRange) {
        guessedNumberDisplay.textContent = `Choose a number between ${minRange} and ${maxRange}.`;
        return;
    }
    if (guessedNumber === selectedNumber) {
        let endTime = new Date();
        submit.disabled = true;
        nextLevel.disabled = false;
        let timeTaken=endTime - startTime;
        guessedNumberDisplay.textContent = `Correct! It took you ${attempts + 1} attempts.Elapsed time: ${timeTaken}ms`;
        selectedNumberDisplay.textContent = `The number was: ${selectedNumber}`;
        updatePerformance(attempts,timeTaken);
    } else {
        attempts++;
        guessedNumberDisplay.textContent = guessedNumber < selectedNumber ? "Too low" : "Too high";
    }
}
submit.addEventListener('click', guessNumber);
nextLevel.addEventListener('click', startNewLevel);

function initializeGame() {
    timeLimit = 60;
    nextLevel.disabled= true;
    selectedNumber = getRandomNumber(minRange, maxRange);
    startTime = new Date();
    selectedNumberDisplay.textContent = `Guess a number between ${minRange} and ${maxRange}.`;
}
function updatePerformance(attempts,timeTaken){
    if (attempts <= 10 && timeTaken <= 30000) {
        userData.successfulRounds++;
    }
    if (userData.currentLevel % userData.roundsPerGroup === 0) {
        calculateSuccess();
    }
}
function calculateSuccess(){
    const successRate = (userData.successfulRounds / userData.roundsPerGroup) * 100;
    userData.performanceHistory.push(successRate);
    console.log(`Success rate for last ${userData.roundsPerGroup} rounds: ${successRate}%`);
    userData.successfulRounds = 0;
    adjustDifficulty(successRate);
}
function adjustDifficulty(successRate){
    if (successRate > 75) {
        alertDisplay.textContent="Difficulty has increased! The number range is smaller, and you have less time to guess.";
        minRange = Math.max(1, minRange + 10);
        maxRange = Math.floor(maxRange * 0.8); 
        maxAttempts = Math.max(5, maxAttempts - 1); 
        console.log('Difficulty Increased!');
    }
}
initializeGame();
guessNumber();
shortenTimeLimit();



