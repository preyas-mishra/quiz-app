const highscoresList = document.getElementById('highscorelist');
const highscores = JSON.parse(localStorage.getItem('highscores'))||[];
console.log(highscores)

highscoresList.innerHTML = highscores
.map(score=>{
    return `<li class="high-score">${score.name}-${score.score}</li>`
})
.join("")