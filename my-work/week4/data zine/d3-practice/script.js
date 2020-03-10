let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
;

d3.json("data.json").then(gotData);

function gotData(incomingData) {
  console.log(incomingData);



  //create <g> for data
  let groupElements = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", translatePosition)
  ;



  // mood before rects
  groupElements.append("polygon")
      .attr("points", chooseMoodbPoint)
      .attr("stroke", "#000")
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 3})
      .attr("fill", chooseMoodbColor)
  ;
  // mood after rects
  groupElements.append("polygon")
      .attr("points", chooseMoodaPoint)
      .attr("stroke", "#000")
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 3})
      .attr("fill", chooseMoodaColor)
  ;
  // main circle
  groupElements.append("circle")
      .attr("r", chooseRadius)
      .attr("stroke", chooseStrokeColor)
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 3 : 4})
      .attr("fill", chooseColor)
  ;

  // phone square
  groupElements.append("rect")
      .attr("width", chooseWidthS)
      .attr("height", chooseHeightS)
      .attr("x", chooseOffsetX)
      .attr("y", chooseOffsetY)
      .attr("fill", function(d) { return (d.phone == true) ? "#c9c9ff" : "none"})
      .attr("stroke", function(d) { return (d.phone == true) ? "#000" : "none"})
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 3})
  ;



  // fun category
  // Formal
  groupElements.append("polygon")
      .attr("points", shapeFormal)
      .attr("stroke", "lightgrey")
      .attr("stroke-width", 2)

  ;
  groupElements.append("polygon")
      .attr("points", shapeFormal2)
      .attr("stroke", "lightgrey")
      .attr("stroke-width", 2)
  ;

  // ingredients triangle
  let ingredientsGroup = groupElements.append("g");
  ingredientsGroup.selectAll(".trigroup").data(function(d){return d.ingredients}).enter()
    .append("polygon")
      .attr("class", "trigroup")
      .attr("points", chooseTriPoint)
      .attr("stroke", "#000")
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 3})
      .attr("fill", function(d) { return d.color })
  ;

  // ingredients proportion rects
  ingredientsGroup.selectAll(".rectgroup").data(function(d) { return d.ingredients}).enter()
    .append("rect")
      .attr("x", chooseRectX)
      .attr("y", 50)
      .attr("width", chooseRectWidth)
      .attr("height", function(d) { return d.amount })
      .attr("fill", function(d) { return d.color })
      .attr("stroke", "black")
      .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 2.5})


}

function translatePosition(d) {
  let x = 0, y = 0;
  type = d.type;
  day = d.day;
  if (d.day <= 3) {
    y = (day - 0.3) * 200;
    if (type == "Breakfast") {
      x = 175;
    } else if (type == "Lunch") {
      x = 375;
    } else if (type == "Dinner") {
      x = 600;
    }
  } else {
    y = (day - 3 - 0.3) * 200;
    if (type == "Breakfast") {
      x = 825;
    } else if (type == "Lunch") {
      x = 1025;
    } else if (type == "Dinner") {
      x = 1250;
    }
  }
  return "translate(" + x + "," + y + ")";
}

function chooseRadius(d) {
  data = d.size;
  if (data == "Small") {
    return 20;
  } else if (data == "Medium") {
    return 30;
  } else if (data == "Big") {
    return 40;
  }
}

function chooseColor(d) {
  data = d.maker;
  if (data == "Dad") {
    return "#4a67e8"
  } else if (data == "Mom and Dad") {
    return "#bb4ae8"
  } else if (data == "I") {
    return "#e5e84a"
  } else if (data == "Mom") {
    return "#ff4545"
  } else if (data == "Dad and I") {
    return "#4ae877"
  }
}
function chooseStrokeColor(d) {
  type = d.type;
  if (type == "Breakfast") {
    return "#1f4000";
  } else if (type == "Lunch") {
    return "#540000";
  } else if (type == "Dinner") {
    return "#000354";
  }
}


function chooseOffsetX(d) {
  data = d.size;
  if (data == "Small") {
    return - 12 * 1.5;
  } else if (data == "Medium") {
    return - 18 * 1.5;
  } else if (data == "Big") {
    return - 24 * 1.5;
  }
}
function chooseOffsetY(d) {
  data = d.size;
  if (data == "Small") {
    return - 12 * 1.9;
  } else if (data == "Medium") {
    return - 18 * 1.9;
  } else if (data == "Big") {
    return - 24 * 1.9;
  }
}

function chooseWidthS(d) {
  data = d.size;
  if (data == "Small") {
    return 12;
  } else if (data == "Medium") {
    return 18;
  } else if (data == "Big") {
    return 24;
  }
}
function chooseHeightS(d) {
  data = d.size;
  if (data == "Small") {
    return 18;
  } else if (data == "Medium") {
    return 27;
  } else if (data == "Big") {
    return 36;
  }
}

function chooseMoodbPoint(d) {
  data = d.moodb;
  size = d.size;
  if (size == "Small") {
    s = 2;
  } else if (size == "Medium") {
    s = 3;
  } else if (size == "Big") {
    s =  4;
  }
  if (data == "High") {
    return -8 * s + "," + -10 * s + " " + -2 * s + "," + -5.5 * s + " " + -6.5 * s + "," + 0.5 * s + " " + -12.5 * s + "," + -4 * s;
  } else if (data == "Neutral"){
    return -13 * s + "," + 4 * s + " " + 3 * s + "," + 4 * s + " " + 3 * s + "," + -4 * s + " " + -13 * s + "," + -4 * s;
  } else if (data == "Low") {
    return -8 * s + "," + 10 * s + " " + -2 * s + "," + 5.5 * s + " " + -6.5 * s + "," + -0.5 * s + " " + -12.5 * s + "," + 4 * s;
  }
}

function chooseMoodbColor(d) {
  data = d.moodb;
  if (data == "High") {
    return "#f75cbc";
  } else if (data == "Neutral"){
    return "#55e6a9";
  } else if (data == "Low") {
    return "#302e85";
  }
}


function chooseMoodaPoint(d) {
  data = d.mooda;
  size = d.size;
  if (size == "Small") {
    s = 2;
  } else if (size == "Medium") {
    s = 3;
  } else if (size == "Big") {
    s =  4;
  }
  if (data == "High") {
    return 8 * s + "," + -10 * s + " " + 2 * s + "," + -5.5 * s + " " + 6.5 * s + "," + 0.5 * s + " " + 12.5 * s + "," + -4 * s;
  } else if (data == "Neutral"){
    return 13 * s + "," + 4 * s + " " + -3 * s + "," + 4 * s + " " + -3 * s + "," + -4 * s + " " + 13 * s + "," + -4 * s;
  } else if (data == "Low") {
    return 8 * s + "," + 10 * s + " " + 2 * s + "," + 5.5 * s + " " + 6.5 * s + "," + -0.5 * s + " " + 12.5 * s + "," + 4 * s;
  }
}

function chooseMoodaColor(d) {
  data = d.mooda;
  if (data == "High") {
    return "#f75cbc";
  } else if (data == "Neutral"){
    return "#55e6a9";
  } else if (data == "Low") {
    return "#302e85";
  }
}

function shapeFormal(d) {
  if (d.category == "Formal") {
    return "-5,45 -5,35 -25,30 -30,35 -30,45 -25,50 -5,45 -3,47 3,47 5,45 25,50 30,45 30,35 25,30 5,35 -5,35 -3,33 3,33 5,35 5,45"
  }
}
function shapeFormal2(d) {
  if (d.category == "Formal") {
    return "-5,45 -5,35 5,35 5,45"
  }
}


function chooseTriPoint(d) {
  let xl, yl, xr, yr, xt, yt;

  size = d.size;
  if (size == "Small") {
    s = 2;
  } else if (size == "Medium") {
    s = 3;
  } else if (size == "Big") {
    s = 4;
  }
  offset = d.no * 3;
  offset = offset * s;
  xl = - 6  * s + offset;
  yl = -5  * s + offset;
  xr = 0 * s + offset;
  yr = -5 * s + offset;
  xt = -3 * s + offset;
  yt = -10 * s + offset;
  pointL = xl + "," + yl;
  pointR = xr + "," + yr;
  pointT = xt + "," + yt;
  return  pointL + " " + pointR + " " + pointT;
}

function chooseRectX(d) {
  size = d.size;
  if (size == "Small") {
    s = 2;
  } else if (size == "Medium") {
    s = 3;
  } else if (size == "Big") {
    s = 4;
  }
  offset = d.no * 3;
  return - 6  * s + offset * s;
}
function chooseRectWidth(d) {
  size = d.size;
  if (size == "Small") {
    s = 2;
  } else if (size == "Medium") {
    s = 3;
  } else if (size == "Big") {
    s = 4;
  }
  return 4  * s;
}
