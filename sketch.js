var gameState = "start";

var WaterFighter_Img, SpiderMan_Img, SirenTruck_Img;
var WaterFighter, SpiderMan, SirenTruck;
var Road_Img, ground, buildingfire_img;
var backgroundImg;
var person1, person1Img, person2, person2Img, person3, person3Img, person4, person4Img;
var pet1, pet1Img,pet2, pet2Img;
var personsGroup;
var sirenSound, watersplashSound;
var score = 0;

function preload(){

  WaterFighter_Img = loadAnimation("../Images/AnimatedWaterMan.gif");
  SpiderMan_Img = loadImage("../Images/SpiderMan.png");
  SirenTruck_Img = loadAnimation("../Images/SirenTruck.gif" );
  Road_Img = loadImage("../Images/RoadImg.jpg");
  buildingfire_img=loadImage("../Images/BuildingOnFire.jpg");

  person1Img=loadImage("../Images/RunningGirl.gif");
  person2Img=loadImage("../Images/Runningboy2.gif");
  person3Img=loadImage("../Images/Runningboy1.gif");
  person4Img=loadImage("../Images/Runningboy.gif");

  pet1Img=loadImage("../Images/pet1.png");
  pet2Img=loadImage("../Images/pet2.gif");

}
  




function setup() {
  createCanvas(windowWidth, windowHeight);
 

  WaterFighter = createSprite(480, 520, 20, 50);
  WaterFighter.addAnimation("fire",WaterFighter_Img); 
  WaterFighter.scale = 0.7;
  WaterFighter.visible = false;

  SpiderMan = createSprite(830, 100, 20, 50);
  SpiderMan.addImage(SpiderMan_Img); 
  SpiderMan.scale = 0.5;
  SpiderMan.visible = false;

  SirenTruck = createSprite(200, 550, 20, 50);
  SirenTruck.addAnimation("truck",SirenTruck_Img); 
  SirenTruck.scale = 0.7;
  
  personsGroup=new Group();
  backgroundImg = loadImage("../images/RoadImg.jpg");
  sirenSound = loadSound("../images/SIREN2.wav");
  watersplashSound = loadSound("../images/water_bigsplash.wav");
}

function draw() {
  
  background(backgroundImg);   

  if (keyDown("space") && gameState === "start"){

    gameState = "rescue";
    SirenTruck.x = 250;
  }
  
   if (gameState === "rescue"){
    sirenSound.play();
    if (keyDown("D")) {
      SirenTruck.x = SirenTruck.x +10;
      
     }  
     
    if (keyDown("A")) {
      SirenTruck.x = SirenTruck.x -10;
      
    }

     if (SirenTruck.x > 1400)
     {       
      SirenTruck.x = SirenTruck.width/3;
      getBackgroundImg(true);   
      //change the gamestate to save to save the people
      gameState="save";   
      WaterFighter.visible=true; 
     
       
     }   

    
  }

 
  if ( gameState==='save') {
      
    SirenTruck.visible=false;
    sirenSound.stop();
    WaterFighter.y=World.mouseY;
    WaterFighter.x=World.mouseX;
    spawnPeople();
    spawnPets();
     
    if (WaterFighter.isTouching(personsGroup))
    {
      watersplashSound.play();
      personsGroup.destroyEach();
      score=score+1;
      if (score===5){
        textSize(50);
        fill("blue");
        text("All have been rescued",55,200);
        gameState = "end";
        watersplashSound.stop();
      }
    }
  }   
   
  if(gameState === "end"){
   
    textSize(50);
    fill("Yellow");
    text("Your Score:"+ score,55,200);
    fill("Yellow");
    text("GAME OVER",50,110);
     textSize(20);
     fill(255);
     text("Press 'R' to restart the game",80,278);
     WaterFighter.visible=false;
     if(keyDown("r")){
       gameState = "start";
       getBackgroundImg(false);  
       SirenTruck.visible=true;

       score = 0;
      
     }
  }

  drawSprites();

  if (gameState === "start"){


    // game playing instructions
    fill("#006eff");
    textSize(45);
    text("RESCUE PEOPLE",40,60);
    stroke(0);
    textSize(30);
    fill("red");
    text("INSTRUCTIONS:",40,160);
    fill(0);
    textSize(24);
    text("Press 'SPACEBAR' to start the game",40,200);
    stroke(0);
    fill(0);   
    text("To move the FireTruck press 'D' key ", 40, 240);
    stroke(0);
    textSize(24);
    fill(0);
    text("Move the FireFighter person up and down using the mouse.",40,280);
     
  }
}

//Spawning of People
function spawnPeople() {
  if (frameCount % 120 ===0){
     
  var rand = Math.round(random(1,4));
  var person = createSprite(520  , Math.round(random(560,590))); 
 
  switch(rand){
    case 1:
      person.addImage(person1Img);   
      person.velocityX = (6); 
      break;
    case 2:
      person.addImage(person2Img); 
      person.velocityX = (6);  
      break;
    case 3:
      person.addImage(person3Img);    
      person.velocityX = (6);
        break;
    case 4:
      person.addImage(person4Img);   
      person.velocityX = (6); 
          break;
    
    default:
      break;
  }

  //assign scale and lifetime to the obstacle           
  person.scale = 0.2;
  person.lifetime = 300;
  //add each obstacle to the group
  personsGroup.add(person);
  }
}

//Spawning of pet
function spawnPets() {
  if (frameCount % 60 ===0){
     
  var rand = Math.round(random(1,2));
  var pet = createSprite(520  , Math.round(random(560,590))); 
 
  switch(rand){    
    case 1:
      pet.addImage(pet1Img); 
      pet.velocityX = -(6);   
      break;
    case 2:
      pet.addImage(pet2Img); 
      pet.velocityX = (6);   
          break;
    default:
      break;
  }

  //assign scale and lifetime to the obstacle           
  pet.scale = 0.2;
  pet.lifetime = 300;
  //add each obstacle to the group
  personsGroup.add(pet);
  }
}

//Change the background image
function getBackgroundImg(is_image){

  //load the image in backgroundImg variable here
  if (is_image){
  
    backgroundImg = loadImage("../images/BuildingOnFire.jpg");
   
  }
  else{
    backgroundImg = loadImage("../images/RoadImg.jpg");
  }
  
}

 
