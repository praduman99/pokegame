
window.onload = function() {
    'use strict';
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w = document.getElementById('canvas').offsetWidth;
    var h = document.getElementById('canvas').offsetHeight;
    var terrainImageLoaded = false,
      pokeballImageLoaded = false, 
      playerImageLoaded = false;

    var objectSizes = 30;
    var speed = 100;
    var modifier = 100;
    var score = 0;

    var terrainImage = new Image();
    terrainImage.onload = function() {
      terrainImageLoaded = true;
      assetsLoaded();
    };
    terrainImage.src = './ground.jpg';
  
    var playerImage = new Image();
    playerImage.onload = function() {
      pokeballImageLoaded = true;
      assetsLoaded();
    };
    playerImage.src = './pokemon.png';
    
    var pokeballImage = new Image();
    pokeballImage.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    pokeballImage.src = './pokeball.png';
  
    var pokeball = {
      x: '0px',
      y: '0px',
      spritePosition: 0,
    };
    
    pokeball.generatePosition = function() {

      do {
        
        pokeball.x = Math.floor(Math.random() * 38) + 1;
        pokeball.y = Math.floor(Math.random() * 16) + 1;

      
      
        }
       while (check_collision(pokeball.x, pokeball.y));
  
      pokeball.spritePosition = Math.floor(Math.random() * 4) + 0; 
    };
    
  
    var player = {
      x: Math.round(w / 2 / objectSizes),
      y: Math.round(h / 2 / objectSizes)
    };

    player.move = function(direction) {
      var hold_player = {
        x: player.x,
        y: player.y,
      };
  
      switch (direction) {
        case 'left':
          player.x -= speed / modifier;
          break;

        case 'right':
          player.x += speed / modifier;
          break;

        case 'up':
          player.y -= speed / modifier;
          break;

        case 'down':
          player.y += speed / modifier;
          break;
      }
  
      if (check_collision(player.x, player.y)) {
        player.x = hold_player.x;
        player.y = hold_player.y;
      }
  
      if (player.x == pokeball.x && player.y == pokeball.y) {
        
        score += 1;
       
        pokeball.generatePosition();
       
      }
  
      update();
    };
  
    function update() {

      ctx.drawImage(terrainImage, 0, 0);
      board();

      ctx.drawImage(
        pokeballImage,
        pokeball.x * objectSizes,
        pokeball.y * objectSizes,
        objectSizes,
        objectSizes
        
      );
      ctx.drawImage(
        playerImage,
        player.x * objectSizes,
        player.y * objectSizes,
        objectSizes,
        objectSizes
      );
    }
  
    function check_collision(x, y) {
      var foundCollision = false;
  
      if (
        x < 0  ||
        x > 24 ||
        y < 0  ||
        y > 16 ||
        x>21 && y>14
      ) {
        console.log('Age Boundary hai');
        foundCollision = true;
      }
      return foundCollision;
    }
    function board() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(w - 100, h - 70, 100, 70);
  
      ctx.font = '18px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('You Found', w - 93, h - 45);
  
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(score + ' poketballs', w - 85, h - 25);
    }
  
    function assetsLoaded() {
      if (
        terrainImageLoaded == true &&
        pokeballImageLoaded == true &&
        playerImageLoaded == true
      ) {
        
        pokeball.generatePosition();
        update();
      }
    }
  
    document.onkeydown = function(e) {
      e = e || window.event;
  
            if (e.keyCode == '37') player.move('left');
      else if (e.keyCode == '38') player.move('up');
      else if (e.keyCode == '39') player.move('right');
      else if (e.keyCode == '40') player.move('down');
    };
  };