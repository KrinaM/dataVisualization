/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows;
var detectors = [];

var heightCanvas = 400;
var widthCanvas =  1600;
var widthMap = widthCanvas * .6;
var widthBar = widthCanvas * .8;

var detector = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
/*  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
*/
  this.X = map(this.longitude,50.6, 51.5, 0, widthMap);
  this.Y = map(this.lattitude,2.5, 5.6, heightCanvas, 0);

}

function preload() {
  table = loadTable("DataMerged_short.csv","csv","header");
  rows = table.getRows();
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  for (var r = 0; r < rows.length; r+181) {
    var thisDetector = new detector(rows[r]);
    detectorsImage.noStroke();
    detectorsImage.fill(160,160,160,160);
    detectorsImage.ellipse(thisDetector.X, thisDetector.Y, 3, 3);
    detectors.push(thisDetector);
  }
  
  console.log(rows[1]);
  
  
}

function draw() {
    image(detectorsImage, 0, 0);
}

/*
function mouseMoved() {
  redraw()
  return false;
}

*/