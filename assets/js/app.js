const game = document.querySelector(".breakout")

// Paramètres :
const gameWidth = 480
const gameHeight = 720

game.style.width = gameWidth + "px"
game.style.height = gameHeight + "px"

const blockPerLine = 10

const blockWidth = gameWidth / (blockPerLine + 1)
const margin = blockWidth / (blockPerLine + 1)

const nbLine = 15

const blockHeight = gameHeight / 2 / nbLine - margin

const controllerSize = gameWidth / 5 // Valeur fixe (ex: 100) ?

const speed = 5

// Génération des blocs
let xPos = margin
let yPos = margin
function newBlock() {
    let block = document.createElement("div")
    block.classList.add("block")
    block.style.width = blockWidth + "px"
    block.style.height = blockHeight + "px"

    // Placement des blocs
    block.style.left = xPos + "px"
    block.style.top = yPos + "px"
    game.appendChild(block)

    if (xPos < gameWidth - 2 * blockWidth) {
        xPos += blockWidth + margin
    } else {
        yPos += blockHeight + margin
        xPos = margin
    }
}

for (let i = 0; i < blockPerLine * nbLine; i++) {
    newBlock()
}

// Ball
let ballPosition = [
    gameWidth / 2 - 16,
    gameHeight - 34 - margin - blockHeight
]
const ball = document.createElement("div")
ball.innerHTML = '<span class="fa-solid fa-basketball fa-2x"></span>'
ball.classList.add("ball")
ball.style.left = ballPosition[0] + "px"
ball.style.top = ballPosition[1] + "px"
game.appendChild(ball)

// Mouvement de la balle
let xSpeed = speed
let ySpeed = - speed
function moveBall() {
    ballPosition[0] += xSpeed
    ballPosition[1] += ySpeed
    ball.style.left = ballPosition[0] + "px"
    ball.style.top = ballPosition[1] + "px"
    borderCollide()
    controllerCollide()
}

let gameStart = setInterval(moveBall, 10)

// Collisions avec le cadre
function borderCollide() {
    if (ballPosition[0] + 34 > gameWidth || ballPosition[0] + 3 < 0) {
        xSpeed = -xSpeed
    }
    if (ballPosition[1] < 0) {
        ySpeed = -ySpeed
    }
    if (ballPosition[1] + 34 > gameHeight) {
        clearInterval(gameStart)
    }
}

// Collisions avec le controller
function controllerCollide() {
    if (ballPosition[0] + 32 > controllerPosition[0] && ballPosition[0] < controllerPosition[1] && // léger bug par ici de balle qui roule sur la planche :/
        ballPosition[1] > gameHeight - blockHeight * 2 - blockHeight / 2 - margin * 2) {
        ySpeed = -ySpeed
        console(ySpeed)
    }
}

// Controller
const controller = document.createElement("div")
controller.classList.add("controller")
controller.style.width = controllerSize + "px"
controller.style.height = blockHeight + "px"
controller.style.left = gameWidth / 2 - controllerSize / 2 + "px" // Valeur qui sera modifiée
controller.style.top = gameHeight - blockHeight - margin + "px"
game.appendChild(controller)

let controllerPosition = []
document.addEventListener("mousemove", function(e) { // valeurs 2 et 3 = game border modifier
    // if (e.clientX > game.getBoundingClientRect().x && game.getBoundingClientRect().x + gameWidth > e.clientX) { // Si la souris est dans la fenêtre de jeu
    if (e.clientX - game.getBoundingClientRect().x - 2 - controllerSize / 2 > 0 && e.clientX - game.getBoundingClientRect().x - 3 < gameWidth - controllerSize / 2) {
        controller.style.left = e.clientX - game.getBoundingClientRect().x - 3 - controllerSize / 2 + "px"
        controllerPosition[0] = e.clientX - game.getBoundingClientRect().x - 3 - controllerSize / 2
        controllerPosition[1] = controllerPosition[0] + controllerSize
    } else if (e.clientX - game.getBoundingClientRect().x - 3 - controllerSize / 2 < 0) {
        controller.style.left = "0px"
        controllerPosition[0] = 0
        controllerPosition[1] = controllerPosition[0] + controllerSize
    } else {
        controller.style.left = gameWidth - controllerSize + "px"
        controllerPosition[1] = gameWidth
        controllerPosition[0] = controllerPosition[1] - controllerSize
    }
    // }
})

// Play - Pause
const play = document.querySelector(".play")
play.addEventListener("click", function() {
    gameStart = setInterval(moveBall, 10)
})
const pause = document.querySelector(".pause")
pause.addEventListener("click", function() {
    clearInterval(gameStart)
})