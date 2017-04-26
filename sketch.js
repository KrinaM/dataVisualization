/* P5 Assignment
Author: Krina Menounou
*/

var table, rows;
var airports;
var flights = [];

var heightCanvas = 400;
var widthCanvas =  1600;
var widthMap = widthCanvas * .6;
var widthBar = widthCanvas * .8;

var flight = function(row) {
  this.distance = row.getNum("distance");
  this.from_long = row.getNum("from_long");
  this.from_lat = row.getNum("from_lat");
  this.departureX = map(this.from_long,-180,180,0,widthMap);
  this.departureY = map(this.from_lat,-90,90, heightCanvas,0);
}

function preload() {
  table = loadTable("flights.csv","csv","header");
  rows = table.getRows();
}

function setup() {
  createCanvas(widthCanvas, heightCanvas);
  noLoop();
  airportsImage = createGraphics(widthCanvas, heightCanvas);
  for (var r = 0; r < rows.length; r++) {
    var thisFlight = new flight(rows[r]);
    airportsImage.noStroke();
    airportsImage.fill(160,160,160,160);
    airportsImage.ellipse(thisFlight.departureX,thisFlight.departureY, 3, 3);
    flights.push(thisFlight);
  }
  data = countFreq(table.getColumn('distance'));
  bd = barchart(); 
}

function draw() {
  image(airportsImage, 0, 0);
  for (var i=0; i<(data.freq).length; i++) {
    push();
    translate(i*bd[i][2],0)
    if (mouseX >= bd[i][0]+ widthMap + i*bd[i][2] && mouseX <bd[i][0]+ widthMap + i*bd[i][2]+bd[i][2]) {
      fill('red'); noStroke();
      for (var j=0; j<flights.length; j++) {
        if (flights[j].distance >= i*data.bin && flights[j].distance < i*data.bin+data.bin) {
          airportsImage.fill('red'); 
          airportsImage.noStroke();
        } else {
          airportsImage.fill(160,160,160,160); 
          airportsImage.noStroke();
        }
        airportsImage.ellipse(flights[j].departureX,flights[j].departureY, 3, 3);
      }
    } else {
      fill('steelblue'); noStroke();
    }
    rect(widthMap+bd[i][0], bd[i][1], bd[i][2], bd[i][3]);
    pop();
  }
}


function mouseMoved() {
  redraw()
  return false;
}
function barchart() {
  data = countFreq(table.getColumn('distance'));
  translate(widthMap, 0);
  var margin = widthBar * 0.05;
  var r = [];
  // Defining the bars of our graphic 
  var barWidth =  (widthCanvas / (data.freq).length) * .35; 

  // We go over all data points
  for(var i=0; i<(data.freq).length; i++) {
    push();
    // We jump to the bottom left corner of the bar
    translate(i * barWidth, 0); 
    fill('steelblue'); noStroke();
    var barHeight = map(data.freq[i], min(data.freq), max(data.freq),  0, -heightCanvas) 
    rect(margin, heightCanvas, barWidth, barHeight);
    r[i] = [margin, heightCanvas, barWidth, barHeight];
    pop();
  }
  return r;
}


function countFreq(arr) {
  var nbins = 60; // number of bins for the histogram
  var hist = []; // array to count frequencies
  for (var i = 0; i < nbins; i++) hist[i] = 0; // initialize array
  var bin = Math.round((max(arr) - min(arr))/hist.length); // bin length
  for (i=0; i<arr.length; i++) {
    for (j=0; j<hist.length; j++) {
      if ( arr[i]<(j+1)*bin && arr[i]>=j*bin ) hist[j]++;
    }
  }
  return {freq: hist, nbins: nbins, bin: bin};
}
