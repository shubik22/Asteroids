(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos    = pos;
    this.vel    = vel;
    this.radius = radius;
    this.color  = color;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

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

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var xDiff = this.pos[0] - otherObject.pos[0];
    var yDiff = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    var radii = this.radius + otherObject.radius;

    return (distance < radii);
  };

})(this);