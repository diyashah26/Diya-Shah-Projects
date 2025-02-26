const questions = [
  {
    question: "What is this website related to..?",
    answers: [
      { text: "animals", correct: false },
      { text: "only human rights", correct: false },
      { text: "real estates", correct: false },
      { text: "indian constitution", correct: true },
    ]
  },
  {
    question: "Which of the following is not a Fundamental Right guaranteed by the Indian Constitution?",
    answers: [
      { text: "Right to equality", correct: false },
      { text: "Right to freedom", correct: false },
      { text: "Right to property", correct: true },
      { text: "Right to life and liberty", correct: false },
    ]
  },
  {
      question: "Under which Article of the Constitution is the Right to Equality guaranteed?",
      answers: [
        { text: "Article 14", correct: true},
        { text: "Article 13", correct: false },
        { text: "Article 15", correct: false },
        { text: "Article 16", correct: false },
      
      ]
    },
    {
      question: "The Right to Freedom of Speech and Expression is guaranteed under which Article of the Constitution?",
      answers: [
        { text: "Article 19", correct: true},
        { text: "Article 20", correct: false },
        { text: "Article 21", correct: false },
        { text: "Article 22", correct: false },
      
      ]
    },
    {
      question: "The Directive Principles of State Policy are enshrined in which part of the Indian Constitution?",
      answers: [
        { text: "Part III", correct:false},
        { text: "Part IV", correct: true},
        { text: "Part V", correct: false },
        { text: "Part VI", correct: false },
      
      ]
    },
    {
      question: "Which Directive Principle aims to secure a social order in which justice, social, economic, and political, shall inform all institutions of national life?",
      answers: [
        { text: "Article 38", correct:true},
        { text: "Article 39",correct: false},
        { text: "Article 40", correct: false },
        { text: "Article 41", correct: false },
      
      ]
    },
    {
      question: "The President of India is elected by whom?",
      answers: [
        { text: "The people", correct:false},
        { text: "The Parliament",correct: false},
        { text: "The Electoral College", correct: true},
        { text: "The Chief Ministers of States", correct: false },
      
      ]
    },
    {
      question: "The Vice President of India is elected by whom?",
      answers: [
        { text: "The people", correct:false},
        { text: "The Parliament",correct: true},
        { text: "The Electoral College", correct: false},
        { text: "The Chief Ministers of States", correct: false },
      
      ]
    },
    {
      question: "The Chief Minister of a State is appointed by whom?",
      answers: [
        { text: "The President", correct:false},
        { text: "The Governer",correct: true},
        { text: "The Prime Minister", correct: false},
        { text: "The Chief Ministers of legislative Assembly", correct: false },
      
      ]
    },
    {
      question: "The Governor of a State is appointed by whom?",
      answers: [
        { text: "The President", correct:true},
        { text: "The Chief Minister",correct: false},
        { text: "The Prime Minister", correct: false},
        { text: "The Chief Ministers of Justice of India", correct: false },
      ]
      
    },
    {
      question: "The Supreme Court of India is the highest court of the country. It is mentioned in which Article of the Constitution?",
      answers: [
        { text: "Article 125",correct: false},
        { text: "Article 136", correct: false},
        { text: "Article 141", correct: false },
        { text: "Article 142", correct:true},
      ]
      
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  showquestion();
}

function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function showquestion() {
  console.log(`Showing question ${currentQuestionIndex + 1}`);
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("button");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  nextButton.style.display = "none"; 
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block"; 
}

function showscore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showquestion();
  } else {
    showscore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();