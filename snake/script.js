$(function () {

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = canvas.height;
    var cWidth = canvas.width;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var blockSize = 10;
    var direction = 'down';
    var score = 0;
    var keyPressed = 40;
    var snake = [
        { x: 200, y: 40, oldX: 0, oldY: 0 },
        { x: 200, y: 30, oldX: 0, oldY: 0 },
        { x: 200, y: 20, oldX: 0, oldY: 0 },
        { x: 200, y: 10, oldX: 0, oldY: 0 },
    ];
    var food = {
        x: 50,
        y: 50,
        eaten: false
    };

    var game;

    startGame();

    function startGame() {
        game = setInterval(gameLoop, 100);
    }

    function stopGame() {
        clearInterval(game);
    }

    function gameLoop() {
        clearCanvas();
        drawScore();
        drawFood();
        drawSnake();
    }

    function drawSnake() {
        ctx.fillStyle = 'yellow';
        $.each(snake, function (index, value) {
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if (index == 0) {
                if (collided(value.x, value.y)) {
                    stopGame();
                } else {
                    if (caughtFood(value.x, value.y)) {
                        updateScore();
                        updateFoodEatenFlag();
                        makeSnakeBigger();
                    }
                    moveSnake(keyPressed);
                }
            } else {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
        });
    }

    function updateScore() {
        score++;
    }

    function updateFoodEatenFlag() {
        food.eaten = true;
    }

    function makeSnakeBigger() {
        snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y
        });
    }

    function collided(x, y) {
        return snake.filter((item, index) => {
            return index != 0 && item.x == x && item.y == y
        }).length > 0 || x < 0 || x > cWidth || y < 0 || y > cHeight;
    }

    function caughtFood(x, y) {
        return (x == food.x && y == food.y);
    }

    function drawFood() {
        ctx.fillStyle = 'red';
        xy = getPositionForFood();
        x = xy.x;
        y = xy.y;
        food = {
            x: x,
            y: y,
            eaten: false
        };
        ctx.fillRect(x, y, snakeWidth, snakeHeight);
    }

    function getPositionForFood() {
        let xy;
        if (food.eaten == true) {
            let xArray = yArray = [];
            $.each(snake, function (index, value) {
                if ($.inArray(value.x, xArray) == -1) {
                    xArray.push(value.x);
                }
                if ($.inArray(value.y, yArray) == -1) {
                    yArray.push(value.y);
                }
            });
            xy = getEmptyBlock(xArray, yArray);
        } else {
            xy = food;
        }
        return xy;
    }

    function getEmptyBlock(xArray, yArray) {
        let newXY = {};
        newX = getRandomNumber(cWidth - 10, 10);
        newY = getRandomNumber(cHeight - 10, 10);
        if ($.inArray(newX, xArray) == -1 && $.inArray(newY, yArray) == -1) {
            newXY.x = newX;
            newXY.y = newY;
            return newXY;
        } else {
            return getEmptyBlock(xArray, yArray);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }

    function drawScore() {
        ctx.font = 'bold 102px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255,255,255, 0.2)';
        let x = cWidth / 2;
        let y = cHeight / 2;
        ctx.fillText(score, x, y);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, cWidth, cHeight);
    }

    $(document).keydown(function (e) {
        keyPressed = e.which;
        moveSnake(keyPressed);
    });

    function moveSnake(keyPressed) {
        if (keyPressed == 40) {
            if (direction != 'up') {
                moveDown();
            } else {
                moveUp();
            }
        } else if (keyPressed == 38) {
            if (direction != 'down') {
                moveUp();
            } else {
                moveDown();
            }
        } else if (keyPressed == 37) {
            if (direction != 'right') {
                moveLeft();
            } else {
                moveRight();
            }
        } else if (keyPressed == 39) {
            if (direction != 'left') {
                moveRight();
            } else {
                moveLeft();
            }
        } else {
            if (direction == 'down') {
                moveDown();
            } else if (direction == 'up') {
                moveUp();
            } else if (direction == 'left') {
                moveLeft();
            } else if (direction == 'right') {
                moveRight();
            }
        }
    }

    function moveDown() {
        direction = 'down';
        snake[0].x = snake[0].oldX;
        snake[0].y = snake[0].oldY + blockSize;
    }

    function moveUp() {
        direction = 'up';
        snake[0].x = snake[0].oldX;
        snake[0].y = snake[0].oldY - blockSize;
    }

    function moveLeft() {
        direction = 'left';
        snake[0].x = snake[0].oldX - blockSize;
        snake[0].y = snake[0].oldY;
    }

    function moveRight() {
        direction = 'right';
        snake[0].x = snake[0].oldX + blockSize;
        snake[0].y = snake[0].oldY;
    }

});