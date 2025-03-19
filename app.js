let gameSeq = [];
let userSeq = [];
let colour = ["red", "blue", "green", "yellow"];
let start = false;
let level = 0;
let body = document.querySelector("body");
let h2 = document.querySelector('h2');


document.addEventListener('keypress', function () {
    if (start == false) {
        console.log("game started");
        start = true;
        let backgroundMusic = document.querySelector("audio");
        backgroundMusic.play();
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 200);
}
function levelUp() {
    userSeq = [];
    level++;
    h2.textContent = "Level: " + level;
    let randIdx = Math.floor(Math.random() * 4);
    let randColour = colour[randIdx];
    let randbtn = document.querySelector(`.${randColour}`);
    // console.log(randColour);
    // console.log(randIdx);
    // console.log(randbtn);
    document.body.classList.add("glow");
    setTimeout(() => document.body.classList.remove("glow"), 500);
    gameSeq.push(randColour);
    console.log(gameSeq);
    gameFlash(randbtn);
};
function resetGame() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}
function checkUserSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 250)

        }
    } else {
        h2.textContent = "Game Over! You pressed the wrong button.Highest level reached " + (level - 1) + " Press any key to start a new game.";
        let btn = this;
        userFlashDanger(body);
        resetGame();
    }
}

function userFlashDanger() {
    //background colour of document
    let wrongSound = new Audio('E:/vscode_java/javaScript/Simon Says/wrong-47985.mp3');
    wrongSound.currentTime = 0;  // Reset sound to start
    wrongSound.play();

    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 300);


    document.body.classList.add("user-flash-danger");
    setTimeout(() => document.body.classList.remove("user-flash-danger"), 300);
}
function btnPress() {
    console.log("Press");
    let btn = this;
    userFlash(btn);

    usercolour = btn.getAttribute("id");
    userSeq.push(usercolour);
    console.log(userSeq);

    checkUserSeq(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (let btns of allBtn) {
    btns.addEventListener('click', btnPress);
}