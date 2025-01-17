const words = ["on a", "nous avons", "ils ont", "bonjour", "le monde", "content", "donc", "un rond", "un garçon", "un pompier", "tomber"];
let currentWordIndex = 0;
let correctCount = 0;

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (correctCount / words.length) * 100;
    progressBar.style.width = progress + "%";
    progressBar.textContent = Math.round(progress) + "%";
}

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function loadWord() {
    const wordContainer = document.getElementById("word-container");
    const feedback = document.getElementById("feedback");
    const answerInput = document.getElementById("answer");
    const nextWordButton = document.getElementById("next-word");

    wordContainer.innerHTML = "";
    feedback.textContent = "";
    answerInput.value = "";
    nextWordButton.style.display = "none";

    const currentWord = words[currentWordIndex];

    wordContainer.textContent = currentWord;
    setTimeout(() => {
        wordContainer.innerHTML = "";
        const shuffledWord = shuffleWord(currentWord);
        shuffledWord.split('').forEach((letter, index) => {
            const letterElement = document.createElement("div");
            letterElement.textContent = letter;
            letterElement.classList.add("letter");
            letterElement.dataset.index = index;
            letterElement.addEventListener("click", () => useLetter(letterElement, letter));
            wordContainer.appendChild(letterElement);
        });
    }, 5000);
}

function useLetter(letterElement, letter) {
    const answerInput = document.getElementById("answer");
    if (!letterElement.classList.contains("used")) {
        answerInput.value += letter;
        letterElement.remove();
    }
}

document.getElementById("submit").addEventListener("click", () => {
    const answerInput = document.getElementById("answer");
    const feedback = document.getElementById("feedback");
    const currentWord = words[currentWordIndex];

    if (answerInput.value.toLowerCase() === currentWord) {
        feedback.textContent = "Bravo, c'est correct !";
        feedback.style.color = "green";
        document.getElementById("next-word").style.display = "block";
        correctCount++;
        updateProgressBar();

        // 🎵 Joue le son de validation
        const successSound = document.getElementById("success-sound");
        successSound.play();
    } else {
        feedback.textContent = "Essaie encore !";
        feedback.style.color = "red";

        // 🎵 Joue le son d'erreur
        const errorSound = document.getElementById("error-sound");
        errorSound.play();
    }
});

document.getElementById("next-word").addEventListener("click", () => {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    loadWord();
});

document.getElementById("speak").addEventListener("click", () => {
    const currentWord = words[currentWordIndex];
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = "fr-FR";
    synth.speak(utterance);
});

function addButtonAnimations() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1)";
            button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "none";
        });
    });
}

loadWord();
addButtonAnimations();
