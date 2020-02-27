console.log("js loaded");

// console.log(document.getElementById("viz-container"));

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
;

d3.json("data.json").then(gotData);

function gotData(incomingData) {
  console.log(incomingData);

  let enterSelection = viz.selectAll("circleData").data(incomingData).enter();

  console.log(enterSelection);
  enterSelection
    .append("circle")
      .attr("cx", chooseX)
      .attr("cy", chooseY)
      .attr("r", chooseRadius)
      .attr("stroke", "#000")
      .attr("stroke-width", 5)
      .attr("fill", chooseColor)
;

  enterSelection
    .append("rect")
      .attr("x", chooseXs)
      .attr("y", chooseYs)
      .attr("width", chooseRadiusS)
      .attr("height", chooseRadiusS)
      .attr("fill", function(d) { return (d.phone == true) ? "blue" : "lightblue"})
      .attr("stroke", "#000")
      .attr("stroke-width", 3)
;

  var rectGroups = viz.selectAll(".rectGroups").data(incomingData).enter()
  	.append("g")
;

  var rects = rectGroups.selectAll(".rects").data(function(d){ return d.ingredients}).enter()
  	.append("rect")
      .attr("x", chooseXr)
      .attr("y", chooseYr)
      .attr("width", 90)
      .attr("height", 15)
      .attr("fill", function(d) {
        return d.color;
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .on("mouseover", showIngredient)
      .on("mouseout", hideIngredient)
;
  var words = rectGroups.selectAll(".rects").data(function(d){ return d.ingredients}).enter()
    .append("text")
      .attr("x", chooseXr)
      .attr("y", chooseYt)
      .attr("font-size", 15)
      .text(function(d) {
        return d.food;
      })
      .attr("fill", function(d) {
        return d.color;
      })
      .attr("stroke", function(d) {
        return d.color;
      })
      .attr("stroke-width", 0.5)
      .attr("id", giveID)
      .attr("style", "display:none");



}

function chooseRadius(data) {
  datapoint = data.size;
  if (datapoint == "Small") {
    return 20;
  } else if (datapoint == "Medium") {
    return 30;
  } else if (datapoint == "Big") {
    return 40;
  }
}

function chooseX(data) {
  datapoint = data.type;
  if (datapoint == "Breakfast") {
    return 50;
  } else if (datapoint == "Lunch") {
    return 275;
  } else if (datapoint == "Dinner") {
    return 500;
  }
}
function chooseY(data) {
  datapoint = data.day;
  return (datapoint-0.8) * 250;
}
function chooseColor(data) {
  datapoint = data.maker;
  if (datapoint == "Dad") {
    return "#243fd6"
  } else if (datapoint == "Mom and Dad") {
    return "#9a02db"
  } else if (datapoint == "I") {
    return "#e3d342"
  }
}



function chooseXs(data) {
  r = data.size;
  if (r == "Small") {
    rr =  20;
  } else if (r == "Medium") {
    rr =  30;
  } else if (r == "Big") {
    rr =  40;
  }
  datapoint = data.type;
  if (datapoint == "Breakfast") {
    xx =  50;
  } else if (datapoint == "Lunch") {
    xx =  275;
  } else if (datapoint == "Dinner") {
    xx =  500;
  }
  d = xx - rr;
  return d;
}

function chooseYs(data) {
  r = data.size;
  if (r == "Small") {
    rr =  20;
  } else if (r == "Medium") {
    rr =  30;
  } else if (r == "Big") {
    rr =  40;
  }
  datapoint = data.day;
  yy =  (datapoint-0.8) * 250;
  d = yy - rr;
  return d;
}
function chooseRadiusS(data) {
  datapoint = data.size;
  if (datapoint == "Small") {
    return 12;
  } else if (datapoint == "Medium") {
    return 18;
  } else if (datapoint == "Big") {
    return 24;
  }
}


function chooseXr(data) {
  datapoint = data.type;
  if (datapoint == "Breakfast") {
    return 20;
  } else if (datapoint == "Lunch") {
    return 240;
  } else if (datapoint == "Dinner") {
    return 460;
  }
}

function chooseYr(data) {
  datapoint = data.day;
  offset = data.no;
  return (datapoint - 0.6) * 250 + offset * 20;
}

function chooseYt(data) {
  datapoint = data.day;
  offset = data.no;
  return (datapoint - 0.6) * 250 + offset * 20 + 13;
}

function giveID(d) {
  console.log((d.type).toString() + (d.day).toString() + (d.no).toString());
  return (d.type).toString() + (d.day).toString() + (d.no).toString();
}

function showIngredient(d) {
  id =  "#" + (d.type).toString() + (d.day).toString() + (d.no).toString();
  d3.select(id).attr("style", "display:block");
  d3.select(this).attr("fill", "black");
}

function hideIngredient(d) {
  id =  "#" + (d.type).toString() + (d.day).toString() + (d.no).toString();
  d3.select(id).attr("style", "display:none");
  d3.select(this).attr("fill", function(d) {
    return d.color;
  })

}
