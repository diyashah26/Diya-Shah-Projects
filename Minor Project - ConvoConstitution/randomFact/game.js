// Game Variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x, y, dx, dy, ballRadius, paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, score, lives, totalBricks, bricks;

// Array of facts
const facts = [
    { description: "The Indian Constitution is the world's longest written constitution." },
    { description: "The Preamble is considered the foundation of the Constitution's philosophy." },
    { description: "India is a secular nation promoting harmony among religions." },
    { description: "The Constitution ensures equality and fundamental rights for all citizens." },
    { description: "The Constituent Assembly took 2 years, 11 months, and 18 days to draft it." }
];

// Start Game Initialization
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('try-again-button').addEventListener('click', startGame);

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';

    initializeGameVariables();
    draw();
}

function initializeGameVariables() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    ballRadius = 10;
    paddleHeight = 10;
    paddleWidth = 100;
    paddleX = (canvas.width - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    brickRowCount = 5;
    brickColumnCount = 7;
    brickWidth = (canvas.width - (brickColumnCount + 1) * 10) / brickColumnCount;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 10;
    score = 0;
    lives = 3;
    totalBricks = brickRowCount * brickColumnCount;
    bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);
    const factButton = document.getElementById('fact-button');
const factModal = document.getElementById('fact-modal');
const factText = document.getElementById('fact-text');
const closeModal = document.getElementById('close-modal');
    
}

// Event Handlers
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Drawing Functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#F15BB5";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00F5D4";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#FF6F61";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Collision Detection
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            if (brick.status === 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    score++;
                    totalBricks--;
                    if (totalBricks === 0) {
                        endGame("You win!");
                    }
                }
            }
        }
    }
}

// End Game
function endGame(message) {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    
    // Select a random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)].description;

    // Update the score and fact display
    document.getElementById('score-summary').textContent = `${message} Your score: ${score}.`;
    document.getElementById('random-fact').textContent = `Did you know? ${randomFact}`;
}

// Main Game Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                endGame("Game Over!");
                return;
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);

    factButton.addEventListener('click', () => {
        const randomFact = facts[Math.floor(Math.random() * facts.length)].description;
        factText.textContent = `Did you know? ${randomFact}`;
        factModal.style.display = 'block'; // Show the modal
    });
    
    // Close the modal
    closeModal.addEventListener('click', () => {
        factModal.style.display = 'none'; // Hide the modal
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === factModal) {
            factModal.style.display = 'none'; // Hide the modal
        }
    });
}
