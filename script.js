const gameBoard = document.getElementById('game-screen');
const scoreText = document.getElementById('score');

let gameInterval;
let snake;
let food;
let direction;
let score;

main();
console.log(food);

document.addEventListener('keydown', manageKey);

function manageKey(e) {
    switch(e.key){
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
    }
}

function main() {
    snake = [{x: 20, y: 20}];
    food = randomFood();
    score = 0;
    setScore();
    direction = 'right';
    globalDraw();
    console.log(snake.length);
    gameInterval = gameSet();
}

function setScore() {
    scoreText.textContent = score;
}

function gameSet() {
    return setInterval(move, 100);
}

function globalDraw() {
    gameBoard.innerHTML = '';
    drawSnake();
    drawFood();
}

function randomFood() {
    let x = Math.floor((Math.random() * 40) + 1);
    let y = Math.floor((Math.random() * 40) + 1);
    return {x, y};
}

function drawFood() {
    const newFood = document.createElement('div');
    newFood.className = 'food';
    setPosition(newFood, food)
    gameBoard.appendChild(newFood);
}

function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        const snakePart = document.createElement('div');
        snakePart.className = 'snake';
        setPosition(snakePart, snake[i]);
        gameBoard.appendChild(snakePart);
    }
}

function setPosition(target, element) {
    target.style.gridColumn = element.x;
    target.style.gridRow = element.y;
}

function move() {
    let head = {...snake[0]};

    switch(direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    if(!checkCollision(head)){

        snake.unshift(head);
        clearInterval(gameInterval);
        gameInterval = gameSet();

        if(!checkFood(head)) {
            snake.pop();
        }

    globalDraw();

    }
}

function checkCollision(head){
    if
    (borderCollision(head) || snakeCollision(head)) 
    {
        gameReset();
        return true;
    }
}

function borderCollision(head) {
    return head.x > 40 || head.x < 1 || head.y > 40 || head.y < 1;
}

function snakeCollision(head) {
    for (i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y){
            return true
        }
    }
}

function gameReset() {
    clearInterval(gameInterval);
    main();
}

function checkFood(head) {
    if(head.x === food.x && head.y === food.y) {
        food = randomFood();
        score++;
        setScore();
        return true;
    } else {
        return false;
    }
}