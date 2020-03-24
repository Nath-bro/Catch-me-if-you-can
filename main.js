
var timer = 60;
var timerDom = document.getElementById("time");

var gamestart = "";

var point = 0; // point que je suis mekabel 
var pointDom = document.getElementById("score");

var missedClick = 0; //taper dans le carrer noire 
var missedClickDom = document.getElementById("missedClick");

var level = 1;
var levelDom = document.getElementById("level");

var PointToNextLevel = 10;
var PointToNextLevelDom = document.getElementById("nextLevel");

var stopper = null;
var click = 0;
var movingDiv = document.getElementById("clicker");
var speedmoving = 300;
var speedrotate = 2000;
var rotation = 0;

var d = null;
var highscoreTable = document.getElementById("highscore")
var highscoreTable = null;
document.getElementsByClassName("highscore").innerHTML = JSON.parse(localStorage.getItem("highscoreTable"));



function start() {

    if (gamestart == "") {
        confirm("are you ready ")
        timer = 60;
        timerDom.innerHTML = "60";
        point = 0;
        pointDom.innerHTML = "0";
        missedClick = 0;
        missedClickDom.innerHTML = "0";
        level = 1;
        levelDom.innerHTML = "1";
        PointToNextLevel = 10;
        PointToNextLevelDom.innerHTML = "10";
        click = 0;
        speedmoving = 300;
        speedrotate = 2000;
        rotation = 0;
        gamestart = "the game started chrono on";
        stopper = setInterval(chrono, 1000);
        d = setInterval(rotating, 10);
    }
}


function chrono() {
    if (timer > 0) {
        timer--;
        if (timer < 10) {
            timerDom.innerHTML = "0" + timer;
        } else {
            timerDom.innerHTML = timer;

        }

    } else {

        movingDiv.style.top = 0 + "px";
        movingDiv.style.left = 0 + "px";
        movingDiv.style.transform = "rotate(" + 0 + "deg)";

        if (point > highscore[0].score) {
            tableHighScores();
            tableDisplay();
        }
        gamestart = "";
        clearInterval(stopper);
        clearInterval(d);
    }
}


function points() {
    if (gamestart == "the game started chrono on") {
        if (timer != 0) {
            click++;
            point += (level * 11);
            pointDom.innerHTML = point;
            missedClick--;
            missedClickDom.innerHTML = point;
            PointToNextLevel = 10 - (click % 10);
            PointToNextLevelDom.innerHTML = PointToNextLevel;

            if (click % 10 == 0 && click != 0) {
                level++;
                levelDom.innerHTML = level;
                if (level == 5) {
                    alert("congratulation you win!!! press enter to continue to play and try to make the best score you can")
                }
                timer += 10;
                speedmoving -= 50;
                speedrotate -= 250;

            }

        }
    }
}


function pointMiss() {
    if (gamestart == "the game started chrono on" && timer != 0) {
        point -= level;
        pointDom.innerHTML = point;
        missedClick++;
        missedClickDom.innerHTML = missedClick;
    }
}


function files() {
    if (gamestart == "the game started chrono on") {
        setTimeout(displacement, speedmoving);


    }
}


function displacement() {

    movingDiv.style.top = Math.random() * 400 + 20 + "px";
    movingDiv.style.left = Math.random() * 800 + "px";

}


function rotating() {
    rotation += 3600 / speedrotate;
    movingDiv.style.transform = "rotate(" + rotation + "deg)";


}




var highscore = [
    { name: "", score: 0 },
];

function tableHighScores() {
    var last = highscore.length - 1;
    if (point > highscore[last].score) {
        var name = prompt("entre you name");
        var date = new Date();
        var formats = { year: "2-digit", month: "2-digit", day: "numeric" };
        var player = { name: name, score: score, date: date.toLocaleDateString("en", formats) };
        highscore.push(player);

        highscore.sort((a, b) => {
            return b.score - a.score;
        })
        if (highscore.length > 5) {
            highscore.pop();
        }


    }

}
var toAppend = "";
function creatHtml() {

    highscore.forEach((player) => {
        toAppend += `<div class="blanc2"> Hight Score:<div id="highscore" ></div>  </div>
        ${palyer.name} ${palyer.score} ${palyer.date}`
    })

}


var highscoreJSON = localStorage.getItem("Hight Score:");
if (highscoreJSON != null) {
    highscore = JSON.parse(highscoreJSON);
}
function updateLS() {
    highscoreJSON = JSON.stringify(highscore);
    localStorage.setItem('Hight Score:', highscoreJSON);
}





function tableDisplay() {

    if (localStorage.highscore != null) {
        highscore = JSON.parse(localStorage.getItem("highscore"));
    }

    document.getElementsByClassName("highscore")[0].innerHTML = highscoreTable;
    localStorage.setItem("highscore", JSON.stringify(highscore));


}


// displayHightScoreTable()


