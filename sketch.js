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
var tableIN, tableOUT, tableBRU;
var rowsIN, rowsOUT, rowsBRU;
var rowsTest, tableTest;
var detectorsImage;
var detectors = [];
var heightCanvas = 1200;
var widthCanvas = 1200;
var widthMap = widthCanvas * .35;
var heightMap = heightCanvas * .35;
var heightTable = widthCanvas * .8;
var widthTable = heightCanvas * .45;
var widthRing = widthCanvas * .7;
var heightRing = heightCanvas * .7;

var margin = widthCanvas * .05;
var numBar = 28;
var heightHour = heightTable / 15;
var widthBar = widthTable / numBar;
var count = 0;


// object obs contains every row of the data set
var obs = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
  this.ID = row.getNum("UNIEKEID");
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  this.Y = map(this.longitude, 50.72422, 51, widthMap, 0); // 50.86, 51
  this.X = map(this.lattitude, 3.98, 4.9237, 0, heightMap); // 4, 4.6 4.013617, 4.923672
  this.Day = row.getNum("DAY");
  this.Month = row.getNum("MONTH");
  this.Time = row.getNum("TIME");
  this.Color = map(this.Vht, 0, 167, 255, 50);
  this.Order = row.getNum("ORDER");
}

function preload() {
  // load data sets
  tableIN = loadTable("BRUSSELSdataIN.csv", "csv", "header"); // Binnenring
  //  tableOUT = loadTable("BRUSSELSdataOUT.csv", "csv", "header"); // Buitenring
  //  tableBRU = loadTable("BRUSSELSdataBRU.csv", "csv", "header"); // Brussel
  //  tableALLuniq = loadTable("det120uniqM.csv", "csv", "header"); // all detectors unique obs
  //tableTest = loadTable("BRUdataSEL.csv", "csv", "header"); // all detectors unique obs
  //rowsTest = tableTest.getRows();

  rowsIN = tableIN.getRows();
  //  rowsOUT = tableOUT.getRows();
  //  rowsBRU = tableBRU.getRows();
  //  rowsALL = tableALLuniq.getRows();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
  for (var r = 0; r < rowsIN.length; r++) {
    var thisDetectorIN = new obs(rowsIN[r]);
    detectorsImage.noStroke();
    detectorsImage.fill(160, 160, 160, 160);
    detectorsImage.ellipse(thisDetectorIN.X, thisDetectorIN.Y, 10, 10);
    //  detectorsImage.fill(0).strokeWeight(0).textSize(14);
    //    detectorsImage.text((thisDetectorIN.ID).toString(), thisDetectorIN.X, thisDetectorIN.Y)
    detectors.push(thisDetectorIN);
  }
  image(detectorsImage, 0, 0);
}

function draw() {
  translate(widthCanvas - widthTable - margin, margin);
  // noStroke();
  rect(0, 0, widthTable, heightTable);

  //  for (var j=0; j<numBar; j++) {
  //    count = 0;

  j = 0;
  for (var i = 1; i < detectors.length; i++) {

    if (detectors[i].Day == 1 && detectors[i].Month == 3) {
      if (detectors[i].ID == detectors[i - 1].ID) {
        noStroke();
        fill(46, 139, 87, detectors[i].Color);
        rect(j * widthBar, count * heightHour / 12, widthBar, heightHour / 12);
        count++;
      } else {
        j++
        count = 0;
      }
    }
  }
  for (var i = 1; i < numBar; i++) {
    stroke(255);
    strokeWeight(4);
    line(i * widthBar, 0, i * widthBar, heightTable);
  }

  translate(-widthMap + widthTable * 0.5, heightMap * 1.2);

  /* Ring visual variables */
  var R1 = 350; // Radius of big Ring   
  var R2 = 80; // Radius of small Ring
  var startBarMargin = 2 * PI * R2 / 44; // starting points of rays in the small ring
  var endBarMargin = 2 * PI * R1 / 44; // starting points of rays in the large ring
  var heightRay = R1 - R2; // long side of rectangle
  var widthRay = endBarMargin * 0.7 // short side of rectangle 
  var theta = 2 * PI / 44;
  var timeRay = heightRay / 180;
  var countDay = 0;

  // Draw small ring
  // noStroke();
  //fill(255);
  //ellipse(25, 25, R1 * 2, R1 * 2);
  // Draw large ring
  //  noStroke();
  //  fill(255);
  //  ellipse(25, 25, R2 * 2, R2 * 2);

  // Choose observations with specific ID
  var selDet = detectors.filter(function(obj) {
    return obj.ID == 1756;
  });

  translate(R2, R2);
  for (var i = 0; i < 44; i++) {
    for (var k = 0; k < 180; k++) {
      if ((k + 1) % 24 == 0) {
        strokeWeight(1);
        stroke(240);
        noFill();
        ellipse(0, 0, (2 * (R2 + k * timeRay)) * cos(theta));
      }
      strokeWeight(10);
      if (countDay > 21) {
        stroke(148, 0, selDet[countDay * 180 + k].Color)
      } else {
        stroke(255, 215, selDet[countDay * 180 + k].Color)
      }
      // Yellow line starts at 0 countDay (First date in the dataset)
      line((R2 + k * timeRay) * sin(theta * (i + 1)), (R2 + k * timeRay) * (-cos(theta * (i + 1))), 
      (R2 + (k + 1) * timeRay) * sin(theta * (i + 1)), (R2 + (k + 1) * timeRay) * (-cos(theta * (i + 1))));
      /*      
            textFont();
            textSize();
            fill(50);
            text(countDay.toString(), (R2 + (k+1) * timeRay) * sin(theta * (i + 1)), 
            (R2 + (k+1) * timeRay) * (-cos(theta * (i + 1))) );
      */

      /*
        fill(220, 20, 60, selDet[j + k].Color)
        quad((R2 + k * timeRay) * cos(theta * (i + 1)), (R2 + k * timeRay) * sin(theta * (i + 1)), 
        (R2 + k * timeRay) * cos(theta * (i + 1)), (R2 + k * timeRay) * sin(theta * (i + 1))+1, 
        (R2 + (k + 1) * timeRay) * cos(theta * (i + 1)), (R2 + (k + 1) * timeRay) * sin(theta * (i + 1)),
        (R2 + (k + 1) * timeRay) * cos(theta * (i + 1)), (R2 + (k + 1) * timeRay) * sin(theta * (i + 1))+1);
*/
    }
    countDay++;
  }

}

// sienna	#A0522D	(160,82,45,int)
// dark orange	#FF8C00	(255,140,0) 
// sea green	#2E8B57	(46,139,87)
// 	dark violet	#9400D3	(148,0,211)
// crimson	#DC143C	(220,20,60)
//gold	#FFD700	(255,215,0)