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