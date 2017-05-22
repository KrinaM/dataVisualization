/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

// Comments Jan:
// detectors sti seira to show flow of the traffic
// include all !! detectors kai px mporoume na to xorisoume se N,S,E,W.
// na sinexisoume kai na simperilavoume kai ton kiklo

/*
28 detectors binnenring
26 detectors buitenring
63    >>     Brussel
*/


// Define variables
var c = 0,
  trig = 0;
var tableIN, tableOUT, tableBRU;
var rowsIN, rowsOUT, rowsBRU;
var rowsTest, tableTest
var tableImage;
var detectorsImage;
var detectorsImageALL;
var detectors = [];
var maxAvg = [];
var minAvg = [];
var sumAvg = [];
var overallAvg = [];
var average = [];
var detectorsALL = [];
var selectedObject = 4; //Default selected object: order=4
var heightCanvas = 1400;
var widthCanvas = 1400;
var widthMap = widthCanvas * .25;
var heightMap = heightCanvas * .25;
var heightTable = widthCanvas * .7;
var widthTable = heightCanvas * .45;
var widthRing = widthCanvas * .5;
var heightRing = heightCanvas * .5;

var margin = widthCanvas * .02;
var numBar = 28;
var heightHour = heightTable / 15;
var widthBar = widthTable / numBar;
var count = 0;

var numDetIN = 28; // number of detectors inner ring

/* Ring visual variables */
var R1 = 350; // Radius of big Ring   
var R2 = 80; // Radius of small Ring
var R3 = 360; // Radius of Time Series Ring
var endBarMargin = 2 * Math.PI * R1 / 44; // starting points of rays in the large ring
var heightRay = R1 - R2; // long side of rectangle
var widthRay = endBarMargin * 0.7 // short side of rectangle 
var theta = 2 * Math.PI / 44;
var timeRay = heightRay / 180;
var countDay = 0;

var avgVht = [];

var selectedDay = 4;

var RefTable = [{
  'name': 'aE:Ring-After Exit,  bI:Ring-Before Incoming,  RI:Ring,  EX:Exit,  N8:Incoming from N8,  E/P:Exit & Parallel,  In:Incoming,  TL:Tunnel'
}];

// object obs contains every row of the data set
var obs = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
  this.ID = row.getNum("UNIEKEID");
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  this.Y = map(this.longitude, 50.72, 51, widthMap, 0);
  this.X = map(this.lattitude, 4, 4.93, 0, heightMap);
  this.Day = row.getNum("DAY");
  this.Month = row.getNum("MONTH");
  this.Time = row.getNum("TIME");
  this.Color = map(this.Vht, 0, 167, 255, 50);
  this.ColorRing = map(this.Vht, 0, 167, 50, 100);
  this.Order = row.getNum("ORDER");
  this.Note = row.get("TEXT");
}

function preload() {
  // load data sets
  tableIN = loadTable("BRUSSELSdataIN.csv", "csv", "header"); // Binnenring
  //  tableOUT = loadTable("BRUSSELSdataOUT.csv", "csv", "header"); // Buitenring
  //  tableBRU = loadTable("BRUSSELSdataBRU.csv", "csv", "header"); // Brussel
  tableALLuniq = loadTable("det120uniqM.csv", "csv", "header"); // all detectors unique obs
  //tableTest = loadTable("BRUdataSEL.csv", "csv", "header"); // all detectors unique obs
  //rowsTest = tableTest.getRows();

  rowsIN = tableIN.getRows();
  //  rowsOUT = tableOUT.getRows();
  //  rowsBRU = tableBRU.getRows();
  rowsALL = tableALLuniq.getRows();

  detectorsImageALL = createGraphics(widthCanvas, heightCanvas);
  detectorsImage = createGraphics(widthCanvas, heightCanvas);

  tableImage = createGraphics(widthCanvas, heightCanvas);
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  // ALL detectors image
  for (var r = 0; r < rowsALL.length; r++) {
    var thisDetectorALL = new obs(rowsALL[r]);
    colorMode(RGB, 255);
    detectorsImageALL.noStroke();
    detectorsImageALL.fill(160, 160, 160, 160);
    detectorsImageALL.ellipse(thisDetectorALL.X, thisDetectorALL.Y, 10, 10);
    //  detectorsImage.fill(0).strokeWeight(0).textSize(14);
    //    detectorsImage.text((thisDetectorIN.ID).toString(), thisDetectorIN.X, thisDetectorIN.Y)
    detectorsALL.push(thisDetectorALL);
  }

  image(detectorsImageALL, 220, margin);

  // Inner Ring detectors
  for (var r = 0; r < rowsIN.length; r++) {
    var thisDetectorIN = new obs(rowsIN[r]);
    colorMode(RGB, 255);
    detectorsImage.noStroke();
    detectorsImage.fill(0, 0, 0, 160);
    detectorsImage.ellipse(thisDetectorIN.X, thisDetectorIN.Y, 10, 10);
    //  detectorsImage.fill(0).strokeWeight(0).textSize(14);
    //    detectorsImage.text((thisDetectorIN.ID).toString(), thisDetectorIN.X, thisDetectorIN.Y)
    detectors.push(thisDetectorIN);
  }


  /*
  for (var j = 1; j < 45; j++) {
    for (var i = 1; i < 29; i++) {
      averPeak = computeAvgVhtPeak(i, j, 2);
    //  console.log("i");
    //  console.log(i);
    //  console.log("j");
    //  console.log(j);
    //  console.log(averPeak)
    }
  }
  
  */
  image(detectorsImage, 220, margin);
  //console.log(detectors.length)


  // Draw color reference bars
  drawColorBars();

  // Draw Table
  translate(widthCanvas - widthTable, margin);
  // filter data according to Day and month

  // -------------- Table ---------------

  drawTableText();
  translate(-widthCanvas + widthTable, -margin);
  TableRefs();
  translate(widthCanvas - widthTable, margin);

  img = setTable(selectedDay);

  image(img, 0, 0);
  c = 0;
  translate(-widthTable * 0.76, heightMap * 1.95); // -widthMap + widthTable * 0.5, heightMap * 1.2
  drawRing(c)
  noLoop();
}

function draw() {
  background(0, 0);

  image(detectorsImageALL, 220, margin);
  image(detectorsImage, 220, margin);

  /*
  // Create buttons for choice of day in the table
  buttonMon = createButton('Monday');
  buttonMon.position(widthCanvas * 0.4, 20);
  buttonMon.size(100, 20);
  //buttonMon.mousePressed(chooseMon);

  buttonTue = createButton('Tuesday');
  buttonTue.position(widthCanvas * 0.4, 40);
  buttonTue.size(100, 20);
  //buttonTue.mousePressed(chooseTue);

  buttonWed = createButton('Wednesday');
  buttonWed.position(widthCanvas * 0.4, 60);
  buttonWed.size(100, 20);
  //buttonWed.mousePressed(chooseWed);

  buttonThu = createButton('Thursday');
  buttonThu.position(widthCanvas * 0.4, 80);
  buttonThu.size(100, 20);
  //buttonThu.mousePressed(chooseThu);

  buttonFri = createButton('Friday');
  buttonFri.position(widthCanvas * 0.4, 100);
  buttonFri.size(100, 20);
*/
  /*
    translate(widthCanvas - widthTable, margin);
    drawTableText();
    translate(widthTable-widthCanvas, -margin)
  */

  //img = setTable(selectedDay);

  // Interactivity Detectors
  if (trig === 1) {
    c = floor((mouseX - 0.55 * widthCanvas) / widthBar); // bar identifier c = 0, 1, ..., 27 for inner ring

    // Draw outer table rectangle
    push();
    colorMode(RGB, 255);
    strokeWeight(4);
    stroke(255); //necessary to cover remaining blue stroke from interactivity
    fill(255);
    rect(widthCanvas - widthTable, margin, widthTable, heightTable);
    pop();

    // Draw table bars
    push();
    colorMode(RGB, 255);

    image(img, widthCanvas - widthTable, margin);
    translate(widthCanvas - widthTable, margin);
    drawTableText();
    translate(-widthCanvas + widthTable, -margin)
    TableRefs();

    translate(.55 * widthCanvas + c * widthBar, margin);
    strokeWeight(4);
    stroke(255, 215, 0);
    noFill();
    rect(0, 0, widthBar, heightTable);
    pop();

    // Draw detectors
    push();
    colorMode(RGB, 255);
    fill(255);
    image(detectorsImageALL, 220, margin);
    image(detectorsImage, 220, margin);
    noStroke();
    fill(255, 215, 0);
    ellipse(220 + detectors[3960 * c].X, margin + detectors[3960 * c].Y, 10, 10);
   // console.log(detectors[3961]);
    fill(0);
    text(detectors[3960 * c].longitude + "   " + detectors[3960 * c].lattitude, widthCanvas * 0.2, margin);
    pop();

    // Draw ring
    push();
    translate(widthCanvas - widthTable, margin);
    translate(-widthTable * 0.76, heightMap * 1.95); // -widthMap + widthTable * 0.5, heightMap * 1.2
    drawRing(c);
    //       averPeak = computeAvgVhtPeak(c, 1, 1);

    pop();

  } else if (trig === 2) {

    c = 0;

    console.log(selectedDay);

    push();
    img = setTable(selectedDay);
    // translate(widthTable * 0.76, -heightMap * 1.95);
    colorMode(RGB, 255);
    fill(255);
    rect(0, 0, widthCanvas, heightCanvas); // (widthCanvas-widthTable-margin, margin, widthTable, heightTable);
    image(img, widthCanvas - widthTable, margin);
    translate(widthCanvas - widthTable, margin);
    drawTableText();
    translate(-widthCanvas + widthTable, -margin)
    TableRefs();
    pop();

    // Draw detectors
    push();
    colorMode(RGB, 255);
    fill(255);
    image(detectorsImageALL, 220, margin);
    image(detectorsImage, 220, margin);
    noStroke();
    fill(255, 215, 0);
    ellipse(220 + detectors[3960 * c].X, margin + detectors[3960 * c].Y, 10, 10);
    // console.log(detectors[3961]);
    pop();

    // Draw ring
    push();
    translate(widthCanvas - widthTable, margin);
    translate(-widthTable * 0.76, heightMap * 1.95); // -widthMap + widthTable * 0.5, heightMap * 1.2
    drawRing(c);
    pop();

    drawColorBars();
  }
  trig = 0;
}

// sienna	#A0522D	(160,82,45,int)
// dark orange	#FF8C00	(255,140,0) 
// sea green	#2E8B57	(46,139,87)
// 	dark violet	#9400D3	(148,0,211)
// crimson	#DC143C	(220,20,60)
//gold	#FFD700	(255,215,0)

function drawRing(det) {

  // Choose observations with specific Order
  selDet = detectors.filter(function(obj) {
    return (obj.Order = det + 1) //(floor((mouseX - 0.55 * widthCanvas) / widthBar) + 1));
  });
  var cc = 0;

  // Draw ring

  translate(R2, R2);
  for (var i = 0; i < 44; i++) {
    for (var k = 0; k < 180; k++) {
      if ((k + 1) % 24 == 0) {
        strokeWeight(0.5);
        colorMode(RGB, 255);
        stroke(210);
        noFill();
        ellipse(0, 0, (2 * (R2 + k * timeRay)) * cos(theta));
      }

      strokeMapWeight = map(selDet[det * cc * 180 + k].Vht, 167, 0, 2, 15);
      strokeWeight(strokeMapWeight);

      colorMode(HSB);
      if (cc > 21) {

        stroke(210, 100, selDet[det * cc * 180 + k].ColorRing) // blue = March
      } else {
        stroke(22, 100, selDet[det * cc * 180 + k].ColorRing) // orange = October

      }

      // Yellow line starts at 0 countDay (First date in the dataset)
      line((R2 + k * timeRay) * sin(theta * (i + 1)), (R2 + k * timeRay) * (-cos(theta * (i + 1))), (R2 + (k + 1) * timeRay) * sin(theta * (i + 1)), (R2 + (k + 1) * timeRay) * (-cos(theta * (i + 1))));
    }

    noStroke()
    fill(0);
    if (cc % 5 == 0 && cc < 22) {
      if (cc < 5) {
        text("M", (R2 + 10 + 181 * timeRay) * sin(theta * (i + 1)), (R2 + 10 + 181 * timeRay) * (-cos(theta * (i + 1))));
      } else {
        text("M", (R2 + i * 0.2 + 10 + 181 * timeRay) * sin(theta * (i + 1)), (R2 + i * 0.2 + 10 + 181 * timeRay) * (-cos(theta * (i + 1))));
      }
    }
    if ((cc - 22) % 5 == 2 && cc >= 22) {
      if (cc > 38) {
        text("M", (R2 + 10 + 181 * timeRay) * sin(theta * (i + 1)), (R2 + 10 + 181 * timeRay) * (-cos(theta * (i + 1))));
      } else {
        text("M", (R2 + i * 0.2 + 10 + 181 * timeRay) * sin(theta * (i + 1)), (R2 + i * 0.2 + 10 + 181 * timeRay) * (-cos(theta * (i + 1))));
      }
    }
    text("5 am",-10, -70)
    text("7 pm", -10, -355)
    //    text(cc, (R2 + i * 0.2 + 10 + 181 * timeRay) * sin(theta * (i + 1)), (R2 + i * 0.2 + 10 + 181 * timeRay) * (-cos(theta * (i + 1))));
    cc++;
  }
  /*
        overallAvg = computeAvgVht(i + 1, selectedDay);
        line((R3 * sin(theta * (i + 1)), (R3 * (-cos(theta * (i + 1))), (R3 * sin(theta * (i + 1)), (R3 * (-cos(theta * (i + 1))));
    */
}


function computeAvgVht(detOrder, dayOfWeek) {
  // select only Mondays for example

  var selDayDet = detectors.filter(function(obj) {
    return (obj.Month == 3 && obj.Day % 5 == dayOfWeek && obj.Order == detOrder);
  });
console.log(selDayDet.length)
  
  // compute average Vht
  var sumVht = new Array(180);
  var avg = new Array(180);
  for (var i = 0; i < sumVht.length; i++) {
    sumVht[i] = 0;
  }
  var ct = 1;
  for (var i = 0; i < selDayDet.length; i += 180) {
    for (var j = 0; j < 180; j++) {
      sumVht[j] += selDayDet[i + j].Vht;
    }
    ct++
  }
  for (var i = 0; i < 180; i++) {
    avg[i] = sumVht[i] / ct;
  }
  return avg;
}

/*
function computeOverallAvg(detOrder, dayOfWeek) {
 var sumAverage = new Array(44);
 var average = new Array(44);
   for (var i = 0; i < sumAverage.length; i++) {
    sumAverage[i] = 0;
    average[i] = 0;
  }
  // var cta = 1;
  for (var i = 0; i < 44; i++) {
   var avgerageVht = computeAvgVht(selectedObject, selectedDay);
    for (var j = 0; j < 180; j++){
      sumAverage[i] += avgerageVht[j]; }
     // cta++
  }
    for (var i = 0; i < 44; i++) {
    average[i] = sumAverage[i] / 44; }
    return average;
}


*/

function drawColorBars() {
  translate(0, -100);
  for (var i = 0; i < 200; i++) {
    colorMode(HSB);
    var colMapRing = map(i, 0, 200, 50, 100);
    //noStroke()
    strokeWeight(widthBar / 2);
    stroke(210, 100, colMapRing);
    point(margin, 160 + i * heightTable / 800);
    strokeWeight(widthBar / 2);
    stroke(22, 100, colMapRing);
    point(margin + widthBar, 160 + i * heightTable / 800);
    var colMapTable = map(i, 0, 200, 255, 50);
    noStroke();
    colorMode(RGB, 225, 255, 255, 255);
    fill(102, 0, 0, colMapTable); // 46, 139, 87
    rect(margin + 2 * widthBar, 160 + i * heightTable / 800, widthBar / 2, heightTable / 800);
  }
  noStroke()
  fill(0)
  textSize(10);
  text("Lower Speed", margin - 10, 150)
  text("Higher Speed", margin - 10, 175 + heightTable / 4)
  translate(0, 20)
  strokeWeight(widthBar / 2);
  colorMode(HSB)
  stroke(210, 100, 175)
  point(margin, 160 + heightTable / 4 + margin)
  noStroke()
  fill(0)
  textSize(10);
  text("March", 1.5 * margin, 165 + heightTable / 4 + margin)
  stroke(22, 100, 175)
  point(margin, 180 + heightTable / 4 + margin)
  noStroke()
  fill(0)
  textSize(10);
  text("October", 1.5 * margin, 20 + 165 + heightTable / 4 + margin)
  noStroke();
  colorMode(RGB, 225, 255, 255, 255);
  fill(46, 139, 87, 102);
  rect(margin - 5, 35 + 160 + heightTable / 4 + margin, widthBar / 2, widthBar / 2);
  noStroke()
  fill(0)
  textSize(10);
  text("Average Speed", 1.5 * margin, 35 + 170 + heightTable / 4 + margin)

  translate(0, 80);
}


/*
>>>>>>> d4d9eb0c0b57ab680e4d318b330926f4afb5d287
function chooseMon() {
  selectedDay = 1;
  console.log(selectedDay);
  img = setTable(selectedDay);
  clear();
  redraw();
//  drawColorBars();
}

function chooseTue() {
  selectedDay = 2;
  img = setTable(selectedDay);
  console.log(selectedDay);
  clear();
  redraw();
}

function chooseWed() {
  selectedDay = 3;
  img = setTable(selectedDay);
  console.log(selectedDay);
  clear();
  redraw();
//  drawColorBars();
}

function chooseThu() {
  selectedDay = 4;
  img = setTable(selectedDay);
  console.log(selectedDay);
  clear();
  redraw();
//  drawColorBars();
}

function chooseFri() {
  selectedDay = 5;
  img = setTable(selectedDay);
  console.log(selectedDay);
  clear();
  redraw();
//  drawColorBars();
}
*/



function chooseDay(mX, mY) {
  if (mX >= widthCanvas * 0.4 && mX <= (widthCanvas * 0.4 + 100) && mY >= 20 && mY <= 120) {
    if (mY >= 20 && mY < 40) {
      selectedDay = 0;
    } else if (mY >= 40 && mY < 60) {
      selectedDay = 1;
    } else if (mY >= 60 && mY < 80) {
      selectedDay = 2;
    } else if (mY >= 80 && mY <= 100) {
      selectedDay = 3;
    } else {
      selectedDay = 4;
    }
  }
  return selectedDay;
}


function drawTableText() {
  // Text for hours
  for (var j = 5; j < 20; j++) {
    textSize(10);
    fill(0);
    noStroke();
    text(j + ":00", -margin, (j - 5) * heightTable / 14);
  }
  // Text for notes
  for (var j = 0; j < 28; j++) {
    textSize(10);
    fill(0);
    noStroke();
    text(detectors[3960 * j].Note, j * widthBar, -margin * 0.5);
  }
}

function drawColorBars() {
  translate(0, -100);
  for (var i = 0; i < 200; i++) {
    colorMode(HSB);
    var colMapRing = map(i, 0, 200, 50, 100);
    //noStroke()
    strokeWeight(widthBar / 2);
    stroke(210, 100, colMapRing);
    point(margin, 160 + i * heightTable / 800);
    strokeWeight(widthBar / 2);
    stroke(22, 100, colMapRing);
    point(margin + widthBar, 160 + i * heightTable / 800);
    var colMapTable = map(i, 0, 200, 255, 50);
    noStroke();
    colorMode(RGB, 225, 255, 255, 255);
    fill(102, 0, 0, colMapTable);
    rect(margin + 2 * widthBar, 160 + i * heightTable / 800, widthBar / 2, heightTable / 800);
  }
  noStroke()
  fill(0)
  textSize(10);
  text("Lower Speed", margin - 10, 150)
  text("Higher Speed", margin - 10, 175 + heightTable / 4)
  translate(0, 20)
  strokeWeight(widthBar / 2);
  colorMode(HSB)
  stroke(210, 100, 175)
  point(margin, 160 + heightTable / 4 + margin)
  noStroke()
  fill(0)
  textSize(10);
  text("October", 1.5 * margin, 165 + heightTable / 4 + margin)
  stroke(22, 100, 175)
  point(margin, 180 + heightTable / 4 + margin)
  noStroke()
  fill(0)
  textSize(10);
  text("March", 1.5 * margin, 20 + 165 + heightTable / 4 + margin)
  noStroke();
  colorMode(RGB, 225, 255, 255, 255);
  fill(102, 0, 0, 102);
  rect(margin - 5, 35 + 160 + heightTable / 4 + margin, widthBar / 2, widthBar / 2);
  noStroke()
  fill(0)
  textSize(10);
  text("Average Speed", 1.5 * margin, 35 + 170 + heightTable / 4 + margin)
  translate(0, 80);
}

function TableRefs() {
  textSize(10);
  fill(0);
  noStroke();
  text(RefTable[0].name, widthCanvas - widthTable, heightTable + 1.8 * margin);
}

function mouseClicked() {
  if (mouseX >= 0.55 * widthCanvas && mouseX <= 0.55 * widthCanvas + numDetIN * widthBar) {
    trig = 1;



    colorMode(RGB, 255);
    stroke(255);
    fill(255);
    rect(0, 0, widthCanvas, heightCanvas);

    redraw();
    drawColorBars();
  } else if (mouseX >= widthCanvas * 0.4 && mouseX <= (widthCanvas * 0.4 + 100) && mouseY >= 20 && mouseY <= 120) {
    trig = 2;
    selectedDay = chooseDay(mouseX, mouseY);

    colorMode(RGB, 255);
    stroke(255);
    fill(255);
    rect(0, 0, widthCanvas, heightCanvas);

    redraw();
  } else {
    trig = 0;
  }
}

/*
function mousePressed() { 
 if (mouseButton == RIGHT && selectedDay
 if (selectedDay != 1) {
 trigTable = 1;
    redraw(); }
}
*/
// console.log(selectedDay);



// Draw the rectangles for each observation
function setTable(selectedDayofWeek) {
  for (var i = 0; i < 28; i++) {
    avgVht = computeAvgVht(i + 1, selectedDayofWeek);
    maxAvg[i] = max(avgVht);
    minAvg[i] = min(avgVht);
    for (var k = 0; k < 180; k++) {
      // sumAvg[i] += avgVht[k];
      colorMode(RGB, 255);
      tableImage.noStroke();
      tableImage.fill(102, 0, 0, map(avgVht[k], 0, 125, 255, 50)); // 46, 139, 87,
      tableImage.rect(widthBar * i, heightHour / 12 * k, widthBar, heightHour / 12)
    }
  }
  // for (var i = 0; i<28; i++) {
  //  average[i] = sumAvg[i]/28;
  // }

  /*
    // Draw the rectangles for each observation
    for (var i = 0; i < 28; i++) {
      for (var k = 0; k < 180; k++) {
        tableImage.noStroke();
        tableImage.fill(46, 139, 87, selDay[i * 180 + k].Color)
        tableImage.rect(widthBar * i, heightHour / 12 * k, widthBar, heightHour / 12)
      }
  //    count++; // count the detector
    }
  */
  for (var i = 1; i < numBar; i++) {
    tableImage.stroke(255);
    tableImage.strokeWeight(4);
    tableImage.line(i * widthBar, 0, i * widthBar, heightTable);
  }

  return tableImage;

};