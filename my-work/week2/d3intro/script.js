console.log("js loaded");

// console.log(document.getElementById("viz-container"));

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 600)
;

viz.attr("height", 400);

let myCircle = viz.append("circle")
    .attr("cx", 450)
    .attr("cy", 200)
    .attr("r", 20)
;

myCircle.attr("fill", "white");

let myRect = viz.append("rect")
    .attr("x", 300)
    .attr("y", 100)
    .attr("width", 20)
    .attr("height", 100)
;
myRect.attr("fill", "green")
    .attr("stroke", "#ff00ff")
    .attr("stroke-width", 5)
;

let myEllipse = viz.append("ellipse")
    .attr("cx", 450)
    .attr("cy", 100)
    .attr("rx", 50)
    .attr("ry", 10)
;

myEllipse.attr("fill", "red");

let myLine = viz.append("line")
    .attr("x1", 10)
    .attr("x2", 550)
    .attr("y1", 10)
    .attr("y2", 350)
;

myLine.attr("stroke", "blue")
    .attr("stroke-width", 10)
;

let myData1 = [4, 6, 8, 2, 9];
let myData2 = [8, 1, 5];

function xLocation(datapoint) {
  return datapoint * 50; // random number between 0 and 500
}

function chooseColor(datapoint){
  if (datapoint == "4") {
    return "red";
  } else if (datapoint == "6") {
    return "orange";
  } else if (datapoint == "8") {
    return "yellow";
  } else if (datapoint == "2") {
    return "darkorange";
  } else if (datapoint == "9") {
    return "pink";
  } else if (datapoint == "1") {
    return "green"
  } else if (datapoint == "5") {
    return "lightgreen"
  }
}

function strokeWidth(datapoint) {
  return datapoint;
}
function width(datapoint) {
  return datapoint * 20;
}
function height(datapoint) {
  return datapoint * 15;
}

viz.selectAll("circles").data(myData1).enter()
  .append("circle")
    .attr("cx", xLocation)
    .attr("cy", 180)
    .attr("r", 20)
    .attr("fill", chooseColor)
    .attr("stroke", "black")
    .attr("stroke-width", strokeWidth)
;

viz.selectAll("rectangle").data(myData2).enter()
  .append("rect")
    .attr("x", xLocation)
    .attr("y", 250)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", chooseColor)
    .attr("stroke", "white")
    .attr("stroke-width", strokeWidth)
;

d3.json("data.json").then(gotData);

function gotData(incomingData) {
  console.log(incomingData);
  viz.selectAll("circleData").data(incomingData).enter()
    .append("circle")


}
