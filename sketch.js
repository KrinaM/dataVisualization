// JavaScript Document
/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows, rows2; // , minX, maxX, minY, maxY;
var detectors = [];
var detectorsImage;

var heightCanvas = 1200;
var widthCanvas =  1200;
var widthMap = widthCanvas * .45;
var heightMap = heightCanvas * .45;
// var widthBar = widthCanvas * .8;
var heightTable = widthCanvas * .45;
var widthTable = heightCanvas * .45;
var margin = widthCanvas * .05;
var bin = widthTable / 34.0;


function preload() {
  table = loadTable("det120uniqM.csv","csv","header"); // det199uniq.csv
  rows = table.getRows();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  table2 = loadTable("obs10det.csv","csv","header")
  rows2 = table2.getRows();
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
    detectorsImage.fill(0,160,160,160);
    detectorsImage.ellipse(selecDetector.X, selecDetector.Y, 10, 10);
    detectors.push(selecDetector);
  }
  translate(widthCanvas-widthTable-margin, 0)
  rect(0, 0, widthTable, heightTable)
  for (var i=1; i<34; i++ ) {
    line(i*bin, 0, i*bin, heightTable)
  }
  
}

function draw() {
    image(detectorsImage, 0, 0);
}

var detector = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
/*  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
*/
  this.Y = map(this.longitude, 50.72422, 50.98837, widthMap, 0); // 50.86, 51
  this.X = map(this.lattitude, 4.013617, 4.923672, 0, heightMap); // 4, 4.6
};



/*
function mouseMoved() {
  redraw()
  return false;
}

*/
