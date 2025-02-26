
    const questions = [
  {
    question: "Who is known as the ‘Father of the Indian Constitution’?",
    answers: [
      { text: " Mahatma Gandhi", correct: false },
      { text: "Jawaharlal Nehru", correct: false },
      { text: "Sardar Vallabhbhai Patel", correct: false },
      { text: "Dr. B.R. Ambedkar", correct: true },
    ]
  },
  {
    question: "In which year was the Constitution of India adopted?",
    answers: [
      { text: "1950", correct: false },
      { text: "1947", correct: false },
      { text: "1949", correct: true },
      { text: "1952", correct: false },
    ]
  },
  {
      question: "How many fundamental rights are guaranteed by the Indian Constitution?",
      answers: [
        { text: "6", correct: true},
        { text: "5", correct: false },
        { text: "7", correct: false },
        { text: "8", correct: false },
      
      ]
    },
    {
      question: "What does the Preamble of the Indian Constitution begin with?",
      answers: [
        { text: "“We, the People of India…”", correct: true},
        { text: " “We, the Citizens of India…”", correct: false },
        { text: "“We, the Sovereign Nation…”", correct: false },
        { text: " “We, the Government of India…”", correct: false },
      
      ]
    },
    {
      question: "What is the term of office for the President of India as per the Constitution?",
      answers: [
        { text: "4 years", correct:false},
        { text: "5 years", correct: true},
        { text: "8 years", correct: false },
        { text: "7 years", correct: false },
      
      ]
    },
    {
      question: "Which fundamental right guarantees the right to equality before the law?",
      answers: [
        { text: " Right to Equality", correct:true},
        { text: "Right to Freedom",correct: false},
        { text: "Right to Constitutional Remedies", correct: false },
        { text: " Right to Education", correct: false },
      
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
      question: "Who has the power to amend the Constitution of India?",
      answers: [
        { text: "The Parliament", correct:true},
        { text: "The President",correct: false},
        { text: "The Prime Minister", correct: false},
        { text: "The Chief Ministers of Justice of India", correct: false },
      ]
      
    },
    {
      question: "The idea of Fundamental Rights in the Indian Constitution was borrowed from which country's Constitution?",
      answers: [
        { text: "USA",correct: true},
        { text: "UK", correct: false},
        { text: "Canada", correct: false },
        { text: "Ireland", correct:false},
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