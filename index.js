const mainContainer = document.querySelector(".inner-container");
const extraChoice = document.querySelector(".extra-choice");
const question = document.querySelector(".question-from-api");
const mcqOne = document.querySelector(".mcqs-1");
const mcqTwo = document.querySelector(".mcqs-2");
const mcqThree = document.querySelector(".mcqs-3");
const mcqFour = document.querySelector(".mcqs-4");
const allMcqs = document.querySelectorAll(".mcq-num");
const totalQuestions = document.querySelector(".question-total");
const score = document.querySelector(".total-score");
const fill = document.querySelector(".fill");
const modalScore = document.querySelector(".modal-score");
const scoreDescription = document.querySelector(".total-user-score");
const playAgain = document.querySelector(".play-again");
const modal = document.querySelector(".modal-main");
const changeChoice = document.querySelector('.choice');

let results = null;
let index = 0;
let questionNo = 1;
let mcqs = null;
let totalScore = 0;
let randomNumber = [];
let getRandomNumber;
let choices;
let width = 0;


if(!localStorage.getItem('params')){
  location.href = 'user.html';
}

const username = JSON.parse(localStorage.getItem('user'));
const url = "https://opentdb.com/api.php?" + JSON.parse(localStorage.getItem('params'))

function randomNumberHanlder() {
  randomNumber = [];
  if(results[index].incorrect_answers.length <= 2){
    while (randomNumber.length < 2) {
      getRandomNumber = Math.floor(Math.random() * 2);

      if (!randomNumber.includes(getRandomNumber)) {
        randomNumber.push(getRandomNumber);
      }
    }
  return;
  }
  while (randomNumber.length < 4) {
    getRandomNumber = Math.floor(Math.random() * 4);
    if (!randomNumber.includes(getRandomNumber)) {
      randomNumber.push(getRandomNumber);
    }
  }
}

window.onload = async function () {
   await axios
    .get(
      url
    )
    .then((res) => {
      results = res.data.results;
    })
    .catch((error) => error);
    if (results && results.length > 9) {
  choices = results[index].incorrect_answers;
  choices.push(results[index].correct_answer);
    mcqsWithQuestions();
    width += 15.4;
    fill.style.width = `${width}px`;
    totalQuestions.innerHTML = `Questions ${questionNo}/${results.length}`;
  }
  else{
    localStorage.removeItem('params');
    localStorage.removeItem('user');
    location.href = 'user.html';
  }
};

allMcqs.forEach((mcq) => {
  mcq.addEventListener("click", (e) => {
    if(results){
      if (mcq.lastElementChild.innerHTML == results[index].correct_answer) {
        totalScore += 10;
        index += 1;
        if(index <= 9){
          questionNo += 1;
        }
        e.target.classList.add("true");
        
        setTimeout(() => {
          e.target.classList.remove("true");
          totalQuestions.innerHTML = `Questions ${questionNo}/${results.length}`;
          score.innerHTML = totalScore;
          choices = results[index].incorrect_answers;
          choices.push(results[index].correct_answer);
          width += 15.4;
          fill.style.width = `${width}px`;
          mcqsWithQuestions();
        }, 300);
      } else if (
        mcq.lastElementChild.innerHTML != results[index].correct_answer
        ) {
          e.target.classList.add("false");
          setTimeout(() => {
            e.target.classList.remove("false");
            index += 1;
            if(index <= 9){
              questionNo += 1;
            }
          totalQuestions.innerHTML = `Questions ${questionNo}/${results.length}`;
          score.innerHTML = totalScore;
          choices = results[index].incorrect_answers;
          choices.push(results[index].correct_answer);
          width += 15.4;
          fill.style.width = `${width}px`;
          mcqsWithQuestions();
        }, 300);
      }
    }

    if (index >= 9) {
      setTimeout(() => {
        modal.classList.remove("none");
        modalScore.innerHTML = `Congragulation ${username}.`;
        scoreDescription.innerHTML = `Your score is ${totalScore}`;
      }, 300);
    }
  });
});

playAgain.addEventListener("click", () => {
  window.location.reload();
});

function mcqsWithQuestions() {
  randomNumberHanlder();
  if(results[index].incorrect_answers.length <= 2){
    mcqOne.innerHTML = `${choices[randomNumber[1]]}`;
    mcqTwo.innerHTML = `${choices[randomNumber[0]]}`;
    question.innerHTML = `${results[index].question}`;
    if(!extraChoice.className.includes('none')){
      extraChoice.classList.add('none');
    }
    return;
  }
  if(extraChoice.className.includes('none')){
    extraChoice.classList.remove('none');
  }
  mcqOne.innerHTML = `${choices[randomNumber[0]]}`;
  mcqTwo.innerHTML = `${choices[randomNumber[2]]}`;
  mcqThree.innerHTML = `${choices[randomNumber[1]]}`;
  mcqFour.innerHTML = `${choices[randomNumber[3]]}`;
  question.innerHTML = `${results[index].question}`;
}

changeChoice.addEventListener('click', () => {
  localStorage.removeItem('params');
  localStorage.removeItem('user');
  location.href = 'user.html';
})