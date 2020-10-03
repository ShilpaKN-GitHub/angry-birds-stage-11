class Pig extends BaseClass
{
  constructor(x, y)
  {
    super(x, y, 80, 80, "Pig");
    this.visibility = 255;
    this.image = loadImage("sprites/enemy.png");
  }

  score()
  {
    if(this.visibility < 0 && this.visibility > -1005)
    {
      score++;
    }
  }

  display()
  {
    if(this.body.speed < 3)
    {
      super.display();
    }
    else
    {
      World.remove(world, this.body);

      var pos = this.body.position;
      push();
      this.visibility = this.visibility - 5;
      tint(255, this.visibility);
      image(this.image, pos.x, pos.y, 80, 80);
      pop();
    }
  }
}