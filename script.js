const questions = [
    {
      question: "Which language runs in a web browser?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: 3
    },
    {
      question: "What does CSS stand for?",
      answers: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax"],
      correct: 1
    },
    {
      question: "Inside which HTML element do we put JavaScript?",
      answers: ["<js>", "<javascript>", "<script>", "<code>"],
      correct: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answerBtns = document.querySelectorAll(".option-btn");
  const nextBtn = document.getElementById("next-btn");
  const scoreScreen = document.getElementById("score-screen");
  const scoreEl = document.getElementById("score");
  const progress = document.getElementById("progress");
  
  function loadQuestion() {
    let q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answerBtns.forEach((btn, i) => {
      btn.textContent = q.answers[i];
      btn.className = "option-btn";
      btn.disabled = false;
    });
    nextBtn.style.display = "none";
    updateProgress();
  }
  
  function updateProgress() {
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    progress.style.width = progressPercent + "%";
  }
  
  function selectAnswer(index) {
    const correctIndex = questions[currentQuestion].correct;
    answerBtns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIndex) {
        btn.classList.add("correct");
      } else if (i === index) {
        btn.classList.add("wrong");
      }
    });
    if (index === correctIndex) score++;
    nextBtn.style.display = "block";
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    document.getElementById("quiz").classList.add("hidden");
    scoreScreen.classList.remove("hidden");
    scoreEl.textContent = `${score} / ${questions.length}`;
    progress.style.width = "100%";
  }
  
  answerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      selectAnswer(index);
    });
  });
  
  loadQuestion();
  
  