const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composite = Matter.Composite;

var engine, world;

var box1, box2, box3, box4, box5;
var pig1, pig2;
var log1, log2, log3, log4;
var bird;
var ground, platform;
var slingshot;

var refresh, menu;

var sling1, sling2;
var backgroundImage;
var bg = "sprites/bg.png";

var gameState = "onSling";

var score = 0;

function preload()
{
    getBackgroundImage();
    sling1 = loadImage("sprites/sling1.png");
    sling2 = loadImage("sprites/sling2.png");
}

function setup()
{
    createCanvas(1166, 648);
    
    engine = Engine.create();
    world = engine.world;

    box1 = new Box(916, 568, 80, 80);
    box2 = new Box(1096, 568, 80, 80);
    box3 = new Box(916, 488, 80, 80);
    box4 = new Box(1096, 488, 80, 80);
    box5 = new Box(1006, 418, 80, 80);

    pig1 = new Pig(1006, 568);
    pig2 = new Pig(1006, 488);

    log1 = new Log(1006, 518, 260, PI / 2);
    log2 = new Log(1006, 458, 260, PI / 2);
    log3 = new Log(946, 383, 150, PI / 5);
    log4 = new Log(1046, 383, 150, -PI / 5);

    ground = new Ground(683, 638, 1166, 40);
    platform = new Ground(140, 533, 290, 440);

    bird = new Bird(250, 190);
    slingshot = new Slingshot(bird.body, {x: 250, y: 190});

    refresh = createImg("sprites/menu_refresh.png");
    refresh.position(70, 20);

    menu = createImg("sprites/menu_back.png");
    menu.position(20, 20);
}

function draw()
{
    if(backgroundImage)
    {
        background(backgroundImage);
    }

    refresh.mousePressed(reset);
    menu.mousePressed(restart);

    noStroke();
    textSize(35);
    fill("white");
    text("Score: " + score, 866, 50);

    Engine.update(engine);

    ground.display();
	platform.display();
    
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();

    log1.display();
    log2.display();
    log3.display();
    log4.display();

    slingshot.display();

    image(sling1, 260, 183, 30, 130);
    bird.display();      
    image(sling2, 240, 183, 30, 80);
}

async function getBackgroundImage()
{
    var response = await fetch("//worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11, 13);

    if(hour >= 06 && hour <= 19)
    {
        bg = "sprites/bg.png";
    }
    else
    {
        bg = "sprites/bg2.jpg";
    }
    backgroundImage = loadImage(bg);
}

function mouseDragged()
{
    if(gameState !== "launched")
    {
        Body.setPosition(bird.body, {x: mouseX, y: mouseY});
        gameState = "onSling";
    }
}

function mouseReleased()
{
    if(gameState === "onSling")
    {
        slingshot.fly();
        gameState = "launched";
    }
}

function reset()
{
    if(isGameOver())
    {
        World.remove(world, bird.body);
        bird = new Bird(250, 190);
        slingshot.attach(bird.body);
        gameState = "start";
    }
    else
    {
        bird.trajectory = [];
    }
}

function restart()
{
}

function isGameOver() {
    var bodiesInWorld = Composite.allBodies(world);
    for(var i = 0; i < bodiesInWorld.length; i++)
    {
        if(bodiesInWorld[i].label === "Pig")
        {
            return true;
        }
    }
    return false;
}