document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hangman');
    const ctx = canvas.getContext('2d');
    const wordDisplay = document.getElementById('word');
    const keyboard = document.getElementById('keyboard');

    let selectedWord;
    let gusses;
    let wrongGuesses;

    const words = ['компьютер', "телевизор", "монитор", "ноутбук", "планшет", "телефон", "наушники"];

    function init() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        gusses = Array(selectedWord.length).fill('_');

        wrongGuesses = 0;

        wordDisplay.innerText = gusses.join(' ');

        drawHangman();
        generateKeyboard();

        canvas.classList.remove('drawn');
    }

    function generateKeyboard() {
        keyboard.innerHTML = "";
        'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('').forEach(letter => {
            const key = document.createElement('button');
            key.innerText = letter;
            key.classList.add('key');
            key.addEventListener('click', () => handleGuess(letter))
            keyboard.appendChild(key);
        })
    }

    function handleGuess(chosenLetter) {
        if (selectedWord.includes(chosenLetter)) {
            selectedWord.split('').forEach((letter, idx) => {
                if (letter === chosenLetter) {
                    gusses[idx] = chosenLetter;
                    wordDisplay.innerText = gusses.join(' ');
                    document.querySelector(`button:contains('${chosenLetter}')`).classList.add('correct')
                }
            })
        } else {
            wrongGuesses++;
            canvas.classList.add('drawn');
            drawHangman();
            canvas.style.animation = 'shake 0.5s';
            setTimeout(() => canvas.style.animation = "", 500)
            document.querySelector(`button:contains('${chosenLetter}')`).classList.add('wrong')
        }
        checkGameOver();

    }

    function drawHangman() {

    }

    function checkGameOver() {
        if (gusses.join('') === selectedWord) {
            alert('Поздравляем! Вы победили!')
            init()
        } else if (wrongGuesses >= 7) {
            alert(`К сожалению Вы проиграли. Слово было: ${selectedWord}`)
            init()
        }
    }
    document.getElementById('reset').addEventListener('click', init)
    init();
})