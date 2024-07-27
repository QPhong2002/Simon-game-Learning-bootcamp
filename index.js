const btnColorArr = ["green", "red", "yellow", "blue"];
const gamePattern = [];
const userPattern = [];
var level = 0;
var isPlaying = false;



// press any keys to start game
$(document).on( "keypress", function() {
    isPlaying = true;
    nextPattern();
    userStarPlaying();
   // playGame();
});

function nextPattern() {
    level++;
    $("#level-title").text("Level " + level);

    const btnColor = getButtonValue();
    buttonBlinkEffect(btnColor);
    playButtonSound(btnColor);
    gamePattern.push(btnColor);

    // reset user steps
    userPattern.length = 0;

}

function userStarPlaying(){
    $(".btn").click(function(){
        userPattern.push(this.id);
    
        for (var i = 0 ; i < userPattern.length; i++ ){
            if (userPattern[i] != gamePattern[i]){
                loseGameEffect();
                
                break;
            }
        }
        if ((userPattern.length === level) && (isPlaying === true))  {
            setTimeout(nextPattern,600);
        }
        
    });
}

$("#reset-btn").click(function(){
    isPlaying = true;
    $("#reset-btn").toggleClass("displayNone");
    resetGame();
    nextPattern();
});


function loseGameEffect() {

    //title
    $("#level-title").text("Lose");
    $("#reset-btn").toggleClass("displayNone");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").toggleClass("game-over");
    }, 200);

    playButtonSound("wrong");


    isPlaying = false;
}

function resetGame (){
    userPattern.length = 0;
    gamePattern.length = 0;
    level = 0;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get random button color
function getButtonValue() {
    return btnColorArr[getRandomInt(0,3)];
}

function buttonBlinkEffect ( btnColor ){
    $("#" + btnColor).animate({opacity: '0.3'});
    $("#" + btnColor).animate({opacity: '1'});
}

function playButtonSound ( btnColor){
    const btnSound = new Audio("./sounds/" + btnColor + ".mp3" );
    btnSound.play();
}

// Button click events
for (var i = 0; i<=3 ; i++){
    document.getElementsByClassName("btn")[i].addEventListener("click", function(){ 
        buttonBlinkEffect(this.id);
        playButtonSound(this.id);
    });
}


