console.log("js loaded");

// console.log(document.getElementById("viz-container"));

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 600)
;


let myData = [4, 6, 8, 2, 9];

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
  }
}

function strokeWidth(datapoint) {
  return datapoint;
}

viz.selectAll("circles").data(myData).enter()
  .append("circle")
    .attr("cx", xLocation)
    .attr("cy", 180)
    .attr("r", 20)
    .attr("fill", chooseColor)
    .attr("stroke", "black")
    .attr("stroke-width", strokeWidth)
;


d3.json("data.json").then(gotData);

function gotData(incomingData) {
  console.log(incomingData);
  viz.selectAll("circleData").data(incomingData).enter()
    .append("circle")


}
