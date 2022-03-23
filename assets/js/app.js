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

// Controller

const controller = document.createElement("div")
controller.classList.add("controller")
controller.style.width = controllerSize + "px"
controller.style.height = blockHeight + "px"
controller.style.left = gameWidth / 2 - controllerSize / 2 + "px" // Valeur qui sera modifiée
controller.style.bottom = margin + "px"
game.appendChild(controller)

document.addEventListener("mousemove", function(e) { // 2 - 3 = game border modifier
    if (e.clientX > game.getBoundingClientRect().x + controllerSize / 2 + 2 && game.getBoundingClientRect().x + gameWidth - controllerSize / 2 + margin > e.clientX) {
        // if (controller.style.left.split("px")[0] > 3) {
            controller.style.left = e.clientX - game.getBoundingClientRect().x - 3 - controllerSize / 2 + "px"
        // } else {
        // }
    }
})