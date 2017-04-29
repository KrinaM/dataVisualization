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
  this.longitude = row.getNum("X");
  this.lattitude = row.getNum("Y");
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  this.X = map(this.longitude,-180,180,0,widthMap);
  this.Y = map(this.lattitude,-90,90, heightCanvas,0);
}

function preload() {
  table = loadTable("DataMerged.csv","csv","header");
  rows = table.getRows();
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  for (var r = 0; r < rows.length; r++) {
    var thisDetector = new detector(rows[r]);
    detectorsImage.noStroke();
    detectorsImage.fill(160,160,160,160);
    detectorsImage.ellipse(thisDetector.X,thisDetector.Y, 3, 3);
    detectors.push(thisDetector);
  }
  
  console.log(rows[1])
  
  
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