var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey , monkey_running , m ;

var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;

var Ground;

var bananaScore;

var backGround,backGroundImg;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  m = loadAnimation ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backGroundImg = loadImage("OIP (1).jpg")
  
}



function setup() {
     
  createCanvas(570,450);
  
  backGround = createSprite(290,250,590,500);
  backGround.addImage("adding backGround",backGroundImg);
  backGround.scale = 3 ; 
  backGround.x = backGround.width /2;
  
  backGround.velocityX = -4;
  
  
  
  monkey = createSprite(100,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale= 0.2; 
  monkey.addAnimation("m",m);

  
  
  ground= createSprite(230,448,700,50 );
  ground.visible = false;

    
  bananaScore = 0;

  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  background("black")
  
  
  
 if (gameState===PLAY){ 
       bananas();
       obstacles();
   
   
   if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach(); 
     bananaScore++;
   }
  
   monkey.velocityY = monkey.velocityY + 1;
   monkey.collide(ground);
   
   
   
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -30;
    }
  monkey.velocityY = monkey.velocityY + 1;
   
   
   if(obstacleGroup.isTouching(monkey)){
      
     gameState = END; 
     
   }
   if (backGround.x < 0){
      backGround.x = backGround .width/2;
    }
 }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (gameState === END){
  
    
  fruitGroup.destroyEach();
    
    monkey.changeAnimation ("m", m);
    monkey.velocityY = 0;
    
    monkey.destroy();
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    backGround.velocityX = 0;
    
    
   
    
  
    
}
  
  
  if(frameCount%2000 === 0){
    monkey.scale = monkey.scale + 0.05;
  }
  
  monkey.collide(ground);
  
  
  

drawSprites(); 
  
  fill("gold");
  stroke ("gold")
  textSize(25)
  
  text("BANANAS COLLECTED: " + bananaScore, 20,25);
  
  if (gameState === END){
    fill("black");
    stroke ("gold")
    textSize(40);
    text("U KILLED THE MONKEY",60,200);
  }
   
}



function bananas(){
  
  if (frameCount%140===0){
             
    banana = createSprite(570,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(70,230));
    banana.scale = 0.1;
    
    banana.velocityX = -(7 + 5*(bananaScore/100));
    banana.lifetime = 200; 
    
    fruitGroup.add(banana)
  }
}
   
function obstacles(){
  
  if (frameCount%100===0){
    
    obstacle = createSprite(570,390,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-(10 +3*(bananaScore/100) );
    obstacle.scale = 0.18 ;
    obstacle.lifetime = 200
  // obstacle.debug = true;
    obstacle.rotation = 5;
   
    obstacle.setCollider("circle",0,0,40);
    
    obstacleGroup.add(obstacle);    
  }
}



