const username = document.getElementById('username');
const savescorebtn =document.getElementById('savescorebtn');
const finalscore = document.getElementById('finalscore')
const mostRecentScore = localStorage.getItem("mostRecentScore");
const max_highscore = 5
finalscore.innerText = mostRecentScore
const highscores = JSON.parse(localStorage.getItem('highscores'))||[];
console.log('highscores')

username.addEventListener('keyup',()=>{
    console.log(username.value);
    savescorebtn.disabled = !username.value;
})


function saveHighScore(e){
    console.log("Clicked the save Button")
    e.preventDefault();


const score = {
    score : mostRecentScore,
    name : username.value
};
highscores.push(score);

highscores.sort((a,b)=> b.score-a.score)
highscores.splice(5)
localStorage.setItem('highscores',JSON.stringify(highscores));
window.location.assign('/')

}