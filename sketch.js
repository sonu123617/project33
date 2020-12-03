const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var particles = [];
var plinkos = [];
var divisions = [];

var dH = 300;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var particle;
var division1,division2,division3,division4;
var score = 0;
var turn = 0;

function setup() {
  createCanvas(505,800);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(240,790,510,20);

  division1 = new Divisions(252.5,800,505,10);
  division2 = new Divisions(505,400,10,800);
  division3 = new Divisions(0,400,10,800);
  division4 = new Divisions(252.5,0,505,10);

  for( var k = 0; k<= width; k = k+50){
    divisions.push(new Divisions(k,650,10,300));
  }

  for(var j=40;j<=width;j=j+50){
    plinkos.push(new Plinko(j,75));
  }

  for(var j=15;j<=width-10;j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for(var j=50;j<=width-20;j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for(var j=25;j<=width-30;j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  
}

function draw() {
  background(0);  
  Engine.update(engine);

  fill("white");
  textSize(25);
  //text(mouseX+","+mouseY,mouseX,mouseY)
  text("Score : " + score,40,40);  
  textSize(15);
  text("500",15,700);
  text("500",65,700);
  text("500",115,700);
  text("500",165,700);
  text("500",215,700);
  text("500",265,700);
  text("100",315,700);
  text("100",365,700);
  text("100",415,700);
  text("100",465,700);

  ground.display();

   
  for(var j = 0; j < plinkos.length;j++){
    plinkos[j].display();
  }

  for(var k = 0; k < divisions.length;k++){
    divisions[k].display();
  }

  if(particle != null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x<300){
        score=score+500;
        particle=null;
        if(turn>=5)gamestate=END;
      }
    
  

  else if(particle.body.position.x<600&&particle.body.position.x>301){
    score=score+100;
    particle=null;
    if(turn>=5)gamestate=END;
  }

  else if(particle.body.position.x<900&&particle.body.position.x>601){
    score=score+200;
    particle=null;
    if(turn>=5)gamestate=END;
  }
  }
}
if(turn>= 5){
    fill("white");
    textSize(20);
    if(score>1000){
      text("Wow! You have scored " + score ,100,250);
      text("    Game Over",100,300);
    }
    if(score<1000){
      text("Your score is, " + score + " It's Ok, Better luck next time!",30,250);
    }
  }
  fill("red");
  division1.display();
  division2.display();
  division3.display();
  division4.display();
}

function mouseClicked(){
  if(gamestate !== END){
    particle = new Particles(mouseX,10,10,10);
    turn++;
    if(turn>=5)gamestate=END;
  }
}