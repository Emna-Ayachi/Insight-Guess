let selectedNumber; 
const selectedNumberDisplay = document.getElementById('selected_number_display');
const guessedNumberDisplay = document.getElementById('guessed_number_display');
const submit = document.getElementById('submit'); 

function getRandomNumber() {
    selectedNumber = Math.floor(Math.random() * 10) + 1; 
}

function guessNumber() {
    let attempts = 0;
    submit.addEventListener('click', () => {
        const guessedNumber = Number(document.getElementById('guessed_number').value);
        if (guessedNumber < 1 || guessedNumber > 10) {
            guessedNumberDisplay.textContent = "Choose numbers between [1, 10]";
            return;
        }
        if (equivalent(guessedNumber, selectedNumber)) {
            guessedNumberDisplay.textContent = `Correct! It took you ${attempts + 1} attempts.`;
            selectedNumberDisplay.textContent = `The number was: ${selectedNumber}`;
        } else {
            attempts++;
            if (attempts >= 5) {
                guessedNumberDisplay.textContent = "Game over! You've used all attempts.";
                selectedNumberDisplay.textContent = `The number was: ${selectedNumber}`;
            }
        }
    });
}

function equivalent(guessedNumber, selectedNumber) {
    if (guessedNumber === selectedNumber) {
        return true;
    }
    if (guessedNumber < selectedNumber) {
        guessedNumberDisplay.textContent = "Too low";
    } else {
        guessedNumberDisplay.textContent = "Too high";
    }
    return false;
}

getRandomNumber();
guessNumber();
