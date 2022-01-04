var boyrunning_Img,boyrun_Img;
var ground1,boy1;
var groundImg,ground;
var stone,stoneImg;
var powercollected = 0
var score=0
var jumpsound,collidesound;
var cloud,cloudImg;
function preload() {
 boyrunning_Img = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png","boy9.png");
groundImg = loadImage ("ground.png");
stoneImg = loadImage("obstacle1.png");
boy_collide = loadImage("boy5.png");
powerImg = loadImage("power.png");
obsImg = loadImage("cactus.png");
resetImg = loadImage("restart.png");
jumpsound = loadSound("jump.wav")
collidesound = loadSound("collided.wav")
cloudImg = loadImage("cloud.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 


ground = createSprite(windowWidth/2,windowHeight/2+290,windowWidth+500,50);
ground.addImage("track",groundImg);
ground.scale=1.5
ground.velocityX=-7

boy1 = createSprite(windowWidth/2-500,windowHeight/2+195,50,50)
 boy1.addAnimation("run",boyrunning_Img);
 boy1.scale=0.5
 boy1.debug=false
 boy1.setCollider("circle",0,0,65)
 

 ground1 = createSprite(windowWidth/2,windowHeight/2+250,windowWidth,20);
 ground1.shapeColor="white"
 ground1.visible=false
 powergr = new Group();
 obstaclegr = new Group();
}

function draw() {                
  background("skyblue");

  if(keyDown("SPACE") ) {
    boy1.velocityY =-5;
    jumpsound.play();
  }
 score = score + Math.round(getFrameRate()/60);
boy1.velocityY+=0.2
 if(ground.x<560){
    ground.x=windowWidth/2-5
  }
      
if(boy1.isTouching(powergr)){
    powergr.destroyEach();
    boy1.scale+=0.1
    powercollected+=1
  }
  if(boy1.collide(obstaclegr)){
  boy1.destroy();
  collidesound.play();
  background("red")
  stone.velocityX=0
 
  }

boy1.collide(ground1)
spawnobstacle();
spawncolud();
 spawnpower();
 spawnobstacle2();
  drawSprites();
  textSize(25);
  fill("black")
  text("power collected : "+ powercollected,windowWidth/2-650,windowHeight/2-300)

   textSize(25);
  fill("black")
  text("score : "+ score,windowWidth/2+500,windowHeight/2-300)
}


function spawnobstacle(){
  if(frameCount %200===0){
    var stone = createSprite(windowWidth/2+600,windowHeight/2+245,50,50)
    stone.debug=false
    stone.setCollider("circle",0,0,300)
      stone.addImage("obs",stoneImg)
      stone.scale=0.07
      // stone.y = random(555,550);    
       stone.velocityX=-6
       stone.lifetime = windowWidth/2-475;
      obstaclegr.add(stone);
       
      }
}


function spawnpower(){
if (frameCount %500 ===0){
  var power = createSprite(windowWidth/2+600,windowHeight/2+150,50,50)
  power.addImage("pow",powerImg)
  power.scale=0.3
  power.velocityX=-6
  power.lifetime = windowWidth/2-440;
  powergr.add(power)
}

}

function spawnobstacle2(){
 if(frameCount %500 ===0){
   var plant = createSprite(windowWidth/2+600,windowHeight/2+243,50,50)
   plant.addImage("danger",obsImg)
   plant.debug=false
   plant.setCollider("circle",0,0,40)
   plant.scale=0.5
   plant.velocityX=-6
   plant.lifetime = windowWidth/2-440
   obstaclegr.add(plant);
 }

}

function spawncolud(){
  if(frameCount %130 === 0 ){
    var cloud = createSprite(windowWidth/2+600,windowHeight/2-200,50,50)
    cloud.addImage("clo",cloudImg)
    cloud.scale=0.8
    cloud.velocityX=-5
    
    
  }
}