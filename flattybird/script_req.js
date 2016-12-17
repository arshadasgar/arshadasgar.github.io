$(function () {
    //saving dom objects to variables
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');
    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 5;
    //some other declarations
    var go_up = false;
    var score_updated = false;
    var game_over = false;
    var anim_id;
    var the_game = function () {
        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
            stop_the_game();
        }
        else {
            var pole_current_position = parseInt(pole.css('right'));
            //update the score when the poles have passed the bird successfully
            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }
            //check whether the poles went out of the container
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);
                //change the pole's height
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);
                //increase speed
                speed = speed + 1;
                speed_span.text(speed);
                score_updated = false;
                pole_current_position = pole_initial_position;
            }
            //move the poles
            pole.css('right', pole_current_position + speed);
            if (go_up === false) {
                go_down();
            }
        }
        anim_id = requestAnimationFrame(the_game);
    };
    anim_id = requestAnimationFrame(the_game);
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = requestAnimationFrame(up);
        }
    });
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            cancelAnimationFrame(go_up);
            go_up = false;
        }
    });

    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 3);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 6);
        go_up = requestAnimationFrame(up);
    }

    function stop_the_game() {
        cancelAnimationFrame(anim_id);
        game_over = true;
        restart_btn.slideDown();
    }
    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});