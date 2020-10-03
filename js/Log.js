class Log extends BaseClass
{
  constructor(x, y, height, angle)
  {
    super(x, y, 20, height, "Log");
    this.image = loadImage("sprites/wood2.png");
    this.visibility = 255;
    Body.setAngle(this.body, angle);
  }

  display()
  {
    if(this.body.speed < 5)
    {
      super.display();
    }
    else
    {
      World.remove(world, this.body);

      var pos = this.body.position;
      push();
      this.visibility = this.visibility - 2;
      tint(255, this.visibility);
      image(this.image, pos.y, pos.x, this.width, this.height);
      pop();
    }
  }
}