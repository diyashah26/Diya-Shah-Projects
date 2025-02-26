var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Game Variables
var x, y, dx, dy, ballRadius, paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft, score, lives, totalBricks, bricks;

// Messages for game completion
const messages = [
    "The Indian Constitution is the world's longest written constitution. When it was implemented in 1950, it was made up of 395 articles and 8 schedules, and was about 145,000 words long.",
    "The Preamble of the Constitution is a key part of the Constitution, and is considered to be the foundation of its philosophy. It is a basic structure of the Constitution, and is a key feature for every amendment.",
    "The Constitution guarantees fundamental rights to all citizens, which ensure equality and freedom.",
    "The Constitution establishes India as a secular nation, which promotes harmony among different religions.",
    "India has a federal system, where powers are shared between the central government and state governments.",
    "The Constitution has a clear process for making changes, which allows it to adapt to new situations.",
    "The Constitution borrowed some features from the USA, and fundamental duties and the ideal of justice from the USSR.",
    "The original Constitution is handwritten, and each page was decorated by artists from Shantiniketan.",
    "The elephant is the symbol of the constituent assembly.",
    "Dr. B.R. Ambedkar, known as the architect of the Constitution, called it a 'living document' because of its adaptability.",
    "The Indian Constitution is both rigid and flexible, meaning some parts require a simple majority to amend, while others need a special majority.",
    "The Constituent Assembly took 2 years, 11 months, and 18 days to draft the Indian Constitution.",
    "The Constitution was adopted on November 26, 1949, but it came into effect on January 26, 1950, to honor the date of the Declaration of Independence in 1930.",
    "The Constitution has undergone more than 100 amendments since its inception, demonstrating its ability to evolve with the nation.",
    "India celebrates November 26 as Constitution Day to honor the adoption of the Constitution.",
    "The Ninth Schedule was added to protect land reform and other laws from judicial review.",
    "The Directive Principles of State Policy, inspired by Ireland, aim to guide the government in establishing social and economic democracy.",
    "Fundamental Duties were added in 1976 during the Emergency, inspired by the Soviet Constitution.",
    "The 42nd Amendment is often called the 'Mini-Constitution' because it brought about the most widespread changes.",
    "The Indian Constitution includes provisions for abolishing untouchability and promoting equality through Article 17.",
];
function getRandomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}

// Start Screen
document.getElementById('start-button').addEventListener('click', startGame);

// End Screen
document.getElementById('try-again-button').addEventListener('click', startGame);

function startGame() {
    // Remove blur from canvas
    canvas.classList.remove('blur');

    // Hide the start screen and show the game screen
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';

    // Game Initialization (rest of the code remains the same)
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1.5;
    dy = -1.5;
    ballRadius = 10;
    paddleHeight = 10;
    paddleWidth = 100;
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
    lives = 5;
    totalBricks = brickRowCount * brickColumnCount;
    bricks = [];

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: Math.random() > 0.5 ? 2 : 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);

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
                ctx.fillStyle = b.status === 2 ? "#F15BB5" : "#FEE440";
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

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status > 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    if (b.status === 2) {
                        b.status = 1;
                    } else {
                        b.status = 0;
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
    
    canvas.classList.add('blur');

    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';

    const randomMessage = getRandomMessage();
    const dialogueBox = document.createElement("div");
    dialogueBox.style.width = "50%";
    dialogueBox.style.margin = "auto";
    dialogueBox.style.padding = "20px";
    dialogueBox.style.backgroundColor = "#00BBF9";
    dialogueBox.style.borderRadius = "10px";
    dialogueBox.style.textAlign = "center";
    dialogueBox.style.boxShadow = "0 0 20px #00ffcc";

    const heading = document.createElement("h2");
    heading.style.color = "#FFFFFF";
    heading.textContent = "Did you know? 💡";

    const messageEl = document.createElement("p");
    messageEl.style.fontSize = "18px";
    messageEl.style.color = "#FFFFFF";
    messageEl.textContent = randomMessage;

    const scoreEl = document.createElement("p");
    scoreEl.style.fontSize = "16px";
    scoreEl.style.color = "#FFFFFF";
    scoreEl.textContent = "Your final score is: " + score;

    dialogueBox.appendChild(heading);
    dialogueBox.appendChild(messageEl);
    dialogueBox.appendChild(scoreEl);

    const endScreen = document.getElementById('end-screen');
    endScreen.innerHTML = ""; 
    endScreen.appendChild(dialogueBox);
    endScreen.appendChild(document.getElementById("try-again-button"));
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 1.5;
    dy = -1.5;
    paddleX = (canvas.width - paddleWidth) / 2;
}