$(function () {

    var debug = true;

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');

    var cHeight = 400;
    var cWidth = 600;
    var snakeHeight = 10;
    var snakeWidth = 10;
    var disp = 10;
    var direction = 'down';
    var score = 0;
    var keyPressed = 40;
    var snake = [{
        x: 200,
        y: 40,
        oldX: 0,
        oldY: 0
    }, {
        x: 200,
        y: 30,
        oldX: 0,
        oldY: 0
    }, {
        x: 200,
        y: 20,
        oldX: 0,
        oldY: 0
    },
    {
        x: 200,
        y: 10,
        oldX: 0,
        oldY: 0
    },
    ];
    var food = {
        x: 0,
        y: 0,
        eaten: true
    };
    var gameLoop;

    init();

    function init() {
        startGame();
    }

    function startGame() {
        // gameLoop = requestAnimationFrame(fillSnake);
        gameLoop = setInterval(fillSnake, 100);
    }

    function stopGame() {
        // cancelAnimationFrame(gameLoop);
        clearInterval(gameLoop);
    }

    var counter = 0;

    function fillSnake() {
        console.log('Loop running')
        clearCanvas();
        fillScore();
        fillFood();
        ctx.fillStyle = 'yellow';
        $.each(snake, function (index, value) {
            // debugger
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if (index == 0) {
                if (collided(value.x, value.y)) {
                    stopGame();
                }
                if (eaten(value.x, value.y)) {
                    score++;
                    food.eaten = true;
                    addToSnake();
                }
                changeDirection(keyPressed);
            } else {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
        });
        // gameLoop = requestAnimationFrame(fillSnake);
    }

    function addToSnake() {
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

    function eaten(x, y) {
        return (x == food.x && y == food.y);
    }

    function fillFood() {
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
            xy = getEmptyPosition(xArray, yArray);
            return xy;
        } else {
            xy = food;
        }
        return xy;
    }

    function getEmptyPosition(xArray, yArray) {
        let newXY = {};
        newX = getRandomNumber(cWidth - 10, 10);
        newY = getRandomNumber(cHeight - 10, 10);
        if ($.inArray(newX, xArray) == -1 && $.inArray(newY, yArray) == -1) {
            newXY.x = newX;
            newXY.y = newY;
            return newXY;
        } else {
            return getEmptyPosition(xArray, yArray);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }

    function fillScore() {
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
        changeDirection(keyPressed);
    });

    function changeDirection(keyPressed) {
        if (keyPressed == 40) {
            if (direction != 'up') {
                goDown();
            } else {
                goUp();
            }
        } else if (keyPressed == 38) {
            if (direction != 'down') {
                goUp();
            } else {
                goDown();
            }
        } else if (keyPressed == 37) {
            if (direction != 'right') {
                goLeft();
            } else {
                goRight();
            }
        } else if (keyPressed == 39) {
            if (direction != 'left') {
                goRight();
            } else {
                goLeft();
            }
        } else {
            if (direction == 'down') {
                goDown();
            } else if (direction == 'up') {
                goUp();
            } else if (direction == 'left') {
                goLeft();
            } else if (direction == 'right') {
                goRight();
            }
        }
    }

    function goDown() {
        direction = 'down';
        snake[0].x = snake[0].oldX;
        snake[0].y = snake[0].oldY + disp;
    }

    function goUp() {
        direction = 'up';
        snake[0].x = snake[0].oldX;
        snake[0].y = snake[0].oldY - disp;
    }

    function goLeft() {
        direction = 'left';
        snake[0].x = snake[0].oldX - disp;
        snake[0].y = snake[0].oldY;
    }

    function goRight() {
        direction = 'right';
        snake[0].x = snake[0].oldX + disp;
        snake[0].y = snake[0].oldY;
    }

});