(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function() {
    this.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_X / 2];
    this.angle = Math.PI;
    this.radius = Ship.RADIUS;
    this.speed = 0;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var baseAngle1 = this.angle + (3 * Math.PI - Ship.TOP_ANGLE) / 4
    var baseAngle2 = this.angle - (3 * Math.PI - Ship.TOP_ANGLE) / 4

    var dTop = [this.radius * Math.sin(this.angle),
                  this.radius * Math.cos(this.angle)];
    var dBase1 = [this.radius * Math.sin(baseAngle1),
                  this.radius * Math.cos(baseAngle1)];
    var dBase2 = [this.radius * Math.sin(baseAngle2),
                  this.radius * Math.cos(baseAngle2)];

    var topPos = [this.pos[0] + dTop[0], this.pos[1] + dTop[1]];
    var base1Pos = [this.pos[0] + dBase1[0], this.pos[1] + dBase1[1]];
    var base2Pos = [this.pos[0] + dBase2[0], this.pos[1] + dBase2[1]];

    if (this.accelerating) {
      ctx.fillStyle = ((Math.random() > 0.2) ? "orange" : "red");
      ctx.beginPath();
      ctx.moveTo(base1Pos[0], base1Pos[1]);
      ctx.lineTo(base2Pos[0],base2Pos[1]);
      ctx.lineTo(this.pos[0] - dTop[0], this.pos[1] - dTop[1]);
      ctx.fill();
    }

    ctx.fillStyle = Ship.COLOR;
    ctx.beginPath();
    ctx.moveTo(topPos[0], topPos[1]);
    ctx.lineTo(base1Pos[0], base1Pos[1]);
    ctx.lineTo(base2Pos[0],base2Pos[1]);
    ctx.fill();
  };

  Ship.RADIUS = 30;
  Ship.COLOR = "blue";
  Ship.TOP_ANGLE = Math.PI / 20;

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.move = function() {
    this.pos[0] += this.direction()[0] * this.speed;
    this.pos[1] += this.direction()[1] * this.speed;

    if (this.pos[0] > Asteroids.Game.DIM_X) {
      this.pos[0] = 0;
    } else if (this.pos[0] < 0) {
      this.pos[0] = Asteroids.Game.DIM_X;
    };

    if (this.pos[1] > Asteroids.Game.DIM_Y) {
      this.pos[1] = 0;
    } else if (this.pos[1] < 0) {
      this.pos[1] = Asteroids.Game.DIM_Y;
    };
  };

  Ship.prototype.direction = function() {
    return [Math.sin(this.angle), Math.cos(this.angle)]
  };

  Ship.prototype.rotate = function(angle) {
    this.angle += angle;
  };

  Ship.prototype.accelerate = function(acceleration) {
    this.speed += acceleration;
  };


  Ship.prototype.fireBullet = function() {
    var ship = this;
    return new Asteroids.Bullet(ship.pos, ship.direction());
  };

})(this);