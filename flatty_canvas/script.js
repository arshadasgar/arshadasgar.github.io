 $('#start_game,#stop_game').attr('disabled', false);
 var bird_down = true
     , c = document.getElementById("can")
     , ctx = c.getContext("2d")
     , h = c.height
     , w = c.width
     , pw = pw2 = 80
     , ph = ph2 = initial_height = 180
     , px = px2 = w + 20
     , py = h - ph
     , py2 = 0
     , bw = 70
     , bh = 50
     , bx = 50
     , by = 100
     , anim_id = up_id = game_over = score_updated = false
     , speed = 4
     , count = 1
     , new_height = 0;
 ctx.fillStyle = "blue";
 ctx.fillRect(bx, by, bw, bh);
 ctx.fillStyle = "red";
 ctx.fillRect(px, py, pw, ph);
 ctx.fillStyle = "red";
 ctx.fillRect(px2, py2, pw2, ph2);

 function animation() {
     var rect1 = {
         x: px
         , y: py
         , width: pw
         , height: ph
     };
     var rect2 = {
         x: bx
         , y: by
         , width: bw
         , height: bh
     };
     var rect3 = {
         x: px2
         , y: py2
         , width: pw2
         , height: ph2
     };
     if (collision(rect1, rect2) || collision(rect3, rect2) || by <= 0 || by + bh >= h) {
         stop_the_game();
     }
     else {
         ctx.clearRect(px, py, pw, ph);
         if (px > -pw) {
             px = px - speed;
         }
         else {
             px = w + 10;
             score_updated = false;
             count++;
             if (count % 4 == 0) {
                 speed++;
             }
         }
         //Move pole 2
         ctx.clearRect(px2, py2, pw2, ph2);
         if (px2 > -pw2) {
             px2 = px2 - speed;
         }
         else {
             px2 = w + 10;
             new_height = parseInt(Math.random() * 100);
             ph = initial_height + new_height;
             py = h - ph;
             ph2 = initial_height - new_height;
         }
         //move bird
         if (bird_down) {
             ctx.clearRect(bx, by, bw, bh);
             ctx.fillStyle = "blue";
             by = by + 3;
             ctx.fillRect(bx, by, bw, bh);
         }
         draw_rect('red', px, py, pw, ph);
         draw_rect('red', px2, py2, pw2, ph2);
         if (bx > px + pw && score_updated == false) {
             $('#score').text(parseInt($('#score').text()) + 1);
             score_updated = true;
         }
         anim_id = requestAnimationFrame(animation);
     }
 }
 anim_id = requestAnimationFrame(animation);

 function draw_rect(color, xpos, ypos, rwidth, rheight) {
     ctx.fillStyle = color;
     ctx.fillRect(xpos, ypos, rwidth, rheight);
 }

 function up() {
     ctx.clearRect(bx, by, bw, bh);
     ctx.fillStyle = "blue";
     if (!bird_down) {
         by = by - 5;
     }
     ctx.fillRect(bx, by, bw, bh);
     up_id = requestAnimationFrame(up);
 }

 function collision(rect1, rect2) {
     if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y) {
         return true;
     }
     else {
         return false;
     }
 }

 function stop_the_game() {
     cancelAnimationFrame(anim_id);
     cancelAnimationFrame(up_id);
     game_over = true;
     $('#start_game,#stop_game').attr('disabled', true);
 }
 $('#start_game').click(function () {
     if (anim_id === false) requestAnimationFrame(animation);
 });
 $('#stop_game').click(function () {
     cancelAnimationFrame(anim_id);
     anim_id = false;
 });
 $('#restart_game').click(function () {
     location.reload();
 });
 $(document).on('keydown', function (e) {
     var key = e.keyCode;
     if (key == 32 && game_over == false) {
         bird_down = false;
         up_id = (up_id == false ? requestAnimationFrame(up) : false);
     }
 });
 $(document).on('keyup', function (e) {
     var key = e.keyCode;
     if (key == 32) {
         bird_down = true;
         cancelAnimationFrame(up_id);
         up_id = false;
     }
 });