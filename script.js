let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'))
let groundHeight = parseInt(window.getComputedStyle(character).getPropertyValue('height'));
let isjumping = false;
let uptime;
let downtime;
let displayScore = document.getElementById('score');
let score = 0;

function jump(){
    if(isjumping) return;
    uptime = setInterval(() => { 
        if(characterBottom >= groundHeight + 250){
            clearInterval(uptime);
            downtime = setInterval(() => {
                if(characterBottom <= groundHeight + 60){
                    clearInterval(downtime);
                    isjumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';
             }, 10);
        }                                                                                 
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isjumping = true;
    }, 20);
}

function showScore(){
    score++;
    displayScore.innerText = score;
}

setInterval(showScore, 100);

 function generateobstacle(){
     let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class' , 'obstacle');
    obstacles.appendChild(obstacle);

    let randometimeout = Math.floor(Math.random() * 1000) +1000;
    let obstacleRight = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;

     function moveobstacle(){
         obstacleRight += 5;
         obstacle.style.right = obstacleRight + 'px';
         obstacle.style.bottom = obstacleBottom + 'px';
          obstacle.style.width = obstacleWidth + 'px';
          obstacle.style.height = obstacleHeight + 'px'; 
          if(characterRight >= obstacleRight  && characterRight <=obstacleRight + obstacleWidth && characterBottom <=obstacleBottom + obstacleHeight){
             alert('Game Over! Your Score is:' +score);
             clearInterval(obstacleInterval);
             clearTimeout(obstacleTimeout);
             location.reload();
         } 
     }
    let obstacleInterval = setInterval(moveobstacle, 20);
     let obstacleTimeout = setTimeout(generateobstacle, randometimeout);
 }

 generateobstacle();
   


function control(e){
    if(e.key == 'ArrowUp'||e.key == ' '){
        jump();
    }
}
document.addEventListener('keydown', control);
