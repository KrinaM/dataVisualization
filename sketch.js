/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows, rows2; // , minX, maxX, minY, maxY;
var detectors = [];
var selecDetectors = [];
var allDetectors = [];
var detectorsImage;
var tableImage;

var heightCanvas = 1200;
var widthCanvas = 1200;
var widthMap = widthCanvas * .45;
var heightMap = heightCanvas * .45;
// var widthBar = widthCanvas * .8;
var heightTable = widthCanvas * .8;
var widthTable = heightCanvas * .45;
var margin = widthCanvas * .05;

var dayDet = [
  [],
  [],
  [],
  [],
  [],
  [],
];

var Vht = [];
var det = [];

var numDet = 6; // number of selected detectors
var numBar = numDet * 5 + numDet - 1; // number of vertical bars
var bin = widthTable / numBar;
var heightHour = heightTable / 15;


//var col = new Array(new Array(new Array()));
var col = new Array(numDet); // SOS 3145 exei 1843
for (var i = 0; i < numDet; i++) {
  col[i] = new Array(44); // march has 22, october has 22 days
  for (var j = 0; j < 44; j++) {
    col[i][j] = new Array(180);
  }
}





// console.log(numBar)

function preload() {
  table = loadTable("det120uniqM.csv", "csv", "header"); // all detectors unique obs
  rows = table.getRows();

  detectorsImage = createGraphics(widthCanvas, heightCanvas);
  table2 = loadTable("det6uniq.csv", "csv", "header"); // selected detectors unique obs
  rows2 = table2.getRows();
  table3 = loadTable("BRUdataSEL.csv", "csv", "header"); // selected detectors all data
  rows3 = table3.getRows();

  /*var data = new Array(6); // SOS 3145 exei 1843
    for (var i = 0; i < 6; i++) {
      data[i] = new Array(5); // march has 22, october has 22 days
      for (var j = 0; j < 5; j++) {
        data[i][j] = new Array(10);
        for (var k = 0; k < 10; k++) {
          data[i][j][k] = new Array(180);
        };
      };
    };
  */
  /*for (var i = 0; i<6; i++){
      for (var j = 0; j<5; j++){
          for (var k = 0; k <180){
              data[i][j][k] = table3.rows3.getNum("Vt")
  }}} */
  //console.log(data);

}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();

  //  all detectors inner ring
  for (var r = 0; r < rows.length; r++) {
    var thisDetector = new detector(rows[r]);
    detectorsImage.noStroke();
    detectorsImage.fill(160, 160, 160, 160);
    detectorsImage.ellipse(thisDetector.X, thisDetector.Y, 10, 10);
    detectors.push(thisDetector);
  }

  // selected detectors
  for (var r = 0; r < rows2.length; r++) {
    var selecDetector = new detector(rows2[r]);
    detectorsImage.noStroke();
    if (r == 0) {
      detectorsImage.fill(160, 82, 45, 255);
    } else if (r == 1) {
      detectorsImage.fill(255, 140, 0, 255);
    } else if (r == 2) {
      detectorsImage.fill(46, 139, 87, 255);
    } else if (r == 3) {
      detectorsImage.fill(148, 0, 211, 255);
    } else if (r == 4) {
      detectorsImage.fill(65, 105, 225, 255);
    } else if (r == 5) {
      detectorsImage.fill(220, 20, 60, 255);
    } else {
      detectorsImage.fill(160, 160, 160, 160);
    }
    detectorsImage.ellipse(selecDetector.X, selecDetector.Y, 10, 10);
    selecDetectors.push(selecDetector);
  }

  for (var r = 0; r < rows3.length; r++) {
    var allDetector = new detector(rows3[r]);
    allDetectors.push(allDetector);
  }

  // console.log(allDetectors[0])

  for (var i = 0; i < numDet; i++) {
    det[i] = allDetectors.slice((i * 7920), (i + 1) * 7920);
  }
  //  console.log(det[0].length)

  for (var i = 0; i < 44; i++) {
    for (var j = 0; j < numDet; j++) {
      dayDet[j][i] = det[j].slice(i * 180, (i + 1) * 180);
      for (var k = 0; k < 180; k++) {
        col[j][i][k] = map(dayDet[j][i][k].Vht, 0, 167, 255, 50);
      }
    }
  }
  console.log(col[0][0][0]);
  //  console.log(dayDet[1][43].length);
  // console.log(min(allDetectors.Vht));
  //  console.log(dayDet[0][0][0].Vht);
  // Table for 6 selected locations
  translate(widthCanvas - widthTable - margin, margin);
  noStroke();
  rect(0, 0, widthTable, heightTable);
  for (var i = 1; i < numBar; i++) {
    line(i, 0, i * bin, heightTable);
  }
  text("Monday", 25, -5);
  text("Tuesday",130, -5);
  text("Wednesday",119.5+110, -5 );
  text("Thursday",119.5+110+110+5, -5 );
  text("Friday",119.5+110*3+10, -5 );

//console.log(130-widthTable/numBar+5)
  for (var j = 5; j < 20; j++) {
    text(j + ":00", -margin * .5, (j - 5) * heightTable / 14);
    textSize(10);
  }

  // sienna	#A0522D	(160,82,45,int)
  // dark orange	#FF8C00	(255,140,0) 
  // sea green	#2E8B57	(46,139,87)
  // 	dark violet	#9400D3	(148,0,211)
  // crimson	#DC143C	(220,20,60)
  //gold	#FFD700	(255,215,0)


}

function draw() {
  image(detectorsImage, 0, 200);
  //    image(tableImage, 0, 0);

  textSize(20);
  fill(0, 102, 153);
  text("2", 144, 746);
  text("3", 149, 536);
  text("5", 156, 425);
  text("4", 232, 355);
  text("1", 288, 442);
  text("6", 298, 500);

  translate(widthCanvas - widthTable - margin, margin);
  for (var j = 0; j < numBar; j++) {
    for (var i = 0; i < 180; i++) {
      if (j == 0 || j == 7 || j == 14 || j == 21 || j == 28) {
        fill(160, 82, 45, col[0][j][i]);
      } else if (j == 1 || j == 8 || j == 15 || j == 22 || j == 29) {
        fill(255, 140, 0, col[1][j][i]);
      } else if (j == 2 || j == 9 || j == 16 || j == 23 || j == 30) {
        fill(46, 139, 87, col[2][j][i]);
      } else if (j == 3 || j == 10 || j == 17 || j == 24 || j == 31) {
        fill(148, 0, 211, col[3][j][i]);
      } else if (j == 4 || j == 11 || j == 18 || j == 25 || j == 32) {
        fill(65, 105, 225, col[4][j][i]);
      } else if (j == 5 || j == 12 || j == 19 || j == 26 || j == 33) {
        fill(220, 20, 60, col[5][j][i]);
      } else {
        fill(255, 255, 255);
      }
      noStroke();
      rect(j * bin, i * heightHour / 12, bin, heightHour / 12);
    }
  }
}
//console.log(numBar)

var detector = function(row) {
  this.longitude = row.getNum("Y");
  this.lattitude = row.getNum("X");
  this.ID = row.getNum("UNIEKEID");
  this.Vht = row.getNum("Vht");
  this.It = row.getNum("It");
  this.Bt = row.getNum("Bt");
  this.Y = map(this.longitude, 50.72422, 51, widthMap, 0); // 50.86, 51
  this.X = map(this.lattitude, 3.98, 4.9237, 0, heightMap); // 4, 4.6 4.013617, 4.923672
  //  this.vht = function()
};

/*
function getValues(data) {
  var j=0;
  for (var i=0; i<data.length; i+=180) {
    Vht[j] = 
  }
}
*/


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