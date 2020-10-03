class Bird extends BaseClass
{
    constructor(x, y)
    {
        super(x, y, 50, 50, "Bird");
        this.image = loadImage("sprites/bird.png");
        this.smokeImage = loadImage("sprites/smoke.png");
        this.trajectory = [];
    }

    display()
    {
        super.display();

        var pos = this.body.position;
        
        if(this.body.velocity.x > 10 && pos.x > 200)
        {
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }

        for(var i = 0; i< this.trajectory.length; i++)
        {
            image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
        }
    }
}