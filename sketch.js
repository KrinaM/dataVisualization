/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows, rows2; // , minX, maxX, minY, maxY;
var detectors = [];
var detectorsImage;

<<<<<<< HEAD
var heightCanvas = 1200;
var widthCanvas =  1200;
var widthMap = widthCanvas * .5;
var heightMap = heightCanvas * .5;
// var widthBar = widthCanvas * .8;

function preload() {
  table = loadTable("det120uniqM.csv","csv","header"); // det199uniq.csv
=======
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
  this.X = map(this.longitude,50.8, 51, 0, widthMap);
  this.Y = map(this.lattitude,4, 4.6, heightCanvas, 0);

}

function preload() {
  table = loadTable("obs10det.csv","csv","header");
>>>>>>> 9de03dc16e207238da215d2737b6205c578e7ded
  rows = table.getRows();
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  
  table2 = loadTable("obs10det.csv","csv","header")
  rows2 = table2.getRows();
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
<<<<<<< HEAD
  
//  all detectors inner ring
 for (var r = 0; r < rows.length; r++) {
 
=======
  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  for (var r = 0; r < rows.length; r++) {
>>>>>>> 9de03dc16e207238da215d2737b6205c578e7ded
    var thisDetector = new detector(rows[r]);
    
     /*   data.push(thisFlight.distance);  
    loc.push(0);
    loc.push(thisDetector.X);
    loc.push(thisDetector.Y);  */
 
    detectorsImage.noStroke();
    detectorsImage.fill(160,160,160,160);
<<<<<<< HEAD
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
    
=======
    detectorsImage.ellipse(thisDetector.X, thisDetector.Y, 6, 6);
    detectors.push(thisDetector);
  }
>>>>>>> 9de03dc16e207238da215d2737b6205c578e7ded
//  console.log(rows[1]);
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
