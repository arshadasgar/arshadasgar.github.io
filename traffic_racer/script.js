/* Arshad Muhammed */
$(function () {

    var anim_id;

    //saving dom objects to variables
    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());
    
    var car_1_top;
    var car_2_top;
    
    var car_1_left;
    var car_2_left;
    var car_3_left;
   
    var car_1_top_initial = parseInt(car_1.css('top'));
    var car_2_top_initial = parseInt(car_2.css('top'));
    var car_3_top_initial = parseInt(car_3.css('top'));
    
    var car_1_left_initial = parseInt(car_1.css('left'));
    var car_2_left_initial = parseInt(car_2.css('left'));
    var car_3_left_initial = parseInt(car_3.css('left'));
    
    /*var line_1_top_initial = parseInt(line_1.css('top'));
    var line_2_top_initial = parseInt(line_2.css('top'));
    var line_3_top_initial = parseInt(line_3.css('top'));*/
    
    var line_1_top_initial = -300;
    var line_2_top_initial = -300;
    var line_3_top_initial = -300;

    //some other declarations
    var game_over = false;
    
    var count_1 = 1;
    var count_2 = 1;
    
    var score_counter = 1;
    
    var speed = 2;

    var speed_1 = 2;
    var speed_2 = 2;
    
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    var who_won;

    /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

    /* Move the cars */
    $(document).on('keydown', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    function left() {
        if (parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }
    
    function up() {
        if (parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }
    
    function down() {
        if (parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the balls */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (game_over === false) {
            if (collision(car, car_1) || collision(car, car_2)) {
                stop_the_game();
                return;
            }
            
            score_counter++;
            if(score_counter % 20 == 0){
                score.text(parseInt(score.text()) + 1);
            }
            
            car_down(car_1);   
            car_down(car_2);
            car_down(car_3);
            
            line_down(line_1);
            line_down(line_2);
            line_down(line_3);

            anim_id = requestAnimationFrame(repeat);
        }
    }
    
    function car_down(car){
        var car_current_top = parseInt(eval(car).css('top'));
        if(car_current_top > container_height){
            car_top = -200;  
            var car_left = parseInt(Math.random() * 250);
        }else{
            car_top = car_current_top;
        }
        car.css('top', car_top + speed);
        car.css('left', car_left);
    }
    
    function line_down(line){
        var line_top;
        var line_current_top = parseInt(line.css('top'));
        if(line_current_top > container_height){
            line_top = -300;    
        }else{
            line_top = line_current_top;
        }
        line.css('top', line_top + line_speed);
    }

    restart_btn.click(function () {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        restart_div.slideDown();
        restart_btn.focus();
    }
    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


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

/*function car_1_down(){
        car_1_top_current = parseInt(car_1.css('top'));
        if(car_1_top_current > container_height){
            car_1_top = car_1_top_initial;    
            car_1_left = parseInt(Math.random() * 300);
            //if(count_1 % 3 == 0)
            //  speed_1++;
            //count_1++;
        }else{
            car_1_top = car_1_top_current;
        }
        car_1.css('top', car_1_top + speed);
        car_1.css('left', car_1_left);
    }
    
    function car_2_down(){
        car_2_top_current = parseInt(car_2.css('top'));
        if(car_2_top_current > container_height){
            car_2_top = car_2_top_initial;  
            car_2_left = parseInt(Math.random() * 250);
            //if(count_2 % 3 == 0)
             //   speed_2++;
            //count_2++;
        }else{
            car_2_top = car_2_top_current;
        }
        car_2.css('top', car_2_top + speed);
        car_2.css('left', car_2_left);
    }
    
    function car_3_down(){
        car_3_top_current = parseInt(car_3.css('top'));
        if(car_3_top_current > container_height){
            car_3_top = car_3_top_initial;  
            car_3_left = parseInt(Math.random() * 250);
            //if(count_2 % 3 == 0)
            //    speed_2++;
            //count_2++;
        }else{
            car_3_top = car_3_top_current;
        }
        car_3.css('top', car_3_top + speed);
        car_3.css('left', car_3_left);
    }*/
    
    /*function line_1_down(){
        line_1_top_current = parseInt(line_1.css('top'));
        if(line_1_top_current > container_height){
            line_1_top = line_1_top_initial;    
        }else{
            line_1_top = line_1_top_current;
        }
        line_1.css('top', line_1_top + line_speed);
    }
    
    function line_2_down(){
        line_2_top_current = parseInt(line_2.css('top'));
        if(line_2_top_current > container_height){
            line_2_top = line_2_top_initial;    
        }else{
            line_2_top = line_2_top_current;
        }
        line_2.css('top', line_2_top + line_speed);
    }
    
    function line_3_down(){
        line_3_top_current = parseInt(line_3.css('top'));
        if(line_3_top_current > container_height){
            line_3_top = line_3_top_initial;    
        }else{
            line_3_top = line_3_top_current;
        }
        line_3.css('top', line_3_top + line_speed);
    }*/