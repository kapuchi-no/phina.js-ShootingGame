phina.globalize();


phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function() {
    this.superInit();

    // 背景色を指定
    this.backgroundColor = '#000';

    // player生成
    var player = TriangleShape().addChildTo(this);
    player.x = this.gridX.center();
    player.y = 800;
    player.radius = 20;
    this.player = player;
    //enemy生成
    var i, angle, number_of_enemy = 20;
    var enemy = new Array(number_of_enemy);
    for(i = 0; i < number_of_enemy; i++){
      enemy[i] = CircleShape().addChildTo(this);
      enemy[i].x = this.gridX.center();
      enemy[i].y = 300;
      enemy[i].radius = 20;
      angle = Math.floor(Math.random() * 361);
      enemy[i].vx = 8 * Math.cos(angle * 3.1415 / 180);
      enemy[i].vy = 8 * Math.sin(angle * 3.1415 / 180);
    }
    
    //enemy動作
    for(i = 0; i < number_of_enemy; i++){
      enemy[i].update = function() {
        this.x += this.vx;
        this.y += this.vy;
      
        if (this.left < 0) {
          this.left = 0;
          this.vx *= -1;
        }
        else if (this.right > 640) {
          this.right = 640;
          this.vx *= -1;
        }
        if (this.top < 0) {
          this.top = 0;
          this.vy *= -1;
        }
        else if (this.bottom > 960) {
          this.bottom = 960;
          this.vy *= -1;
        }
      }
    }
  },
  
  update: function(app) {
    //player動作
    var player_move = app.keyboard;
    if(player_move.getKey('left')){
      if(this.player.left > 0){
        this.player.x -= 8;
      }
    }
    if(player_move.getKey('right')){
      if(this.player.right < 640){
        this.player.x += 8;
      }
    }
    if(player_move.getKey('up')){
      if(this.player.top > 0){
        this.player.y -= 8;
      }
    }
    if(player_move.getKey('down')){
      if(this.player.bottom < 960){
        this.player.y += 8;
      }
    }
  }
});


phina.main(function() {
 
  var app = GameApp({
    startLabel: 'main',
  });
  
  app.run();
});
