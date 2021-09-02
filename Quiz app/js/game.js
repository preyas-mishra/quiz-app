const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptinganswers = false;
let score = 0 ;
let questioncounter = 0;
let availablequestions = [];

let questions = [
    {
        question: "The great Victoria Desert is located in ",
        choice1: "Canada ",
        choice2: "West Africa",
        choice3: "Australia ",
        choice4: "North America ",
        answer:3
    },
    {
        question: "The Paithan (Jayakwadi) Hydro-electric project, completed with the help of Japan, is on the river ",
        choice1: "Ganga ",
        choice2: "Cauvery",
        choice3: "Narmada ",
        choice4: "Godavari ",
        answer: 4
    },
    {
        question: "Which was the 1st non Test playing country to beat India in an international match? ",
        choice1: "Canada ",
        choice2: "Sri Lanka ",
        choice3: "Zimbabwe ",
        choice4: "East Africa ",
        answer: 2
    },
    {
        question: "Which two counties did Kapil Dev play? ",
        choice1: "Northamptonshire & Worcestershire ",
        choice2: "Northamptonshire & Warwickshire ",
        choice3: "Nottinghamshire & Worcestershire ",
        choice4: "Nottinghamshire & Warwickshire ",
        answer: 1
    },
    {
        question: "Ricky Ponting is also known as what? ",
        choice1: "The Rickster ",
        choice2: "Ponts ",
        choice3: "Ponter ",
        choice4: "Punter ",
        answer: 4
    },
    {
        question: "	India won its first Olympic hockey gold in...? ",
        choice1: "1928 ",
        choice2: "1932 ",
        choice3: "1936 ",
        choice4: "1948 ",
        answer: 1
    },



]

const correct_bonus = 10;
const max_questions = 3;

function startGame(){
    questioncounter = 0;
    score = 0;
    availablequestions = [...questions];
    getNewQuestion();
    
    console.log(availablequestions);


}
getNewQuestion = () =>{
    if(availablequestions.length == 0 || questioncounter>= max_questions){
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign('/end.html')
    }
    questioncounter++;
    progressText.innerText = "Question "+questioncounter+"/"+max_questions
    progressBarFull.style.width = `${(questioncounter/max_questions)*100}%`;


    const questionIndex = Math.floor(Math.random()* availablequestions.length)
    currentQuestion = availablequestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach (choice=>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice"+number];
    })
    availablequestions.splice(questionIndex,1);
    acceptinganswers = true
}

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if(!acceptinganswers)return;

        acceptinganswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classtoapply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classtoapply=="correct"){
            incrementscore(correct_bonus)
        }

        selectedChoice.parentElement.classList.add(classtoapply);
        setTimeout ( () =>{
        selectedChoice.parentElement.classList.remove(classtoapply);
        getNewQuestion();
        },1000)
    })
})

incrementscore = num =>{
    score+=num;
    scoreText.innerText = score;
}



startGame();