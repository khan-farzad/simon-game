const btnColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userCLickedPattern = []
let started = false;
let level = 0;

function nextSequence() {
    userCLickedPattern = []
    let randomNum = Math.floor(Math.random()*4)
    let randomColor = btnColors[randomNum]
    gamePattern.push(randomColor)
    $('#' + randomColor).fadeIn().fadeOut().fadeIn()
    playSound(randomColor)
    level++;
    $('h1').text(`Level ${level}`)
}

$('.'+'btn').click(function clickHandler() {
    if(started) {
        let userChosenColor = this.classList[1]
        playSound(userChosenColor)
        animatePress(userChosenColor)
        userCLickedPattern.push(userChosenColor)
        checkAnswer(userCLickedPattern.length-1)
    }
})

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

function animatePress(currColor) {
    $(`#${currColor}`).addClass('pressed')
    setTimeout(function() {
        $(`#${currColor}`).removeClass('pressed')
    }, 100)
}

$(document).dblclick(function() {
    if(!started) {
        started = true;
        nextSequence();
    }
})

function checkAnswer(currLevel) {
    if(userCLickedPattern[currLevel] === gamePattern[currLevel]) {
        if(userCLickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    }
    else {
        $('body').addClass('game-over')
        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 200)
        $('h1').text('Game Over! Double Click to Restart')
        playSound('wrong')
        level = 0
        started = false;
        gamePattern = []
    }
}

