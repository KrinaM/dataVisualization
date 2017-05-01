// JavaScript Document
/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows, rows2; // , minX, maxX, minY, maxY;
var detectors = [];
var selecDetectors = [];
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
  table3 = loadTable("BRUdataSEL.csv","csv","header") // selected detectors all data
  rows3 = table3.getRows();

var data = new Array(6); // SOS 3145 exei 1843
for (var i = 0; i <6; i++){
    data[i] = new Array(5); // march has 22, october has 22 days
    for (var j = 0; j< 5; j++) {
        data[i][j] = new Array(10);
        for (var k = 0; k<10 ; k++) {
            data[i][j][k] = new Array(180);
        };
    };
};

/*for (var i = 0; i<6; i++){
    for (var j = 0; j<5; j++){
        for (var k = 0; k <180){
            data[i][j][k] = table3.rows3.getNum("Vt")
}}} */
console.log(data);

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
  //  console.log(detectors);
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
    selecDetectors.push(selecDetector);
  }

// Table for 6 selected locations
  translate(widthCanvas-widthTable-margin, margin)
  rect(0, 0, widthTable, heightTable)
  for (var i=1; i<34; i++ ) {
    line(i*bin, 0, i*bin, heightTable)
  }
  for (var j=5; j<20; j++ ) {
    text(j + ":00", -margin*.5, (j-5)*heightTable/14);
    textSize(10);
  }
  
// 
  
  
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
  this.vht = function()
};

var variable = function(row) {
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  
  
}

/*
var detectorTable = function(array) {
//  this.longitude = row.getNum("Y");
//  this.lattitude = row.getNum("X");
//  this.ID = row.getString("UNIEKEID");

for (var LOC = 1; LOC < 6; LOC++) {  
    for (var DAY = 1; DAY < 31; DAY++) {  
        this.Vht = array.getNum("Vht");
        this.It = row.getNum("It");
        this.Bt = row.getNum("Bt");
    }
}

  this.Y = map(this.longitude, 50.72422, 51, widthMap, 0); // 50.86, 51
  this.X = map(this.lattitude, 3.98, 4.9237, 0, heightMap); // 4, 4.6 4.013617, 4.923672
};
*/

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
