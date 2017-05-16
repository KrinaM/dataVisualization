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
var detectorsALL = [];
var selectedObject = 4; //Default selected object: order=4
var heightCanvas = 1400;
var widthCanvas = 1400;
var widthMap = widthCanvas * .25;
var heightMap = heightCanvas * .25;
var heightTable = widthCanvas * .8;
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
var endBarMargin = 2 * Math.PI * R1 / 44; // starting points of rays in the large ring
var heightRay = R1 - R2; // long side of rectangle
var widthRay = endBarMargin * 0.7 // short side of rectangle 
var theta = 2 * Math.PI / 44;
var timeRay = heightRay / 180;
var countDay = 0;

countClicks = 0;

// object obs contains every row of the data set
var obs = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
  this.ID = row.getNum("UNIEKEID");
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  this.Y = map(this.longitude, 50.72, 51, widthMap, 0); // 50.86, 51 --- 
  this.X = map(this.lattitude, 4, 4.93, 0, heightMap); // 4, 4.6 4.013617, 4.923672 -- 3.98 , 4.9237 --- 
  this.Day = row.getNum("DAY");
  this.Month = row.getNum("MONTH");
  this.Time = row.getNum("TIME");
  this.Color = map(this.Vht, 0, 167, 255, 50);
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
  noLoop();

  // ALL detectors image
  for (var r = 0; r < rowsALL.length; r++) {
    var thisDetectorALL = new obs(rowsALL[r]);
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
    detectorsImage.noStroke();
    detectorsImage.fill(0, 0, 0, 160);
    detectorsImage.ellipse(thisDetectorIN.X, thisDetectorIN.Y, 10, 10);
    //  detectorsImage.fill(0).strokeWeight(0).textSize(14);
    //    detectorsImage.text((thisDetectorIN.ID).toString(), thisDetectorIN.X, thisDetectorIN.Y)
    detectors.push(thisDetectorIN);
  }
  image(detectorsImage, 220, margin);
  //console.log(detectors.length)


  // Draw Table
  translate(widthCanvas - widthTable, margin);
  // filter data according to Day and month
  var selDay = detectors.filter(function(obj) {
    return (obj.Day == 1 && obj.Month == 3);
  });

  // select only Mondays for example
  var selDayOfWeek = detectors.filter(function(obj) {
    return (obj.Day % 5 == 1);
  });

  // Draw the rectangles for each observation
  for (var i = 0; i < 28; i++) {
    for (var k = 0; k < 180; k++) {
      tableImage.noStroke();
      tableImage.fill(46, 139, 87, selDay[count * 180 + k].Color)
      tableImage.rect(widthBar * i, heightHour / 12 * k, widthBar, heightHour / 12)
    }
    count++; // count the detector
  }

  for (var i = 1; i < numBar; i++) {
    tableImage.stroke(255);
    tableImage.strokeWeight(4);
    tableImage.line(i * widthBar, 0, i * widthBar, heightTable);
  }

  // Text for hours
  for (var j = 5; j < 20; j++) {
    textSize(10);
    fill(0);
    text(j + ":00", -margin, (j - 5) * heightTable / 14);
  }
  // Text for notes
  for (var j = 0; j < 28; j++) {
    textSize(10);
    fill(0);
    text(detectors[3960 * j].Note, j * widthBar, -margin * 0.5);
  }

  image(tableImage, 0, 0);
  c = 1;
  translate(-widthTable * 0.76, heightMap * 1.95); // -widthMap + widthTable * 0.5, heightMap * 1.2
  drawRing(c);
}

function draw() {
  // Interactivity Detectors
  if (trig == 1) {
    c = floor((mouseX - 0.55 * widthCanvas) / widthBar); // bar identifier c = 0, 1, ..., 27 for inner ring

    push();
    noStroke();
    fill(255);
    rect(widthCanvas - widthTable, margin, widthTable, heightTable);
    pop();

    push();
    image(tableImage, widthCanvas - widthTable, margin)
    translate(.55 * widthCanvas + c * widthBar, margin);
    strokeWeight(4);
    stroke(100, 255, 255);
    noFill();
    rect(0, 0, widthBar, heightTable)
    pop();

    push();
    fill(255);
    image(detectorsImage, 220, margin);
    noStroke();
    fill(255, 0, 0);
    ellipse(220 + detectors[3960 * c].X, margin + detectors[3960 * c].Y, 10, 10);
    pop();

    push();
    translate(widthCanvas - widthTable, margin);
    translate(-widthTable * 0.76, heightMap * 1.95); // -widthMap + widthTable * 0.5, heightMap * 1.2
    //  console.log(c)
    drawRing(c);
    pop();
  }

  /*
    // white rectangle on top of Ring, useful when redraw
    noStroke();
    fill(255);
    rect(widthCanvas - widthTable - margin, heightMap + margin, widthCanvas * 0.7, heightCanvas * 0.7);

  */


}

// sienna	#A0522D	(160,82,45,int)
// dark orange	#FF8C00	(255,140,0) 
// sea green	#2E8B57	(46,139,87)
// 	dark violet	#9400D3	(148,0,211)
// crimson	#DC143C	(220,20,60)
//gold	#FFD700	(255,215,0)

function drawRing(c) {
  // var countDay = 0;
  // Choose observations with specific Order
  //  console.log(countDay)
  selDet = detectors.filter(function(obj) {
    return (obj.Order = c + 1) //(floor((mouseX - 0.55 * widthCanvas) / widthBar) + 1));
  });
  var dayClicks = countClicks * 44;

  // console.log(dayClicks)
  // var countDay = 0;
  // Draw ring
  translate(R2, R2);
  for (var i = 0; i < 44; i++) {
    for (var k = 0; k < 180; k++) {
      if ((k + 1) % 24 == 0) {
        strokeWeight(0.5);
        stroke(210);
        noFill();
        ellipse(0, 0, (2 * (R2 + k * timeRay)) * cos(theta));
      }
      strokeWeight(10);
      if (countDay - dayClicks > 21) {
        stroke(148, 0, selDet[dayClicks * 180 + k].Color) // dark violet
      } else {
        stroke(255, 215, selDet[dayClicks * 180 + k].Color) // gold
      }


      /*
            if (countDay > 21) {
              stroke(148, 0, selDet[countDay * 180 + k].Color) // dark violet
            } else {
              stroke(255, 215, selDet[countDay * 180 + k].Color) // gold
            }
      */
      // Yellow line starts at 0 countDay (First date in the dataset)
      line((R2 + k * timeRay) * sin(theta * (i + 1)), (R2 + k * timeRay) * (-cos(theta * (i + 1))), (R2 + (k + 1) * timeRay) * sin(theta * (i + 1)), (R2 + (k + 1) * timeRay) * (-cos(theta * (i + 1))));
      /* 
            textFont();
            textSize();
            fill(50);
            text(countDay.toString(), (R2 + (k+1) * timeRay) * sin(theta * (i + 1)), 
            (R2 + (k+1) * timeRay) * (-cos(theta * (i + 1))) );
      */
    }
    //    if (countDay<43) {
    countDay++;
    //  } else { 
    //  countDay = 0;
    //  }
  }
}


function mouseClicked() {
  if (mouseX > .55 * widthCanvas && mouseX < .55 * widthCanvas + numDetIN * widthBar) {
    trig = 1;
  } else {
    trig = 0;
  }
  countClicks++;
  redraw();
}