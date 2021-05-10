
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;

var PLAY =1;
var END =0;
var gameState =1;
var survivalTime;
var jungleimg;

function preload(){ 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleimg = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,600);
  
   monkey =createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground =createSprite(400,350,1500,10);
  ground.velocityX =  -4;
  ground.x=ground.width/2;
  ground.addImage(jungleimg);
  
  score =0; 
  bananaGroup =new Group(); 
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  fill("black");
  textSize(20);
  text("Survival Time: " +score, 250, 50);
  fill("black");

  camera.position.y = monkey.y;
  
   if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
     if(keyDown("space") && monkey.y >= 200) {
        monkey.velocityY =-12;
      }   
  
      monkey.velocityY = monkey.velocityY + 0.8;
      createbanana();
     createObstacles();
     
    if (ground.x < 0){
          ground.x = ground.width/2;
    }
    if(monkey.isTouching(bananaGroup)) {
          bananaGroup.destroyEach();
          
    }
    if(monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      gameState = END; 
}
  }
  else if(gameState === END){
    textSize(20);
    text("Game Over",270,270);

  }
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function createbanana() {
  if (frameCount % 80 === 0) {
    var banana =createSprite(500,315,20,20);
     banana.y = Math.round(random(120,200));
    banana.addImage("banana", bananaImage); 
    banana.velocityX =-8;
    banana.lifeTime =150;
    banana.scale=0.1;
    
    bananaGroup.add(banana);
  }
  
  
}


function createObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,325,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.velocityX = -6
   
   obstacle.scale=0.1;
 
   
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
   obstacleGroup.add(obstacle)
   
  
 }
}








