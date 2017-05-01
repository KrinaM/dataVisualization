// JavaScript Document
/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows, rows2; // , minX, maxX, minY, maxY;
var detectors = [];
var detectorsImage;
var tableImage;

var heightCanvas = 1200;
var widthCanvas =  1200;
var widthMap = widthCanvas * .45;
var heightMap = heightCanvas * .45;
// var widthBar = widthCanvas * .8;
var heightTable = widthCanvas * .8;
var widthTable = heightCanvas * .45;
var margin = widthCanvas * .05;
var bin = widthTable / 34.0;

function preload() {
  table = loadTable("det120uniqM.csv","csv","header"); // all detectors unique obs
  rows = table.getRows();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  table2 = loadTable("det6uniq.csv","csv","header") // selected detectors unique obs
  rows2 = table2.getRows();
  table3 = LoadTable("BRUdataSEL.csv","csv","header") // selected detectors all data
  rows3 = table3.getRows();
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
  
//  all detectors inner ring
 for (var r = 0; r < rows.length; r++) {
    var thisDetector = new detector(rows[r]);
     /*   data.push(thisFlight.distance);  
    loc.push(0);
    loc.push(thisDetector.X);
    loc.push(thisDetector.Y);  */
    detectorsImage.noStroke();
    detectorsImage.fill(160,160,160,160);
    detectorsImage.ellipse(thisDetector.X, thisDetector.Y, 10, 10);
    detectors.push(thisDetector);
  }
    
// selected detectors
 for (var r = 0; r < rows2.length; r++) {
    var selecDetector = new detector(rows2[r]);
     /*   data.push(thisFlight.distance);  
    loc.push(0);
    loc.push(thisDetector.X);
    loc.push(thisDetector.Y);  */
    detectorsImage.noStroke();
    detectorsImage.fill(0,0,0,255); // orange: 255,128,0,255)
    detectorsImage.ellipse(selecDetector.X, selecDetector.Y, 10, 10);
    detectors.push(selecDetector);
  }
  
  translate(widthCanvas-widthTable-margin, margin)
  rect(0, 0, widthTable, heightTable)
  for (var i=1; i<34; i++ ) {
    line(i*bin, 0, i*bin, heightTable)
  }
  for (var j=5; j<20; j++ ) {
    text(j + ":00", -margin*.5, (j-5)*heightTable/14);
    textSize(10);
  }
}

function draw() {
    image(detectorsImage, 0, 200);
//    image(tableImage, 0, 0);

textSize(20);
fill(0, 102, 153);
text("1", 144, 746);
text("2", 149, 536);
text("3", 156, 425);
text("4", 232, 355);
text("5", 288, 442);
text("6", 298, 500);


}

var detector = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
/*  this.ID = row.getNum("UNIEKEID"); 
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
*/
  this.Y = map(this.longitude, 50.72422, 51, widthMap, 0); // 50.86, 51
  this.X = map(this.lattitude, 3.98, 4.9237, 0, heightMap); // 4, 4.6 4.013617, 4.923672
};

/*var tableImage = function(row3) {
    this.Vt = row.getNum("Vt");
    this.Day = row.getNum("DAY");
    this.Time = row.getNum("TIME");   
}
*/      
 

/*
function mouseMoved() {
  redraw()
  return false;
}

*/
