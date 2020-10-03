class Slingshot
{
    constructor(bodyA, pointB)
    {
        var options =
        {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.sling3 = loadImage("sprites/sling3.png");
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    attach(body)
    {
        this.sling.bodyA = body;
    }

    fly()
    {
        this.sling.bodyA = null;
    }

    display()
    {
        if(this.sling.bodyA)
        {
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;

            push();
            stroke(48, 22, 8);
            if(pointA.x < 260)
            {
                strokeWeight(8);
                line(pointA.x - 20, pointA.y, pointB.x - 10, pointB.y + 10);
                line(pointA.x - 20, pointA.y, pointB.x + 27, pointB.y + 13);
                image(this.sling3, pointA.x -25, pointA.y - 10, 7, 20);
            }
            else
            {
                strokeWeight(4);
                line(pointA.x + 25, pointA.y, pointB.x - 10, pointB.y + 10);
                line(pointA.x + 25, pointA.y, pointB.x + 27, pointB.y + 13);
                image(this.sling3, pointA.x + 20, pointA.y - 10, 7, 20);
            }
            pop();
        }
    }
}