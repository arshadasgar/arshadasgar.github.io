$(function () {

    var emp_id = prompt('Please enter your employee id');
    if (emp_id != null && Number.isInteger(parseInt(emp_id))) {

        $('#emp_id_span').text(emp_id);

        var canvas = $('#canvas')[0],
            ctx = canvas.getContext('2d'),
            canvas_height = canvas.height,
            canvas_width = canvas.width,
            maveli_height = 100,
            maveli_width = 60,
            maveli_jumping_height = 250,
            maveli_x_position = 100,
            maveli_current_position = canvas_height - maveli_height,
            maveli_up_speed = -8,
            maveli_down_speed = 8,
            maveli_on_floor = true,
            base_image,
            pole_height = pole_2_height = pole_initial_height = 60,
            pole_max_height = 70,
            pole_width = 40,
            pole_x_position = pole_initial_position = pole_2_initial_position = canvas_width + pole_width,
            pole_2_x_position = pole_x_position + canvas_width / 2,
            pole_y_position = pole_2_y_position = pole_initial_y_position = canvas_height - pole_height,
            pole_max_y_position = canvas_height - pole_max_height,
            pole_speed = -5,
            pole_max_speed = -11,
            score = counter = 0,
            score_board = $('#score'),
            cloud_current_position = 700,
            cloud_2_current_position = 300,
            cloud_initial_position = canvas_width,
            cloud_y_pos = 80,
            cloud_width = 150,
            cloud_height = 150,
            cloud_2_y_pos = 15,
            cloud_2_width = 50,
            cloud_2_height = 50,
            is_game_over = false;


        loadMaveli(maveli_current_position);
        loadCloud();
        loadBulding();

        var animation = function () {
            if (!collision()) {
                counter++;
                if (counter % 8 == 0) {
                    score++;
                    if (pole_speed >= pole_max_speed && score != 0 && score % 100 == 0) {
                        pole_speed = pole_speed - 1;
                    }
                }
                score_board.text(score);

                clearCloud(cloud_current_position, cloud_y_pos, cloud_width, cloud_height);
                cloud_current_position = cloud_current_position - 1;
                if (cloud_current_position + cloud_width < 0) {
                    cloud_current_position = cloud_initial_position;
                }
                drawCloud(cloud_current_position, cloud_y_pos, cloud_width, cloud_height);

                clearCloud(cloud_2_current_position, cloud_2_y_pos, cloud_2_width, cloud_2_height);
                cloud_2_current_position = cloud_2_current_position - 0.3;
                if (cloud_2_current_position + cloud_2_width < 0) {
                    cloud_2_current_position = cloud_initial_position;
                }
                drawCloud(cloud_2_current_position, cloud_2_y_pos, cloud_2_width, cloud_2_height);


                clearPole(pole_x_position, pole_y_position, pole_width, pole_height);
                pole_x_position = pole_x_position + pole_speed;
                if (pole_x_position + pole_width < 0) {
                    changePoleHeight('pole_1');
                    pole_x_position = pole_initial_position;
                }
                drawPole(pole_x_position, pole_y_position, pole_width, pole_height);

                clearPole(pole_2_x_position, pole_2_y_position, pole_width, pole_2_height);
                pole_2_x_position = pole_2_x_position + pole_speed;
                if (pole_2_x_position + pole_width < 0) {
                    changePoleHeight('pole_2');
                    pole_2_x_position = pole_2_initial_position;
                }
                drawPole(pole_2_x_position, pole_2_y_position, pole_width, pole_2_height);

                animation_id = requestAnimationFrame(animation);
            } else {
                game_over();
            }
        };

        animation_id = requestAnimationFrame(animation);

        $(document).keydown(function (e) {
            var key = e.keyCode;
            if (key === 32 && maveli_on_floor == true) {
                maveli_on_floor = false;
                move_maveli_up();
            }
        });

        function move_maveli_up() {
            move_maveli_up_id = requestAnimationFrame(maveli_up);
        }

        maveli_up = function () {
            if (maveli_current_position > maveli_jumping_height && is_game_over == false) {
                clearMaveli(maveli_current_position);
                maveli_current_position = maveli_current_position + maveli_up_speed;
                drawMaveli(maveli_current_position);
                move_maveli_up_id = requestAnimationFrame(maveli_up);
            } else {
                move_maveli_down();
            }
        }

        function move_maveli_down() {
            move_maveli_down_id = requestAnimationFrame(maveli_down);
        }

        maveli_down = function () {
            if (maveli_current_position != canvas_height - maveli_height && is_game_over == false) {
                clearMaveli(maveli_current_position);
                maveli_current_position = maveli_current_position + maveli_down_speed;
                drawMaveli(maveli_current_position);
                move_maveli_down_id = requestAnimationFrame(maveli_down);
            } else {
                maveli_on_floor = true;
            }
        }

        function loadMaveli(maveli_y_position) {
            base_image = new Image();
            base_image.src = 'maveli_animated_2.png';
            base_image.onload = function () {
                ctx.drawImage(base_image, maveli_x_position, maveli_y_position, maveli_width, maveli_height);
            }
        }

        function loadCloud() {
            cloud_image = new Image();
            cloud_image.src = 'cloud_1.png';
            cloud_image.onload = function () {
                ctx.drawImage(cloud_image, cloud_current_position, cloud_y_pos, cloud_width, cloud_height);
                ctx.drawImage(cloud_image, cloud_2_current_position, cloud_2_y_pos, cloud_2_width, cloud_2_height);
            }
        }

        function loadBulding() {
            building = new Image();
            building.src = 'pipe.png';
        }

        function drawMaveli(maveli_y_position) {
            ctx.drawImage(base_image, maveli_x_position, maveli_y_position, maveli_width, maveli_height);
        }

        function drawCloud(x, y, w, h) {
            ctx.drawImage(cloud_image, x, y, w, h);
        }

        function drawPole(x, y, w, h) {
            ctx.drawImage(building, x, y, w, h);
        }

        function clearMaveli(maveli_y_position) {
            ctx.clearRect(maveli_x_position, maveli_y_position, maveli_width, maveli_height);
        }

        function clearCloud(x, y, w, h) {
            ctx.clearRect(x, y, w, h);
        }

        function collision() {
            if ((pole_x_position >= maveli_x_position && pole_x_position <= maveli_x_position + maveli_width &&
                    maveli_current_position + maveli_height >= pole_y_position) || (pole_2_x_position >= maveli_x_position && pole_2_x_position <= maveli_x_position + maveli_width &&
                    maveli_current_position + maveli_height >= pole_y_position)) {
                return true;
            }
            return false;
        }

        function clearPole(x, y, w, h) {
            ctx.clearRect(x, y, w, h);
        }

        function changePoleHeight(selected_pole) {
            if ((Math.floor(Math.random() * 100) + 1) % 2 == 0) {
                if (selected_pole == 'pole_1') {
                    pole_height = pole_max_height;
                    pole_y_position = pole_max_y_position;
                } else {
                    pole_2_height = pole_max_height;
                    pole_2_y_position = pole_max_y_position;
                }
            } else {
                if (selected_pole == 'pole_1') {
                    pole_height = pole_initial_height;
                    pole_y_position = pole_initial_y_position;
                } else {
                    pole_2_height = pole_initial_height;
                    pole_2_y_position = pole_initial_y_position;
                }
            }
        }

        function game_over() {
            maveli_on_floor = false;
            is_game_over = true;
            $.post('save.php', {
                emp_id: btoa(emp_id),
                score: btoa(score)
            }, function(resp) {

            });
        }

    } else {

    }



});