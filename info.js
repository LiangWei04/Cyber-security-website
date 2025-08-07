const quizData = [
  {
    question: "Using '123456' as a password is safe.",
    options: ["True", "False"],
    correct: 1
  },
  {
    question: "Phishing attacks usually come from?",
    options: ["Email", "Physical Mail", "SMS Only"],
    correct: 0
  },
  {
    question: "Two-Factor Authentication (2FA) adds security by?",
    options: ["Requiring a second code/device", "Making passwords longer", "Encrypting emails"],
    correct: 0
  },
  {
    question: "Ransomware typically:",
    options: ["Encrypts data and demands payment", "Deletes all files immediately", "Steals credit cards only"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;

const quizStart = document.getElementById("quiz-start");
const quizQuestion = document.getElementById("quiz-question");
const quizNext = document.getElementById("quiz-next");
const quizScoreDisplay = document.getElementById("quiz-score");
const quizResult = document.getElementById("quiz-result");

function startQuiz() {
  quizStart.classList.add("d-none");
  currentQuestion = 0;
  score = 0;
  loadQuestion(currentQuestion);
}

function loadQuestion(index) {
  const q = quizData[index];
  quizQuestion.className = "quiz-question fade-in";
  quizQuestion.classList.remove("d-none");
  quizQuestion.innerHTML = `
    <h3 class="mb-3">${q.question}</h3>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="btn btn-outline-light" onclick="selectAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
  `;
  quizNext.classList.add("d-none");
}

function selectAnswer(selectedIndex) {
  const q = quizData[currentQuestion];
  const buttons = quizQuestion.querySelectorAll("button");
  
  buttons.forEach((btn, i) => {
    btn.classList.add("disabled");
    if (i === selectedIndex) {
      if (i === q.correct) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
      }
    }
  });

  quizNext.classList.remove("d-none");
}

quizNext.addEventListener("click", () => {
  quizQuestion.classList.remove("fade-in");
  quizQuestion.classList.add("fade-out");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion(currentQuestion);
    } else {
      showResult();
    }
  }, 500);
});

function showResult() {
  quizQuestion.classList.add("d-none");
  quizNext.classList.add("d-none");
  quizResult.classList.remove("d-none");
  quizScoreDisplay.textContent = `${score}/${quizData.length}`;
  if (score === quizData.length) quizScoreDisplay.innerHTML += `<br> seems like you are smart!`;
  if (score === 0) quizScoreDisplay.innerHTML += `<br>  you should study the content above.`;
}

function restartQuiz() {
  quizResult.classList.add("d-none");
  quizStart.classList.remove("d-none");
}
