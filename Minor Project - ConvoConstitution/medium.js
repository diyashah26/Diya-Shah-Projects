const questions = [
  {
    question: "By which constitutional amendment the voting age was reduced to 18 years from 21 years?",
    answers: [
      { text: "103rd Amendment, ", correct: false },
      { text: "21st Amendment, 1967", correct: false },
      { text: "12th Amendment., 1961", correct: false },
      { text: "61st Amendment, 1988", correct: true },
    ]
  },
  {
    question: "Money bill is given under which article of the Constitution of India?",
    answers: [
      { text: "Artical    201", correct: false },
      { text: "Artical    101", correct: false },
      { text: "Artical    110", correct: true },
      { text: "Artical    210", correct: false },
    ]
  },
  {
      question: "Who described the directive principles of state policy as 'manifesto of aims and aspirations'?",
      answers: [
        { text: "K. C Wheare", correct: true},
        { text: "Richard Posner", correct: false },
        { text: "John C Gray", correct: false },
        { text: "Max Weber", correct: false },
      
      ]
    },
    {
      question: "Which article abolishes practice of untouchability?",
      answers: [
        { text: " Artical 17 of the Constitution of India", correct: true},
        { text: "Artical 37 of the Constitution of india ", correct: false },
        { text: "Artical 67 of the Constitution of india", correct: false },
        { text: "Artical 119 of the Constitution of india", correct: false },
      
      ]
    },
    {
      question: "Who is the Legal Advisor to the Government of a State in India?",
      answers: [
        { text: "Chief Justice of India", correct:false},
        { text: "The Advocate General", correct: true},
        { text: "Judges of supreme Court ", correct: false },
        { text: "Assistant to president", correct: false },
      
      ]
    },
    {
      question: "The president's rule under article 356 remains valid in the state for the maximum period of?",
      answers: [
        { text: "Six months", correct:true},
        { text: "Three months",correct: false},
        { text: "Four months", correct: false },
        { text: "seven months", correct: false },
      
      ]
    },
    {
      question: "Article 39A of the Constitution deals with?",
      answers: [
        { text: "Definition of 'Money Bills'", correct:false},
        { text: "Separation of Judiciary from executive.",correct: false},
        { text: "Equal Justice and free legal aid", correct: true},
        { text: "Certain Principles of policy to be followed by the state. ", correct: false },
      
      ]
    },
    {
      question: "Provisions as to administration and control of schedule areas and scheduled tribes are in which schedule?",
      answers: [
        { text: "Third Schedule", correct:false},
        { text: "Fifth Schedule",correct: true},
        { text: "Nine Schedule", correct: false},
        { text: "Eleventh Schedule", correct: false },
      
      ]
    },
    {
      question: "Which schedule relates with the municipalities?",
      answers: [
        { text: "Tenth Schedule", correct:false},
        { text: "Twelfth  Schedule",correct: true},
        { text: "Ninth Schedule", correct: false},
        { text: "Seventh Schedule", correct: false },
      
      ]
    },
    {
      question: "Which section of the IPC provides Infancy as an exception to the offence?",
      answers: [
        { text: "Section 82 of IPC", correct:true},
        { text: "Section 84 of IPC",correct: false},
        { text: "Section 86 of IPC", correct: false},
        { text: "Section 88 of IPC", correct: false },
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
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
      answerButton.removeChild(answerButton.firstChild);
  }
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("button");
      if (answer.correct) button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      answerButton.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
      selectedButton.classList.add("correct");
      score++;
  } else {
      selectedButton.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button => {
      if (button.dataset.correct === "true") button.classList.add("correct");
      button.disabled = true;
  });

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}
