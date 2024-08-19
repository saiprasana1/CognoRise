const quizData = [
    {
        question: "What is the capital of India?",
        options: ["Berlin", "Madrid", "Delhi", "Lisbon"],
        answer: "Delhi"
    },
    {
        question: "Which is the national game of India?",
        options: ["Boxing", "Football", "Cricket", "Hockey"],
        answer: "Hockey"
    },
    {
        question: "Who is the father of the nation?",
        options: ["Subash", "Sathya", "Mahatma Gandhi", "Anna"],
        answer: "Mahatma Gandhi"
    },
    {
        question: "Which is the famous place in Chennai?",
        options: ["None", "Anna Nagar", "Beach", "Mall"],
        answer: "Beach"
    }
];

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEls = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

function loadQuestion() {
    const { question, options } = quizData[currentQuestion];
    questionNumberEl.textContent = `question ${currentQuestion + 1} of ${quizData.length}`;
    questionEl.textContent = question;
    optionEls.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectOption(option);
    });
    answerSelected = false;
    nextBtn.disabled = true;
    startTimer();
}

function selectOption(option) {
    if (!answerSelected) {
        answerSelected = true;
        const selectedAnswer = option.textContent;
        const correctAnswer = quizData[currentQuestion].answer;
        if (selectedAnswer === correctAnswer) {
            score++;
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
            optionEls.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add("correct");
                }
            });
        }
        nextBtn.disabled = false;
    }
}

function loadNextQuestion() {
    clearInterval(timer);
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

nextBtn.addEventListener("click", () => {
    loadNextQuestion();
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                loadNextQuestion();
            }
        }
    }, 1000);
}

function showResult() {
    const quizEl = document.getElementById("quiz");
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} out of ${quizData.length}`;
}

// Initialize quiz
loadQuestion();