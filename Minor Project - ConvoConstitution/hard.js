const questions = [
    {
      question: " The Indian Constitution has borrowed the idea of the Concurrent List from which country?",
      answers: [
        { text: "United Kingdom", correct: false },
        { text: "United States", correct: false },
        { text: "Canada", correct: false },
        { text: "Australia", correct: true },
      ]
    },
    {
      question: ". Which of the following is not a feature of the Indian Constitution?",
      answers: [
        { text: "Federal structure with unitary bias", correct: false },
        { text: "Parliamentary form of government", correct: false },
        { text: "Right to Property as a Fundamental Right", correct: true },
        { text: "Right to life and liberty", correct: false },
      ]
    },
    {
        question: "Which of the following was the most significant reason for the adoption of a Parliamentary system in India?",
        answers: [
          { text: "To ensure representation of diverse communities", correct: true},
          { text: " Influence of the British system", correct: false },
          { text: "Preference of the framers of the Constitution", correct: false },
          { text: " To maintain separation of powers between the Executive and Legislature", correct: false },
        
        ]
      },
      {
        question: " Which Fundamental Right prohibits human trafficking, forced labor, and child labor?",
        answers: [
          { text: " Right against Exploitation", correct: true},
          { text: "Right to Equality", correct: false },
          { text: "Right to Constitutional Remedies", correct: false },
          { text: "Right to Freedom", correct: false },
        
        ]
      },
      {
        question: "Which part of the Indian Constitution is referred to as the 'Magna Carta' of India?",
        answers: [
          { text: "Part III- Fundamental Rights", correct:true},
          { text: "Part IV - Directive Principles of State Policy", correct: false},
          { text: "Part V-Union Government", correct: false },
          { text: "Preamble", correct: false },
                ]
      },
      {
        question: "The term 'Secular' was added to the Indian Constitution by which Constitutional Amendment?",
        answers: [
          { text: " 42nd Amendment", correct:true},
          { text: "44th Amendment",correct: false},
          { text: " 52nd Amendment", correct: false },
          { text: "74th Amendment", correct: false },
        
        ]
      },
      {
        question: " What is the main objective of the Directive Principles of State Policy?",
        answers: [
          { text: "To establish a secular state", correct:false},
          { text: " To safeguard Fundamental Rights",correct: false},
          { text: "To promote economic and social democracy", correct: true},
          { text: "To maintain law and orders", correct: false },
        
        ]
      },
      {
        question: " What does the term 'Republic'signify in the context of the Indian Constitution?",
        answers: [
          { text: "Power is centralized in the union", correct:false},
          { text: "Head of the state is elected",correct: true},
          { text: " Government is accountable to the judiciary", correct: false},
          { text: "Citizens have fundamental duties", correct: false },
        
        ]
      },
      {
        question: "What is the term used for the process of transferring certain powers from the central government to the state or local governments?",
        answers: [
          { text: "Federalismt", correct:false},
          { text: " Devolution",correct: true},
          { text: "Decentralization", correct: false},
          { text: "Centralization", correct: false },
        
        ]
      },
      {
        question: " The Indian Constitution was originally written in which language(s)?",
        answers: [
          { text: " Hindi and Englisht", correct:true},
          { text: " Sanskrit",correct: false},
          { text: "Hindi", correct: false},
          { text: "English", correct: false },
        ]
        
      },
      {
        question: " Which of the following is NOT included in the Right to Freedom?",
        answers: [
          { text: " Freedom of speech and expression",correct: false},
          { text: "Freedom to form associations", correct: false},
          { text: " Freedom to reside in any part of India", correct: false },
          { text: " Freedom from bonded labor", correct:true},
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