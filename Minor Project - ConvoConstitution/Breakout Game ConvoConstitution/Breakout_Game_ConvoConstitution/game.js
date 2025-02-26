var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Game Variables
var x, y, dx, dy, ballRadius, paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, score, lives, totalBricks, bricks;

// Start Screen
document.getElementById('start-button').addEventListener('click', startGame);

// End Screen
document.getElementById('try-again-button').addEventListener('click', startGame);

function startGame() {
    // Hide the start screen and show the game screen
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    
    // Game Initialization
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1.5; // Slightly faster initial horizontal speed
    dy = -1.5; // Slightly faster initial vertical speed
    ballRadius = 10;
    paddleHeight = 10;
    paddleWidth = 100; // Smaller paddle
    paddleX = (canvas.width - paddleWidth) / 2;
    rightPressed = false;
    leftPressed = false;
    brickRowCount = 4;
    brickColumnCount = 6;
    brickWidth = (canvas.width - (brickColumnCount + 1) * 10 - 60) / brickColumnCount;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    score = 0;
    lives = 5; // Starting lives
    totalBricks = brickRowCount * brickColumnCount; // Total number of bricks
    bricks = [];

    // Initialize bricks, some will require 2 hits
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: Math.random() > 0.5 ? 2 : 1 }; // Some bricks need two hits
        }
    }

    // Event Listeners for Keyboard and Mouse
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);

    // Start the game loop
    draw();
}

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
    if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

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
            var b = bricks[c][r];
            if (b.status > 0) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                b.x = brickX;
                b.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = b.status === 2 ? "#F15BB5" : "#FEE440"; // Two-hit bricks are purple
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FEE440";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FEE440";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Gameplay Updates
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status > 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    if (b.status === 2) {
                        b.status = 1; // One hit reduces to 1-hit brick
                    } else {
                        b.status = 0; // Brick is destroyed
                        score++;
                    }
                    if (score == totalBricks) {
                        showGameOver();
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                showGameOver();
            } else {
                resetBall();
            }
        }
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

function showGameOver() {
    // Hide the game screen and show the end screen with score summary
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('score-summary').textContent = "Your final score is: " + score;
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1.5; // Slightly faster horizontal speed
    dy = -1.5; // Slightly faster vertical speed
    paddleX = (canvas.width - paddleWidth) / 2;
}

