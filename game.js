(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship();
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.FPS = 30;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    };
  };

  Game.prototype.draw = function() {
    var game = this;

    game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    game.asteroids.forEach(function(asteroid) {
      asteroid.draw(game.ctx);
    });

    game.bullets.forEach(function(bullet) {
      bullet.draw(game.ctx);
    });

    game.ship.draw(game.ctx);
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

    this.bullets.forEach(function(bullet) {
      bullet.move();
    });

    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkShipCollisions();
    this.checkBulletCollisions();
  };

  Game.prototype.checkShipCollisions = function() {
    var game = this;
    var collision = this.asteroids.some(function(asteroid) {
                      return asteroid.isCollidedWith(game.ship);
                    });
    if (collision) {
      window.alert("Game ovah.");
      game.stop();
    };
  };

  Game.prototype.checkBulletCollisions = function() {
    var game = this;

    for (var i = 0; i < game.bullets.length; i++) {
      var hitAsteroidIndex = game.bullets[i].hitAsteroids(game.asteroids);
      if (!isNaN(hitAsteroidIndex)) {
        game.removeAsteroid(hitAsteroidIndex);
        game.removeBullet(i);
      };
    };
  };

  Game.prototype.removeAsteroid = function(asteroidIndex) {
    this.asteroids.splice(asteroidIndex, 1);
  };

  Game.prototype.removeBullet = function(bulletIndex) {
    this.bullets.splice(bulletIndex, 1);
  }

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    key("left", function() {game.ship.rotate(Math.PI / 30)});
    key("right", function() {game.ship.rotate(-Math.PI / 30)});
    key("up", function() {game.ship.accelerate(1)});
    key("down", function() {game.ship.accelerate(-1)});
    key("space", function() {
      if (game.ship.fireBullet()) game.bullets.push(game.ship.fireBullet())});
  }

  Game.prototype.stop = function() {
    var game = this;
    window.clearInterval(game.intervalID)
  };

  Game.prototype.start = function() {
    var game = this;
    game.bindKeyHandlers();
    game.addAsteroids(Game.NUM_ASTEROIDS);
    game.draw();
    game.intervalID = window.setInterval(game.step.bind(game), Game.FPS);
  };
})(this);