//sounds
var doorOpen, doorClose, doorWave;
var drop;

var leaf_r = new Array();
var leaf_g = new Array();
var leaf_b = new Array();
var leaf_size = new Array();
var leaf_posX = new Array();
var leaf_posY = new Array();
var leaf_type = new Array();
var index_l = 0;
  //새싹 세는 변수
  var index_leaf = -1;

var leafSize = 70;

//문의 좌표
  var qx = new Array (372, 638, 638, 372);
  var qy = new Array (83.2, 83.2, 667.2, 667.2); 
  //문의 옆
  var qx_n = new Array (372, 372, 372, 372);
  var qy_n = new Array (83.2, 83.2, 667.2, 667.2); 
  //문장식 상 좌표
  var qx_h = new Array (402, 608, 608, 402);
  var qy_h = new Array (113.2, 113.2, 300, 300);
  //문장식 중 좌표
  var qx_m = new Array (402, 608, 608, 402);
  var qy_m = new Array (335, 335, 385, 385);
  //문장식 하 좌표
  var qx_b = new Array (402, 608, 608, 402);
  var qy_b = new Array (420, 420, 637.2, 637.2);
  var MaxDoor = 0;
  //문 손잡이의 좌표
  var cx = 400; var cy = 359.5;
  var r = 30.0;
  
  
  var door_Opened = false;
  var start = false;
  var Cloud_C = 255;
  var s = 0.7;
  var p = 0;
  
  //구름의 좌표
  var Cloud_X;
  var Cloud_Y;
  var Cloud_Xs;
  var Cloud_Ys;
  
  var Cloud_Xv = 0;
  var Cloud_Yv = 0;
  var CloudRange_X = 150;
  var CloudRange_Y = 170;
 
  

  
  //비의 좌표
  var index = 0;
  var drop_MAX = 50;
  var drop_X = new Array();
  var drop_Y = new Array();

 
  
  var rain_enable = false;
  var dropCount = 0;

  //비그려주는 인덱
  var index_d = 0;
  

  
  //파도의 좌표
  var wave_Y = 427;
  var v = 0;
  var back = false;


  //야간 모드
  var night = false;





function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  
    doorOpen = loadSound('data/doorOpen.wav');
  doorClose = loadSound('data/doorClose.wav');
  doorWave = loadSound('data/doorWave.wav');
    drop = loadSound('data/drop.wav');
  
}



function setup() {

  createCanvas(1024,768); 
  
  //sounds setting
  /*

  */
 //cloud setting
  Cloud_X = width/2-100-p*10;
  Cloud_Y = height/2-250-p*10;
  Cloud_Xs = width/2-115-p*10;
  Cloud_Ys = height/2-240-p*10;

}


function mouseClicked() {
  
  start = true;
  if(mouseX > cx-15 && mouseX < cx+15 && mouseY > cy-15 && mouseY < cy+15) {
   if(door_Opened == false) {
     door_Opened = true;
     doorOpen.play();
     doorClose.stop();
     doorWave.play();
     doorWave.setVolume(0.1);
     doorWave.setLoop(true);
   } 
   else  {
     door_Opened = false;
    doorWave.stop();
     doorClose.play();
     doorOpen.stop();

   }  
} 
  
  if(mouseX > CloudRange_X && mouseX < CloudRange_X + 250 
   && mouseY > CloudRange_Y && mouseY < CloudRange_Y  +70) {
    //구름 눌리면 비내린당..
    if(Cloud_Xv == -300) {
       rain_enable = true;   
      for(var i = 0; i < 3; i++ ){
         drop_X[index] = random(130,420);
          drop_Y[index] = 250;
          // dropCount++;
           if(index == drop_MAX -1) {
             index = 0; 
          }
         else {
           index++;
          }
          

      }
    }
   }
}

///////////////////draw////////////////////////////

function draw() {
  //fill(random(0,255),random(0,255),random(0,255));
  //fill(leaf_r[1], leaf_g[1], leaf_b[1]);
  //rect(0,0,width, height);
    //벽지
  fill(237,228,215);
  rect(0, 0, 1024, 626.4);
  
  drawSea();
  drawBackgroundL();
  drawRain();
  drawCloud();
  drawBackgroundR();
  drawDoor();
  drawLeafs();
  
  updateDoor();
  
  fill(40);
  text("René Magritte / Summer / 1939", width-220, 30);
  text("X"+mouseX, 20,20);
  text("Y"+mouseY, 80,20);
  
  dropUpdate();
  
  leaf_r[0] = random(50,100);
   text(index_leaf, 20,50);
  text(index_l, 20,70);
  text(dropCount, 20,90);
  
 }



///////////////////draw////////////////////////////





function dropUpdate() {
    if(dropCount%2 == 1) {
    if(index_leaf < leafSize -1) {
      index_leaf++;
      leaf_r[index_leaf] = random(50,100);
      leaf_g[index_leaf] = random(100,200);
      leaf_b[index_leaf] = random(50,100);
      leaf_posX[index_leaf] = random(180,1040);
      leaf_posY[index_leaf] = random(1630,1800);
      leaf_type[index_leaf] =  random(-5,5);
      leaf_size[index_leaf] = 0.4;
      dropCount++;
    }
  }
}

function drawLeafs() {
     for(var i = 0; i < index_leaf -1; i++) {
         index_l = i;
         drawLeaf();
    }
}

  
  
function drawLeaf() {
  
if(leaf_type[index_l] > 0){
push();
fill(leaf_r[index_l], leaf_g[index_l], leaf_b[index_l]);
scale(leaf_size[index_l]);
translate(leaf_posX[index_l], leaf_posY[index_l]);
noStroke();
beginShape();
vertex(56.5, 80.2);
bezierVertex(55.6, 79.5, 55.8, 78.7, 55.8, 77.9);
bezierVertex(55.8, 73.9, 55.9, 69.8, 55.8, 65.8);
bezierVertex(55.6, 57, 54.5, 48.2, 52.2, 39.7);
bezierVertex(51, 35.5, 48.5, 34, 44.2, 34.5);
bezierVertex(40.5, 35, 37.1, 36.3, 33.6, 37.2);
bezierVertex(26.2, 39, 18.7, 40.1, 11.2, 39);
bezierVertex(5.2, 38.2, -0.6, 31.9, 0, 26.7);
bezierVertex(0.7, 20.7, 4.1, 17, 10.6, 15.4);
bezierVertex(17.4, 13.7, 24.2, 14.3, 30.9, 16.7);
bezierVertex(32.2, 17.2, 33.5, 17.7, 34.6, 18.6);
bezierVertex(39.8, 22.4, 44.3, 27, 47.8, 32.4);
bezierVertex(48, 32.7, 48.2, 33, 48.4, 33.3);
bezierVertex(50.9, 36.3, 51.5, 36.1, 53.4, 32.8);
bezierVertex(55.9, 28.4, 56.6, 23.6, 57.9, 18.9);
bezierVertex(61.2, 6.9, 70.8, -0.3, 82.9, 0);
bezierVertex(86.8, 0.1, 90.7, 0.5, 94.3, 2.2);
bezierVertex(99.3, 4.7, 100.7, 9.5, 99.8, 14.2);
bezierVertex(99.2, 17, 96.7, 18.6, 94.5, 20.2);
bezierVertex(90, 23.6, 84.7, 25.1, 79.3, 26.4);
bezierVertex(72.3, 28.1, 65.1, 28.3, 58.2, 30.1);
bezierVertex(56.3, 30.6, 55, 31.5, 54, 33.3);
bezierVertex(52.7, 35.7, 52.8, 37.9, 53.5, 40.3);
bezierVertex(55.2, 45.8, 55.9, 51.6, 56.5, 57.3);
bezierVertex(57.1, 63, 57.1, 68.8, 57, 74.6);
bezierVertex(56.9, 76.5, 56.7, 78.3, 56.5, 80.2);
endShape(); 
pop();
}
  
  
else {
push();

fill(leaf_r[index_l], leaf_g[index_l], leaf_b[index_l]);
scale(leaf_size[index_l]);
translate(leaf_posX[index_l],leaf_posY[index_l]);
noStroke();
beginShape();
vertex(43.5, 80.2);
bezierVertex(44.4, 79.5, 44.2, 78.7, 44.2, 77.9);
bezierVertex(44.2, 73.9, 44.1, 69.8, 44.2, 65.8);
bezierVertex(44.4, 57, 45.5, 48.2, 47.8, 39.7);
bezierVertex(49, 35.5, 51.5, 34, 55.8, 34.5);
bezierVertex(59.5, 35, 62.9, 36.3, 66.4, 37.2);
bezierVertex(73.8, 39, 81.3, 40.1, 88.8, 39);
bezierVertex(94.8, 38.2, 100.5, 31.8, 99.9, 26.6);
bezierVertex(99.2, 20.6, 95.8, 16.9, 89.3, 15.3);
bezierVertex(82.5, 13.6, 75.7, 14.2, 69, 16.6);
bezierVertex(67.7, 17.1, 66.4, 17.6, 65.3, 18.5);
bezierVertex(60.1, 22.3, 55.6, 26.9, 52.1, 32.3);
bezierVertex(51.9, 32.6, 51.7, 32.9, 51.5, 33.2);
bezierVertex(49, 36.2, 48.4, 36, 46.5, 32.7);
bezierVertex(44, 28.3, 43.3, 23.5, 42, 18.8);
bezierVertex(38.8, 6.9, 29.2, -0.3, 17.1, 0);
bezierVertex(13.2, 0.1, 9.3, 0.5, 5.8, 2.3);
bezierVertex(0.8, 4.8, -0.6, 9.6, 0.3, 14.3);
bezierVertex(0.9, 17.1, 3.4, 18.7, 5.6, 20.3);
bezierVertex(10.1, 23.7, 15.4, 25.2, 20.8, 26.5);
bezierVertex(27.8, 28.2, 35, 28.4, 41.9, 30.2);
bezierVertex(43.8, 30.7, 45.1, 31.6, 46.1, 33.4);
bezierVertex(47.4, 35.8, 47.3, 38, 46.6, 40.4);
bezierVertex(44.9, 45.9, 44.2, 51.7, 43.6, 57.4);
bezierVertex(43, 63.1, 43, 68.9, 43.1, 74.7);
bezierVertex(43.1, 76.5, 43.3, 78.3, 43.5, 80.2);
endShape();
pop();
}
}



function drawRain() {
    if(rain_enable== true) {
        for(var i = 0; i <= drop_MAX-1; i++) {
        if(drop_Y[i] != 0) {
           if(drop_Y[i] < 700) {
             index_d = i;
             drawDrop();             
           }
           else
             {
              drop.play();
               drop_Y[i] = 0;
                if(dropCount == 47) dropCount = 0;
                  dropCount++;

             }
        }
      }
  }
}

function drawDrop() {
  var x = drop_X[index_d];
  var y = drop_Y[index_d];
  
  push();
  
  translate(x, y);
  scale(0.3);
  
  fill(127, 195, 255);
  noStroke();
  beginShape();
  vertex(44.6, 8.5);
  bezierVertex(44.6, 8.5, 27, 38.3, 24.8, 56.9);
  bezierVertex(23.4, 68.9, 56.2, 108.1, 70.9, 60.2);
  bezierVertex(76.2, 42.9, 47.9, 10.1, 44.6, 8.5);
  endShape();
  
  pop(); 
  
  switch(index_d %4) {
   case 0 : drop_Y[index_d] *= 1.016;
   break;
   case 1 : drop_Y[index_d] *= 1.013;
   break;
   case 2 : drop_Y[index_d] *= 1.018;
   break;
   case 3 : drop_Y[index_d] *= 1.01;
   break;
  }
  
}










function updateDoor() {
  if(door_Opened == true) {


     if(MaxDoor < 36) {
       if(MaxDoor == 0) {
       qx_n[1] = 384;
       qx_n[2] = 384;
     }
       qx[0] += 3.0; qx_h[0] += 3.0; qx_m[0] += 3.0;  qx_b[0] += 3.0; 
       qy[0] -= 1.7; qy_h[0] -= 1.0; qy_m[0] -= 0.1;  qy_b[0] += 0.1;
       qx[3] += 3.0; qx_h[3] += 3.0; qx_m[3] += 3.0;  qx_b[3] += 3.0;
       qy[3] += 1.7; qy_h[3] -= 0.2; qy_m[3] += 0.1;  qy_b[3] += 1.0;
       
       //3D문 구현..
       if(MaxDoor > 3) {
       qx_n[0] += 3.0; qy_n[0] -= 1.56;
       qx_n[1] += 3.0; qy_n[1] -= 1.875;
       qx_n[2] += 3.0; qy_n[2] += 1.875;
       qx_n[3] += 3.0; qy_n[3] += 1.56;
       }

       
       cx += 3.0;
       r -= 0.1;
       MaxDoor ++;
       
     }
     
      if(Cloud_Xv > -300)
         Cloud_Xv -= 3;
   }
   else {
     
     if(start == true) {

       if(MaxDoor > 0) {
         qx[0] -= 6.0;  qx_h[0] -= 6.0; qx_m[0] -= 6.0;  qx_b[0] -= 6.0;
         qy[0] += 3.4;  qy_h[0] += 2.0; qy_m[0] += 0.2;  qy_b[0] -= 0.2;
         qx[3] -= 6.0;  qx_h[3] -= 6.0; qx_m[3] -= 6.0;  qx_b[3] -= 6.0;
         qy[3] -= 3.4;  qy_h[3] += 0.4; qy_m[3] -= 0.2;  qy_b[3] -= 2.0;
         
         //3D문 구현..
         if(MaxDoor > 5) {
         qx_n[0] -= 6.0; qy_n[0] += 3.12;
         qx_n[1] -= 6.0; qy_n[1] += 3.75;
         qx_n[2] -= 6.0; qy_n[2] -= 3.75;
         qx_n[3] -= 6.0; qy_n[3] -= 3.12;
         
         }

         cx -= 6.0;
         r += 0.2;
     
         MaxDoor -= 2;
          
          
        if(MaxDoor == 0) {
         qx_n[1]  = 372;
         qx_n[2]  = 372;
         }
       }
       if(Cloud_Xv < 0)
         Cloud_Xv += 15;
     }
   }
    
}


function drawDoor() {
 //문 index 1,2 = fixed!
  fill(203,129,111);
  stroke(155,85,65);
  strokeWeight(0.3);
  quad(qx[0], qy[0], qx[1], qy[1], qx[2], qy[2], qx[3], qy[3]);


  fill(203,129,111);
  //if(door_Opened == true) {
      stroke(155,85,65);
      strokeWeight(0.1);
  
  quad(qx_n[0], qy_n[0], qx_n[1], qy_n[1], qx_n[2], qy_n[2], qx_n[3], qy_n[3]);
  //}
  noStroke();
  
  //문장식 
  noFill();
  stroke(175,105,85);
  strokeWeight(5);
  strokeCap(ROUND);
  quad(qx_h[0], qy_h[0], qx_h[1], qy_h[1], qx_h[2], qy_h[2], qx_h[3], qy_h[3]);
  quad(qx_b[0], qy_b[0], qx_b[1], qy_b[1], qx_b[2], qy_b[2], qx_b[3], qy_b[3]);
  quad(qx_m[0], qy_m[0], qx_m[1], qy_m[1], qx_m[2], qy_m[2], qx_m[3], qy_m[3]);
  noStroke();

  //reat(373.5, 83.2, 264.5, 584);
  //문손잡이
  fill(146,62,76);
  ellipse(cx, cy, 30, r);  //reat(373.5, 83.2, 264.5, 584);
  //문손잡이
  fill(146,62,76);
  ellipse(cx, cy, 30, r); 
}



function drawBackgroundR() {
   noStroke();

//벽지
fill(237,228,215);
rect(638, 0, 386, 626.4);



//문옆 나무
fill(205,164,141);
rect(669, 617, 362, 50); //오른쪽

  //문틀
fill(236,158,149);
rect(638, 52.1, 31.1, 614.9); //오른쪽
}


function drawCloud() {
  push();
  translate(Cloud_Xs, Cloud_Ys);
  translate(Cloud_Xv, Cloud_Yv);
  scale(s);
  fill(150,150,150);
  noStroke();
  beginShape();
  vertex(192.3, 38.9);
  bezierVertex(192.3, 38.9, 86.9, 4.6, 59, 93.9);
  bezierVertex(59, 93.9, 20.5, 86.3, 0, 146.6);
  bezierVertex(-20.5, 146.6, -1.3, 191.5, 78.2, 179.9);
  bezierVertex(78.2, 179.9, 77.8, 222.7, 127, 211);
  bezierVertex(127, 211, 203.6, 259.8, 251.3, 199.2);
  bezierVertex(251.3, 199.2, 329.9, 241.6, 360.3, 183.8);
  bezierVertex(360.3, 183.8, 430.8, 219.7, 444.9, 149.2);
  bezierVertex(444.9, 149.2, 505.2, 149.2, 507.7, 109.5);
  bezierVertex(507.7, 109.5, 514.1, 55.7, 438.5, 49.2);
  bezierVertex(438.5, 49.2, 429.5, 1.8, 378.2, 9.5);
  bezierVertex(378.2, 9.5, 326.2, -21.4, 270.3, 29);
  bezierVertex(270.3, 28.9, 212.6, -14.2, 192.3, 38.9);
  endShape();
  pop();
  
  push();
  translate(Cloud_X,Cloud_Y);
  translate(Cloud_Xv, Cloud_Yv);
  scale(s);
  fill(Cloud_C);
  noStroke();
  beginShape();
  vertex(192.3, 38.9);
  bezierVertex(192.3, 38.9, 86.9, 4.6, 59, 93.9);
  bezierVertex(59, 93.9, 20.5, 86.3, 0, 146.6);
  bezierVertex(-20.5, 146.6, -1.3, 191.5, 78.2, 179.9);
  bezierVertex(78.2, 179.9, 77.8, 222.7, 127, 211);
  bezierVertex(127, 211, 203.6, 259.8, 251.3, 199.2);
  bezierVertex(251.3, 199.2, 329.9, 241.6, 360.3, 183.8);
  bezierVertex(360.3, 183.8, 430.8, 219.7, 444.9, 149.2);
  bezierVertex(444.9, 149.2, 505.2, 149.2, 507.7, 109.5);
  bezierVertex(507.7, 109.5, 514.1, 55.7, 438.5, 49.2);
  bezierVertex(438.5, 49.2, 429.5, 1.8, 378.2, 9.5);
  bezierVertex(378.2, 9.5, 326.2, -21.4, 270.3, 29);
  bezierVertex(270.3, 28.9, 212.6, -14.2, 192.3, 38.9);
  endShape();
  
  pop();
  
  
    //구름 움직이는 효과
  s += 0.0005;
  p += 0.006;
  if( s > 0.72) {
    s = 0.7 ;
    p = 0;
  }
}

function drawBackgroundL() {
  noStroke();

//문옆 나무
fill(205,164,141);

rect(0, 617, 342.2, 50);
rect(669, 617, 362, 50);

//바닥
//fill(128,158,182);
fill(79,58,37);
rect(0, 667, 1024, 768);

  //문틀
fill(236,158,149);
rect(342.4, 52.1, 31.1, 614.9); //왼쪽
rect(638, 52.1, 31.1, 614.9); //오른쪽
rect(342.4, 52.1, 295.6, 31.1); //맨위
}

function drawSea() {
   //하늘
   noStroke();
  fill(181,218,234);
  rect(373.5, 80, 130 ,255);
  //바다
  fill(67,154,200);
  rect(373.5, 332, 130 ,141);
  
  //모래사장
  fill(235,220,192);
  rect(373.5, 473, 130 ,194);  
  
//



//wave shadow
push();

fill(218,191,167);
translate(350, 432);

noStroke();
beginShape();
scale(1.5,1.8);
vertex(129.9, 33.4);
bezierVertex(130, 29, 130.4, 24.7, 130.1, 20.4);
bezierVertex(130.1, 20.3, 130, 20.3, 130, 20.3);
bezierVertex(129.2, 20.4, 127.8, 20.6, 127, 20.8);
bezierVertex(126.9, 21.2, 126.3, 21.3, 125.7, 21.3);
bezierVertex(125.4, 21.4, 125.1, 21.5, 124.8, 21.5);
bezierVertex(123.8, 22, 123.2, 21.5, 122.6, 21.2);
bezierVertex(121.4, 20.7, 120.3, 20.6, 119.1, 21.1);
bezierVertex(117.3, 21.7, 115.2, 21.9, 113.1, 22);
bezierVertex(110.9, 22.1, 109, 21.8, 107.8, 20.6);
bezierVertex(107, 19.9, 105.9, 19.2, 105.3, 18.4);
bezierVertex(102.5, 17, 99.2, 17.4, 96, 17.5);
bezierVertex(93.8, 17.6, 91.7, 18, 89.7, 18.5);
bezierVertex(88.3, 18.8, 87.1, 18.8, 85.8, 18.6);
bezierVertex(81.4, 18, 77.2, 18.4, 73, 19.3);
bezierVertex(72.3, 20.1, 70.8, 20, 69.5, 20.2);
bezierVertex(68.3, 20.2, 67.2, 20.2, 66, 20.2);
bezierVertex(64.3, 20.2, 62.9, 19.9, 61.4, 19.4);
bezierVertex(59.7, 18.8, 57.7, 18.4, 55.7, 17.8);
bezierVertex(54.2, 19.1, 52.9, 18.5, 51.6, 17.6);
bezierVertex(50.9, 17.1, 49.9, 16.8, 48.9, 16.4);
bezierVertex(47.3, 15.9, 46.1, 16.6, 44.8, 17);
bezierVertex(44.7, 17, 44.5, 17, 44.4, 17);
bezierVertex(42.4, 18.3, 41.7, 18.4, 39, 17.7);
bezierVertex(37.7, 17.4, 36.3, 17.1, 35, 16.8);
bezierVertex(34.4, 16.7, 33.7, 16.7, 33.6, 16.2);
bezierVertex(32.1, 16.3, 30.6, 16.1, 29, 16.5);
bezierVertex(27.7, 16.8, 26.5, 15.9, 25.5, 15.4);
bezierVertex(24.6, 14.9, 23.7, 14.5, 22.7, 14.1);
bezierVertex(19.9, 12.7, 17, 13.9, 14.1, 13.9);
bezierVertex(13.1, 14.3, 11.9, 14.5, 10.7, 14.6);
bezierVertex(10.4, 14.8, 10.2, 15.2, 9.8, 15.2);
bezierVertex(6.8, 15.9, 3.7, 16, 0.5, 16.4);
bezierVertex(-2.7, 22, 0.1, 29.5, 0, 35.4);
bezierVertex(-0.1, 35.7, 0, 35.9, 0, 36.2);
bezierVertex(1.6, 36.3, 3.1, 36.3, 4.7, 36.2);
bezierVertex(11.4, 35.8, 17, 34.4, 20.8, 31.1);
bezierVertex(23.3, 28.9, 26.7, 27.5, 31.8, 27.7);
bezierVertex(35.7, 27.9, 39.5, 27.7, 43.4, 27.3);
bezierVertex(47, 27, 50.4, 27.1, 53.7, 28.4);
bezierVertex(55.8, 29.2, 58.2, 29.9, 61, 29.9);
bezierVertex(64.4, 29.9, 66.3, 31.3, 68.1, 32.7);
bezierVertex(70.5, 34.5, 73.2, 36.2, 77.5, 36.5);
bezierVertex(83.3, 36.9, 88.9, 36.7, 93.2, 34);
bezierVertex(94.8, 33, 97.4, 33.1, 99.1, 34.1);
bezierVertex(100.7, 35, 102.3, 34.9, 103.9, 34.3);
bezierVertex(106.3, 33.4, 107.7, 33.5, 109.7, 34.6);
bezierVertex(114.3, 37.3, 120.8, 37.5, 126.5, 35.5);
bezierVertex(127.6, 35.1, 128.7, 34.6, 129.8, 34.2);
bezierVertex(129.8, 34, 129.9, 33.7, 129.9, 33.4);
endShape();

pop();


push();

fill(255);
translate(350, wave_Y);
scale(1.5,1.5);
noStroke();
beginShape();
vertex(129.9, 33.4);
bezierVertex(130, 29, 130.4, 24.7, 130.1, 20.4);
bezierVertex(130.1, 20.3, 130, 20.3, 130, 20.3);
bezierVertex(129.2, 20.4, 127.8, 20.6, 127, 20.8);
bezierVertex(126.9, 21.2, 126.3, 21.3, 125.7, 21.3);
bezierVertex(125.4, 21.4, 125.1, 21.5, 124.8, 21.5);
bezierVertex(123.8, 22, 123.2, 21.5, 122.6, 21.2);
bezierVertex(121.4, 20.7, 120.3, 20.6, 119.1, 21.1);
bezierVertex(117.3, 21.7, 115.2, 21.9, 113.1, 22);
bezierVertex(110.9, 22.1, 109, 21.8, 107.8, 20.6);
bezierVertex(107, 19.9, 105.9, 19.2, 105.3, 18.4);
bezierVertex(102.5, 17, 99.2, 17.4, 96, 17.5);
bezierVertex(93.8, 17.6, 91.7, 18, 89.7, 18.5);
bezierVertex(88.3, 18.8, 87.1, 18.8, 85.8, 18.6);
bezierVertex(81.4, 18, 77.2, 18.4, 73, 19.3);
bezierVertex(72.3, 20.1, 70.8, 20, 69.5, 20.2);
bezierVertex(68.3, 20.2, 67.2, 20.2, 66, 20.2);
bezierVertex(64.3, 20.2, 62.9, 19.9, 61.4, 19.4);
bezierVertex(59.7, 18.8, 57.7, 18.4, 55.7, 17.8);
bezierVertex(54.2, 19.1, 52.9, 18.5, 51.6, 17.6);
bezierVertex(50.9, 17.1, 49.9, 16.8, 48.9, 16.4);
bezierVertex(47.3, 15.9, 46.1, 16.6, 44.8, 17);
bezierVertex(44.7, 17, 44.5, 17, 44.4, 17);
bezierVertex(42.4, 18.3, 41.7, 18.4, 39, 17.7);
bezierVertex(37.7, 17.4, 36.3, 17.1, 35, 16.8);
bezierVertex(34.4, 16.7, 33.7, 16.7, 33.6, 16.2);
bezierVertex(32.1, 16.3, 30.6, 16.1, 29, 16.5);
bezierVertex(27.7, 16.8, 26.5, 15.9, 25.5, 15.4);
bezierVertex(24.6, 14.9, 23.7, 14.5, 22.7, 14.1);
bezierVertex(19.9, 12.7, 17, 13.9, 14.1, 13.9);
bezierVertex(13.1, 14.3, 11.9, 14.5, 10.7, 14.6);
bezierVertex(10.4, 14.8, 10.2, 15.2, 9.8, 15.2);
bezierVertex(6.8, 15.9, 3.7, 16, 0.5, 16.4);
bezierVertex(-2.7, 22, 0.1, 29.5, 0, 35.4);
bezierVertex(-0.1, 35.7, 0, 35.9, 0, 36.2);
bezierVertex(1.6, 36.3, 3.1, 36.3, 4.7, 36.2);
bezierVertex(11.4, 35.8, 17, 34.4, 20.8, 31.1);
bezierVertex(23.3, 28.9, 26.7, 27.5, 31.8, 27.7);
bezierVertex(35.7, 27.9, 39.5, 27.7, 43.4, 27.3);
bezierVertex(47, 27, 50.4, 27.1, 53.7, 28.4);
bezierVertex(55.8, 29.2, 58.2, 29.9, 61, 29.9);
bezierVertex(64.4, 29.9, 66.3, 31.3, 68.1, 32.7);
bezierVertex(70.5, 34.5, 73.2, 36.2, 77.5, 36.5);
bezierVertex(83.3, 36.9, 88.9, 36.7, 93.2, 34);
bezierVertex(94.8, 33, 97.4, 33.1, 99.1, 34.1);
bezierVertex(100.7, 35, 102.3, 34.9, 103.9, 34.3);
bezierVertex(106.3, 33.4, 107.7, 33.5, 109.7, 34.6);
bezierVertex(114.3, 37.3, 120.8, 37.5, 126.5, 35.5);
bezierVertex(127.6, 35.1, 128.7, 34.6, 129.8, 34.2);
bezierVertex(129.8, 34, 129.9, 33.7, 129.9, 33.4);
endShape();

pop();


//불가사리1

push();
translate(400,500);

 fill(247, 197, 116);
 scale(0.6);
 rotate(0.2);
noStroke();
beginShape();
vertex(18.2, 32);
bezierVertex(18.3, 31.1, 18, 30.8, 17, 30.5);
bezierVertex(15, 30, 13, 29.6, 11, 29);
bezierVertex(9.9, 28.7, 8.8, 28.5, 7.6, 28.3);
bezierVertex(5.6, 27.8, 3.5, 27.3, 1.6, 26.5);
bezierVertex(0.9, 26.2, 0.8, 25.7, 1.4, 25.2);
bezierVertex(1.8, 24.7, 2.5, 24.5, 3.1, 24.3);
bezierVertex(5.3, 23.6, 7.4, 22.9, 9.7, 22.3);
bezierVertex(11.6, 21.8, 13.6, 21.6, 15.5, 20.8);
bezierVertex(15.6, 20.7, 15.8, 20.7, 15.9, 20.7);
bezierVertex(18.2, 20.4, 18.3, 20, 19, 17.7);
bezierVertex(19.4, 16.3, 19.2, 14.8, 20, 13.5);
bezierVertex(20.1, 13.4, 20.1, 13.2, 20.1, 13.1);
bezierVertex(20.1, 10.9, 20.8, 8.9, 21.2, 6.8);
bezierVertex(21.4, 5.7, 21.6, 4.6, 21.9, 3.5);
bezierVertex(22, 3, 22.3, 2.6, 22.7, 2.5);
bezierVertex(23.2, 2.4, 23.4, 2.9, 23.6, 3.3);
bezierVertex(25.4, 6.2, 26.8, 9.4, 28.4, 12.4);
bezierVertex(29.1, 13.7, 29.6, 15, 30.3, 16.2);
bezierVertex(30.9, 17.2, 31.6, 17.9, 33, 17.8);
bezierVertex(35.2, 17.6, 37.5, 17.6, 39.7, 17.3);
bezierVertex(42, 17, 44.4, 17.2, 46.8, 17.2);
bezierVertex(47.5, 17.2, 48.1, 17.7, 48.7, 17.9);
bezierVertex(49.3, 18.1, 49.1, 18.7, 48.7, 19.1);
bezierVertex(48, 19.8, 47.3, 20.7, 46.4, 21.2);
bezierVertex(44, 22.6, 41.9, 24.3, 39.6, 25.8);
bezierVertex(39.5, 25.9, 39.4, 26, 39.2, 26.1);
bezierVertex(36.9, 27.9, 37, 28.4, 38.5, 30.9);
bezierVertex(40.3, 33.8, 42.1, 36.7, 43.6, 39.8);
bezierVertex(43.9, 40.5, 44.2, 41.1, 44.4, 41.8);
bezierVertex(44.6, 42.4, 44.4, 42.7, 43.7, 42.7);
bezierVertex(42.7, 42.7, 41.9, 42.1, 41, 41.7);
bezierVertex(36.9, 39.9, 33.1, 37.7, 29.2, 35.7);
bezierVertex(28.1, 35.2, 27.7, 35.3, 26.8, 36.2);
bezierVertex(24.4, 38.5, 22.4, 41.1, 20.3, 43.7);
bezierVertex(19.2, 45.1, 17.9, 46.3, 16.6, 47.5);
bezierVertex(16.4, 47.7, 16.2, 48.2, 15.8, 47.9);
bezierVertex(15.5, 47.7, 15.1, 47.3, 15.3, 46.9);
bezierVertex(15.8, 45.5, 15.7, 44.1, 16, 42.7);
bezierVertex(16.4, 41.2, 16.5, 39.6, 17, 38.1);
bezierVertex(17.5, 36.7, 17.4, 35.2, 17.9, 33.8);
bezierVertex(18.1, 33, 18.2, 32.6, 18.2, 32);
endShape();
 pop();

  
  
 //불가사리 2
   push();
translate(445,600);
scale(0.9);

fill(247, 116, 135); 
noStroke();
beginShape();
vertex(18.2, 32);
bezierVertex(18.3, 31.1, 18, 30.8, 17, 30.5);
bezierVertex(15, 30, 13, 29.6, 11, 29);
bezierVertex(9.9, 28.7, 8.8, 28.5, 7.6, 28.3);
bezierVertex(5.6, 27.8, 3.5, 27.3, 1.6, 26.5);
bezierVertex(0.9, 26.2, 0.8, 25.7, 1.4, 25.2);
bezierVertex(1.8, 24.7, 2.5, 24.5, 3.1, 24.3);
bezierVertex(5.3, 23.6, 7.4, 22.9, 9.7, 22.3);
bezierVertex(11.6, 21.8, 13.6, 21.6, 15.5, 20.8);
bezierVertex(15.6, 20.7, 15.8, 20.7, 15.9, 20.7);
bezierVertex(18.2, 20.4, 18.3, 20, 19, 17.7);
bezierVertex(19.4, 16.3, 19.2, 14.8, 20, 13.5);
bezierVertex(20.1, 13.4, 20.1, 13.2, 20.1, 13.1);
bezierVertex(20.1, 10.9, 20.8, 8.9, 21.2, 6.8);
bezierVertex(21.4, 5.7, 21.6, 4.6, 21.9, 3.5);
bezierVertex(22, 3, 22.3, 2.6, 22.7, 2.5);
bezierVertex(23.2, 2.4, 23.4, 2.9, 23.6, 3.3);
bezierVertex(25.4, 6.2, 26.8, 9.4, 28.4, 12.4);
bezierVertex(29.1, 13.7, 29.6, 15, 30.3, 16.2);
bezierVertex(30.9, 17.2, 31.6, 17.9, 33, 17.8);
bezierVertex(35.2, 17.6, 37.5, 17.6, 39.7, 17.3);
bezierVertex(42, 17, 44.4, 17.2, 46.8, 17.2);
bezierVertex(47.5, 17.2, 48.1, 17.7, 48.7, 17.9);
bezierVertex(49.3, 18.1, 49.1, 18.7, 48.7, 19.1);
bezierVertex(48, 19.8, 47.3, 20.7, 46.4, 21.2);
bezierVertex(44, 22.6, 41.9, 24.3, 39.6, 25.8);
bezierVertex(39.5, 25.9, 39.4, 26, 39.2, 26.1);
bezierVertex(36.9, 27.9, 37, 28.4, 38.5, 30.9);
bezierVertex(40.3, 33.8, 42.1, 36.7, 43.6, 39.8);
bezierVertex(43.9, 40.5, 44.2, 41.1, 44.4, 41.8);
bezierVertex(44.6, 42.4, 44.4, 42.7, 43.7, 42.7);
bezierVertex(42.7, 42.7, 41.9, 42.1, 41, 41.7);
bezierVertex(36.9, 39.9, 33.1, 37.7, 29.2, 35.7);
bezierVertex(28.1, 35.2, 27.7, 35.3, 26.8, 36.2);
bezierVertex(24.4, 38.5, 22.4, 41.1, 20.3, 43.7);
bezierVertex(19.2, 45.1, 17.9, 46.3, 16.6, 47.5);
bezierVertex(16.4, 47.7, 16.2, 48.2, 15.8, 47.9);
bezierVertex(15.5, 47.7, 15.1, 47.3, 15.3, 46.9);
bezierVertex(15.8, 45.5, 15.7, 44.1, 16, 42.7);
bezierVertex(16.4, 41.2, 16.5, 39.6, 17, 38.1);
bezierVertex(17.5, 36.7, 17.4, 35.2, 17.9, 33.8);
bezierVertex(18.1, 33, 18.2, 32.6, 18.2, 32);
endShape();
 pop();
 
 
 //조개
 push();
 translate(400,570);
 rotate(0.1);
 scale(0.7);
 fill(201,151,239);
noStroke();
beginShape();
vertex(19, 4.2);
bezierVertex(31.8, 4, 43.9, 12.6, 47.5, 23.8);
bezierVertex(49.1, 28.6, 48.2, 33.4, 43.1, 36.1);
bezierVertex(38.7, 38.5, 34.4, 41.1, 29.5, 42.3);
bezierVertex(22.9, 43.9, 16.3, 44.1, 10.8, 39.4);
bezierVertex(6.8, 35.9, 4.2, 31.2, 2.3, 26.2);
bezierVertex(1, 23, -0.1, 19.6, 0, 16.1);
bezierVertex(0.2, 11.2, 3.1, 8, 7.6, 6.3);
bezierVertex(11.3, 4.8, 15.2, 3.8, 19, 4.2);
endShape();


fill(108,108,88);
beginShape();
vertex(10.9, 14.5);
bezierVertex(17.4, 14.2, 23.2, 15.8, 28.8, 18.5);
bezierVertex(34.3, 21.1, 39.2, 24.6, 43.7, 28.7);
bezierVertex(44.2, 29.1, 44.7, 30.2, 45.5, 29.4);
bezierVertex(46.5, 28.5, 45.3, 27.9, 44.7, 27.5);
bezierVertex(43, 26, 41.3, 24.6, 39.5, 23.2);
bezierVertex(28.5, 14.7, 16.3, 10.9, 2.4, 13.5);
bezierVertex(1.8, 13.6, 1.1, 13.6, 1.1, 14.4);
bezierVertex(1.1, 15.2, 1.9, 15, 2.5, 15);
bezierVertex(5.4, 14.9, 8.2, 14.3, 10.9, 14.5);
endShape();



beginShape();
vertex(10, 18);
bezierVertex(8.9, 18.1, 7.5, 18.2, 6.1, 18.4);
bezierVertex(5.4, 18.5, 4.2, 18.3, 4.4, 19.3);
bezierVertex(4.5, 20.5, 5.7, 20, 6.5, 19.9);
bezierVertex(11, 19, 15.4, 19.9, 19.7, 21);
bezierVertex(26.9, 22.8, 33.4, 26.1, 39.4, 30.5);
bezierVertex(40, 30.9, 40.7, 31.8, 41.3, 31.1);
bezierVertex(42, 30.3, 41.1, 29.8, 40.5, 29.4);
bezierVertex(31.5, 22.7, 21.6, 18.6, 10, 18);
endShape();

beginShape();
vertex(10.1, 25.1);
bezierVertex(8.9, 25.1, 7.8, 25, 6.6, 25.1);
bezierVertex(5.9, 25.2, 4.8, 25.1, 4.9, 26.1);
bezierVertex(5, 27.3, 6.2, 26.9, 6.9, 26.8);
bezierVertex(10.5, 26.2, 14, 26.6, 17.5, 27.3);
bezierVertex(24.3, 28.7, 29.8, 32.2, 35.1, 36.5);
bezierVertex(35.6, 36.9, 36.1, 37.6, 36.7, 36.8);
bezierVertex(37.2, 36.2, 36.6, 35.8, 36.2, 35.4);
bezierVertex(28.6, 29.1, 20.2, 24.9, 10.1, 25.1);
endShape();

beginShape();
vertex(34.4, 39.5);
bezierVertex(34.3, 38.7, 33.6, 38.5, 33, 38.2);
bezierVertex(29.8, 36.2, 26.4, 34.5, 22.9, 32.9);
bezierVertex(18.4, 30.8, 13.5, 29.8, 8.6, 29.1);
bezierVertex(8, 29, 7.3, 28.9, 7.2, 29.7);
bezierVertex(7.1, 30.3, 7.7, 30.4, 8.2, 30.5);
bezierVertex(8.6, 30.6, 9, 30.8, 9.4, 30.8);
bezierVertex(15.6, 31.5, 21.3, 33.6, 26.7, 36.4);
bezierVertex(28.7, 37.4, 30.6, 38.6, 32.5, 39.7);
bezierVertex(33.4, 40.2, 34, 40.6, 34.4, 39.5);
endShape();

beginShape();
vertex(10.9, 14.5);
bezierVertex(8.2, 14.3, 5.3, 14.9, 2.5, 15);
bezierVertex(2, 15, 1.2, 15.2, 1.1, 14.4);
bezierVertex(1.1, 13.7, 1.8, 13.6, 2.4, 13.5);
bezierVertex(16.3, 11, 28.5, 14.8, 39.5, 23.2);
bezierVertex(41.3, 24.6, 43, 26, 44.7, 27.5);
bezierVertex(45.2, 28, 46.4, 28.5, 45.5, 29.4);
bezierVertex(44.7, 30.2, 44.2, 29.1, 43.7, 28.7);
bezierVertex(39.2, 24.6, 34.3, 21.1, 28.8, 18.5);
bezierVertex(23.2, 15.9, 17.4, 14.2, 10.9, 14.5);
endShape();
pop();



 //조개2
 push();
 translate(500,540);
 rotate(2.7);
 scale(0.9);
 fill(153,206,152);
noStroke();
beginShape();
vertex(19, 4.2);
bezierVertex(31.8, 4, 43.9, 12.6, 47.5, 23.8);
bezierVertex(49.1, 28.6, 48.2, 33.4, 43.1, 36.1);
bezierVertex(38.7, 38.5, 34.4, 41.1, 29.5, 42.3);
bezierVertex(22.9, 43.9, 16.3, 44.1, 10.8, 39.4);
bezierVertex(6.8, 35.9, 4.2, 31.2, 2.3, 26.2);
bezierVertex(1, 23, -0.1, 19.6, 0, 16.1);
bezierVertex(0.2, 11.2, 3.1, 8, 7.6, 6.3);
bezierVertex(11.3, 4.8, 15.2, 3.8, 19, 4.2);
endShape();


fill(91,114,86);
beginShape();
vertex(10.9, 14.5);
bezierVertex(17.4, 14.2, 23.2, 15.8, 28.8, 18.5);
bezierVertex(34.3, 21.1, 39.2, 24.6, 43.7, 28.7);
bezierVertex(44.2, 29.1, 44.7, 30.2, 45.5, 29.4);
bezierVertex(46.5, 28.5, 45.3, 27.9, 44.7, 27.5);
bezierVertex(43, 26, 41.3, 24.6, 39.5, 23.2);
bezierVertex(28.5, 14.7, 16.3, 10.9, 2.4, 13.5);
bezierVertex(1.8, 13.6, 1.1, 13.6, 1.1, 14.4);
bezierVertex(1.1, 15.2, 1.9, 15, 2.5, 15);
bezierVertex(5.4, 14.9, 8.2, 14.3, 10.9, 14.5);
endShape();



beginShape();
vertex(10, 18);
bezierVertex(8.9, 18.1, 7.5, 18.2, 6.1, 18.4);
bezierVertex(5.4, 18.5, 4.2, 18.3, 4.4, 19.3);
bezierVertex(4.5, 20.5, 5.7, 20, 6.5, 19.9);
bezierVertex(11, 19, 15.4, 19.9, 19.7, 21);
bezierVertex(26.9, 22.8, 33.4, 26.1, 39.4, 30.5);
bezierVertex(40, 30.9, 40.7, 31.8, 41.3, 31.1);
bezierVertex(42, 30.3, 41.1, 29.8, 40.5, 29.4);
bezierVertex(31.5, 22.7, 21.6, 18.6, 10, 18);
endShape();

beginShape();
vertex(10.1, 25.1);
bezierVertex(8.9, 25.1, 7.8, 25, 6.6, 25.1);
bezierVertex(5.9, 25.2, 4.8, 25.1, 4.9, 26.1);
bezierVertex(5, 27.3, 6.2, 26.9, 6.9, 26.8);
bezierVertex(10.5, 26.2, 14, 26.6, 17.5, 27.3);
bezierVertex(24.3, 28.7, 29.8, 32.2, 35.1, 36.5);
bezierVertex(35.6, 36.9, 36.1, 37.6, 36.7, 36.8);
bezierVertex(37.2, 36.2, 36.6, 35.8, 36.2, 35.4);
bezierVertex(28.6, 29.1, 20.2, 24.9, 10.1, 25.1);
endShape();

beginShape();
vertex(34.4, 39.5);
bezierVertex(34.3, 38.7, 33.6, 38.5, 33, 38.2);
bezierVertex(29.8, 36.2, 26.4, 34.5, 22.9, 32.9);
bezierVertex(18.4, 30.8, 13.5, 29.8, 8.6, 29.1);
bezierVertex(8, 29, 7.3, 28.9, 7.2, 29.7);
bezierVertex(7.1, 30.3, 7.7, 30.4, 8.2, 30.5);
bezierVertex(8.6, 30.6, 9, 30.8, 9.4, 30.8);
bezierVertex(15.6, 31.5, 21.3, 33.6, 26.7, 36.4);
bezierVertex(28.7, 37.4, 30.6, 38.6, 32.5, 39.7);
bezierVertex(33.4, 40.2, 34, 40.6, 34.4, 39.5);
endShape();

beginShape();
vertex(10.9, 14.5);
bezierVertex(8.2, 14.3, 5.3, 14.9, 2.5, 15);
bezierVertex(2, 15, 1.2, 15.2, 1.1, 14.4);
bezierVertex(1.1, 13.7, 1.8, 13.6, 2.4, 13.5);
bezierVertex(16.3, 11, 28.5, 14.8, 39.5, 23.2);
bezierVertex(41.3, 24.6, 43, 26, 44.7, 27.5);
bezierVertex(45.2, 28, 46.4, 28.5, 45.5, 29.4);
bezierVertex(44.7, 30.2, 44.2, 29.1, 43.7, 28.7);
bezierVertex(39.2, 24.6, 34.3, 21.1, 28.8, 18.5);
bezierVertex(23.2, 15.9, 17.4, 14.2, 10.9, 14.5);
endShape();
pop();

 //움직이는 파도 
  v += 0.004;
  if(back == false) wave_Y += 0.2 + v;
  else wave_Y -= 0.18 ;

    
  if(wave_Y > 437) back = true;
  if(wave_Y < 425) {
      v = 0;
      back = false;
    }
}
