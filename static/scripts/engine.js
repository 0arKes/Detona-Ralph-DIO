const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time_left: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life")
    },
    values: {
        timeId: null,
        countDownTimerId: setInterval(countDown, 1000),
        velocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
        lifeQnt: 3
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.time_left.textContent = state.values.currentTime;

    if (state.values.lifeQnt <= 0){
        alert("Fim de jogo, Pontuação total: " + state.values.result)
        window.location.reload();
    }

    if (state.values.currentTime === 0){
        alert("Game Over seu resultado foi " + state.values.result);
        state.values.lifeQnt--;
        state.view.life.textContent = state.values.lifeQnt;
        state.values.currentTime = 10;
    }
}

function playSound(){
    let audio = new Audio("./static/audio/hit.m4a");
    audio.play()
    audio.volume = 0.2;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomValue = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomValue];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timeId = setInterval(randomSquare, state.values.velocity)
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}


function init(){
    moveEnemy();
    addListenerHitBox();
}

init()