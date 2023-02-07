let circleX, circleY;
let playerHealth = 100;
let playerAlive = true;
let enemyX;
let enemyY;
let enemyHealth = 100;
let enemyAlive = true;
let healthPotionX;
let healthPotionY;
let potionGot = true;
let swordX = 50;
let swordY = 300;
let swordAngle = 0;
let swordsound;
let detectionRange = 200;
let showwarning = false;
let playing = false;
let playButton;
let playAbutton;
let page = 0;
let soundPlayed = false;
let stabbedsound;
let stabbedsoundplayed = false;
let gotpotionsound;
let gotpotionsoundplayed;
let victorysound;
let defeatsound;
let warningsound;
let warningsoundplayed = false;
let exclaplayed = false;
let potionloop;

var direction;
var jmap;
var playerimg;
var enemyimg;
var enemyimg2;
var enemyangry;
var potion;
var swordhandle;
var sword;
var excla;
let myFont;

function preload() {
  jmap = loadImage("canvass.jpg");
  playerimg = loadImage("Knight.png");
  enemyimg = loadImage("enemyEye.png");
  enemyimg2 = loadImage("enemyEye2.png");
  enemyangry = loadImage("enemyangry.png");
  potion = loadImage("potion.png");
  swordhandle = loadImage("swordhandle.png");
  sword = loadImage("sword.png");
  excla = loadImage("excla.png");
  swordsound = loadSound("swordsound.flac");
  stabbedsound = loadSound("stabbed.mp3");
  gotpotionsound = loadSound("gotpotion.wav");
  victorysound = loadSound("victorysound.mp3");
  defeatsound = loadSound("defeatsound.mp3");
   warningsound = loadSound("warning.mp3");
  myFont = loadFont('zeld.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);

  direction = {
    x: random(-1, 1),
    y: random(-1, 1),
  };
  
healthPotionX = random(30,width-30);
healthPotionY = random(30,height-30);

enemyX = width-80;
enemyY = 80;
}



function draw() {
  if (page === 0) {
    playMenu();
  } else if (page === 1) {
    playOn();
  }
}

function playOn() {
  page = 1;
  playButton.remove();
  loop();
  background(220);
  imageMode(CENTER);
  image(jmap, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);

  circleX = mouseX;
  circleY = mouseY;
  
  stroke(3)
  strokeWeight(1);
  fill(200, 200, 200);
  rect(mouseX-50, mouseY-30, 40, 5);
  fill(0, 255, 0);
  rect(mouseX-50, mouseY-30, playerHealth/2.5, 5);
  fill(255);
  textSize(10);
  fill(0, 255, 0);
  
  
  fill(200, 200, 200);
  rect(enemyX+30, enemyY-30, 40, 5);
  fill(255, 0, 0);
  rect(enemyX+30, enemyY-30, enemyHealth/2.5, 5);
  fill(255);
  textSize(10);
  fill(0, 255, 0);
  noStroke();

  // position sword relative to circle
  swordX = circleX;
  swordY = circleY;

  if (enemyHealth <=60) {
    potionspawn();
    potionloop = false;
    gotpotionsoundplayed = false;
  }

  // draw player
  if (playerAlive) {
  fill(255, 255, 255);

    swordAngle = atan2(enemyY - swordY, enemyX - swordX);
    push();
    translate(swordX, swordY);
    rotate(swordAngle);
    fill(1, 0, 0);
    rectMode(CENTER);
    image(playerimg, 5, 10, 50, 50);

    pop();

    stroke("green");
    strokeWeight(2);
    text(`Player: ${playerHealth}`, 10, 50);
    noStroke();

    circleX = constrain(circleX, 30 / 2, width - 30 / 2);
    circleY = constrain(circleY, 30 / 2, height - 30 / 2);
  }

  // draw sword
  swordAngle = atan2(enemyY - swordY, enemyX - swordX);
  push();
  translate(swordX, swordY);
  rotate(swordAngle);
  fill(1, 0, 0);
  rectMode(CENTER);
  image(swordhandle, 5, 23, 20, 20);
  pop();

  // control sword
  if (mouseIsPressed && mouseButton === LEFT) {
    push();
    translate(swordX, swordY);
    rotate(swordAngle);
    fill(1, 0, 0);
    rectMode(CENTER);
    image(sword, 35, 23, 90, 60);
    pop();
    if (!soundPlayed) {
      swordsound.play();
      soundPlayed = true;
    }

    let distance = dist(circleX, circleY, enemyX, enemyY);

    //player damage nearby enemies
    if (distance < 80) {
      if (!stabbedsoundPlayed) {
        stabbedsound.play();
        stabbedsoundPlayed = true;
      }
      enemyHealth -= 0.5;
    }
  }

  //enemy damage to player
  let distance = dist(circleX, circleY, enemyX, enemyY);

  if (distance < 50) {
    playerHealth -= 1;
  }

  ////////////////////////////////////////////////////

  // Draw enemy
  if (enemyAlive) {
    fill(255, 255, 255);
    stroke("red");
    strokeWeight(2);
    text(`Enemy: ${enemyHealth}`, 10, 30);
    noStroke();
    fill(255, 0, 0);
    image(enemyimg, enemyX, enemyY, 70, 70);

    // Calculate distance between player and enemy
    let distance = dist(circleX, circleY, enemyX, enemyY);

    if (distance < detectionRange) {
      
      if (!showwarning && enemyHealth > 10) {
        fill(255, 0, 0);
        textSize(40);
        stroke("black");
        strokeWeight(3);
        text("RUN!!!",  width / 2 - 70, 50);
        noStroke();
        textSize(0);
        fill(255, 255, 0);
      }
      
        if (enemyHealth > 10) {
        // MOVE ENEMY TOWARDS PLAYER
enemyimg = enemyangry;
if(!exclaplayed){
      image(excla, enemyX, enemyY-50, 10, 30);
      setTimeout(function() {
       exclaplayed = true;
  }, 400);
      }
      if(!warningsoundplayed){
        warningsound.play();
        warningsoundplayed = true;
      } 
        enemyX += (circleX - enemyX) * +0.02;
        enemyY += (circleY - enemyY) * +0.02;
        } 
      
}  else {enemyimg = enemyimg2;
        warningsoundplayed = false;
        exclaplayed = false;}

    if (enemyHealth <= 10 && potionGot == false) {
      enemyX += (healthPotionX - enemyX) * +0.02;
      enemyY += (healthPotionY - enemyY) * +0.02;
    }

    let distanceP = dist(healthPotionX, healthPotionY, enemyX, enemyY);

    if (distanceP < 30 && potionGot == false && enemyHealth <=10) {
enemyHealth = 100;

     
      if (!gotpotionsoundplayed) {
        gotpotionsound.play();
        gotpotionsoundplayed = true;
      }
      if (!potionloop){
          healthPotionX = random(30,width-30);
          healthPotionY = random(30,height-30);
      }
      potionloop = true;
      potionGot = true;
    }
    
    

    if (distance > detectionRange) {
      //RANDOM MOVEMENT ENEMY MOVEMENT
      enemyX += direction.x;
      enemyY += direction.y;

      if (random(1) < 0.01) {
        direction.x = random(-1, 1);
        direction.y = random(-1, 1);
      }

      //enemy cannot pass through edges
      if (
        enemyX > width - 25 ||
        enemyX < 25 ||
        enemyY > height - 25 ||
        enemyY < 25
      ) {
        enemyX -= direction.x;
        enemyY -= direction.y;
        direction.x = -direction.x;
        direction.y = -direction.y;
      }
    }
  }

  
  
  
  
  // Check if you are alive
  if (playerHealth <= 0) {
    playerAlive = false;
    background(0, 0, 0);
    imageMode(CENTER);
    image(jmap, width / 2, height / 2, width, height);
    
    textSize(10);
    fill(255, 255, 255);
    stroke("green");
    strokeWeight(2);
    text("Player: 0", 10, 50);
    stroke("red");
    strokeWeight(2);
    text(`Enemy: ${enemyHealth}`, 10, 30);
    
  
    noStroke();
    textSize(50);
    fill(255, 255, 255);
    stroke("red");
    strokeWeight(2);
    text("You lost...", width / 2 - 90, height / 2 - 30);
    textSize(0);
    noStroke();
    defeatsound.play();
    noLoop();
    playButton = createButton("Play again?");
    playButton.style("background-color", "rgb(225,27,27)");
    playButton.style("color", "white");
    playButton.style("padding", "sizebutton px");
    playButton.style("border-radius", "10px");
    playButton.style("border", "4");
    playButton.style("font-size", "16px");
    playButton.style("cursor", "pointer");
    playButton.position(
      width / 2 - playButton.width / 2,
      height / 2 - playButton.height / 2
    );
    playButton.mousePressed(playAgain);
  }

  // Check if enemy is dead
  if (enemyHealth == 0) {
    enemyAlive = false;
  }

  if (enemyAlive == false && playerAlive == true) {
    background(0, 0, 0);
    imageMode(CENTER);
    image(jmap, width / 2, height / 2, width, height);

    fill(255, 255, 255);
    stroke("red");
    strokeWeight(2);
    text("Enemy: 0", 10, 30);
    stroke("green");
    strokeWeight(2);
    text(`Player: ${playerHealth}`, 10, 50);
    noStroke();
    textSize(50);
    fill(255, 255, 255);
    stroke("green");
    strokeWeight(2);
    text("You win!!!", width / 2 - 90, height / 2 - 30);
    textSize(0);
    noStroke();
    victorysound.play();
    noLoop();
    playButton = createButton("Play again?");
    playButton.style("background-color", "green");
    playButton.style("color", "white");
    playButton.style("padding", "sizebutton px");
    playButton.style("border-radius", "10px");
    playButton.style("border", "4");
    playButton.style("font-size", "16px");
    playButton.style("cursor", "pointer");
    playButton.position(
      width / 2 - playButton.width / 2,
      height / 2 - playButton.height / 2
    );
    playButton.mousePressed(playAgain);
  }
}

function playMenu() {
  noLoop();
  background(0, 0, 0);
  imageMode(CENTER);
  image(jmap, width / 2, height / 2, width, height);
  stroke(0,0,0);
  fill(154,205,60);
  textFont(myFont);
  textSize(55);
  text('"Eye Slayer"',width/2-130,height/2-50);
  strokeWeight(0);
 // fill(255,255,255);
 // textSize(12);
 // textFont('Georgia');
 // text('Created by:',width/2-20,height-40);
  //textSize(8);
  //text('LORS'width/2-20,height-50);
  noFill();
  noStroke();
  
  
  playButton = createButton("Play");
  playButton.style("background-color", "green");
  playButton.style("color", "white");
  playButton.style("padding", "10px 10px");
  playButton.style("border-radius", "10px");
  playButton.style("border", "4");
  playButton.style("font-size", "16px");
  playButton.style("cursor", "pointer");
  playButton.position(
    width / 2 - playButton.width / 2,
    height / 2 - playButton.height / 2
  );
  playButton.mousePressed(playOn);
}

function playAgain() {
  playerHealth = 100;
  playerAlive = true;
  enemyX = width-80;
  enemyY = 80;
  enemyHealth = 100;
  enemyAlive = true;
  potionGot = true;
  swordX = 50;
  swordY = 300;
  swordAngle = 0;
  detectionRange = 200;
  showwarning = false;
  playing = false;
  healthPotionX = random(30,width-30);
  healthPotionY = random(30,height-30);
  page = 0;
  gotpotionsoundplayed = false;
  playOn();
}

function mouseReleased() {
  soundPlayed = false;
  stabbedsoundPlayed = false;
}


function potionspawn(){
    fill(0, 255, 0);
    stroke("white");
    strokeWeight(2);
    image(potion, healthPotionX, healthPotionY, 50, 50);
    noStroke();
    potionGot = false;
}