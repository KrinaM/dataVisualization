/* P5 Implementation of Traffic Data Visualization
Authors: Krina Menounou, Danai Kafetzaki, Michael Christidis
*/

var table, rows;
var airports;
var detector;

var heightCanvas = 400;
var widthCanvas =  1600;
var widthMap = widthCanvas * .6;
var widthBar = widthCanvas * .8;

var detector = function(row) {
  this.longitude = row.getNum("X");
  this.lattitude = row.getNum("Y");
}

function preload() {
  table = loadTable("DataMerged.csv","csv","header");
  rows = table.getRows();
}

function setup() {
}

function draw() {

}


function mouseMoved() {
  redraw()
  return false;
}
