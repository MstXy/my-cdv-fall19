console.log("js loaded");

// console.log(document.getElementById("viz-container"));

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
;

// mood edge-rounded square
viz
  .append("rect")
    .attr("x", 700)
    .attr("y", 375)
    .attr("width", 50)
    .attr("height", 50)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("stroke-width", 5)
    .attr("stroke", "black")
    .attr("fill", "#f75cbc")
    .attr("id", "moodBlockH")
    .on("click", showLine1)
    .on("mouseover", mouseoverBtn)
    .on("mouseout", mouseoutBtn)
;
viz
  .append("rect")
    .attr("x", 700)
    .attr("y", 500)
    .attr("width", 50)
    .attr("height", 50)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("stroke-width", 5)
    .attr("stroke", "black")
    .attr("fill", "#55e6a9")
    .attr("id", "moodBlockN")
    .on("click", showLine2)
    .on("mouseover", mouseoverBtn)
    .on("mouseout", mouseoutBtn)
;
viz
  .append("rect")
    .attr("x", 700)
    .attr("y", 625)
    .attr("width", 50)
    .attr("height", 50)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("stroke-width", 5)
    .attr("stroke", "black")
    .attr("fill", "#302e85")
    .attr("id", "moodBlockL")
    .on("click", showLine3)
    .on("mouseover", mouseoverBtn)
    .on("mouseout", mouseoutBtn)
;
//title
viz
  .append("text")
    .attr("x", 670)
    .attr("y", 175)
    .attr("font-size", 50)
    .text("Title")
;
viz
  .append("text")
    .attr("x", 670)
    .attr("y", 225)
    .attr("font-size", 50)
    .text("Here")
;

d3.json("data.json").then(gotData);

function gotData(incomingData) {
  console.log(incomingData);

  let enterSelection = viz.selectAll("circleData").data(incomingData).enter();

  console.log(enterSelection);
  // circle
  enterSelection
    .append("circle")
      .attr("cx", chooseX)
      .attr("cy", chooseY)
      .attr("r", chooseRadius)
      .attr("stroke", "#000")
      .attr("stroke-width", 5)
      .attr("fill", chooseColor)
;

  // phone square
  enterSelection
    .append("rect")
      .attr("x", chooseXs)
      .attr("y", chooseYs)
      .attr("width", chooseRadiusS)
      .attr("height", chooseRadiusS)
      .attr("fill", function(d) { return (d.phone == true) ? "blue" : "#c9c9ff"})
      .attr("stroke", "#000")
      .attr("stroke-width", 3)
;

  // moodb line
  enterSelection
    .append("line")
      .attr("x1", chooseX)
      .attr("y1", chooseY)
      .attr("x2", 725)
      .attr("y2", chooseYl)
      .attr("stroke-width", 4)
      .attr("stroke", "black")
      .attr("stroke-dasharray", "20, 5")
      .attr("stroke-linecap", "round")
      .attr("style", "display: none")
      .attr("id", giveLineID)
;




  var rectGroups = viz.selectAll(".rectGroups").data(incomingData).enter()
  	.append("g")
;

  var rects = rectGroups.selectAll(".rects").data(function(d){ return d.ingredients}).enter()
  	.append("rect")
      .attr("x", chooseXr)
      .attr("y", chooseYr)
      .attr("width", function(d) { return d.amount * 2 })
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
        if (d.color == "Black") {
          return "white";
        } else {
          return d.color;
        }
      })
      .attr("stroke-width", 0.5)
      .attr("id", giveID)
      .attr("style", "display:none")
;





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
  if (data.day <= 3) {
    if (datapoint == "Breakfast") {
      return 50;
    } else if (datapoint == "Lunch") {
      return 275;
    } else if (datapoint == "Dinner") {
      return 500;
    }
  } else {
    if (datapoint == "Breakfast") {
      return 925;
    } else if (datapoint == "Lunch") {
      return 1150;
    } else if (datapoint == "Dinner") {
      return 1375;
    }
  }
}
function chooseY(data) {
  datapoint = data.day;
  if (datapoint <= 3) {
    return (datapoint-0.8) * 250;
  } else {
    return (datapoint-3-0.8) * 250;
  }

}
function chooseColor(data) {
  datapoint = data.maker;
  if (datapoint == "Dad") {
    return "#4a67e8"
  } else if (datapoint == "Mom and Dad") {
    return "#bb4ae8"
  } else if (datapoint == "I") {
    return "#e5e84a"
  } else if (datapoint == "Mom") {
    return "#ff4545"
  } else if (datapoint == "Dad and I") {
    return "#4ae877"
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
  xx = chooseX(data);
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
  // datapoint = data.day;
  // yy =  (datapoint-0.8) * 250;
  yy = chooseY(data);
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
  if (data.day <= 3) {
    if (datapoint == "Breakfast") {
      return 20;
    } else if (datapoint == "Lunch") {
      return 230;
    } else if (datapoint == "Dinner") {
      return 450;
    }
  } else {
    if (datapoint == "Breakfast") {
      return 900;
    } else if (datapoint == "Lunch") {
      return 1110;
    } else if (datapoint == "Dinner") {
      return 1330;
    }
  }

}

function chooseYr(data) {
  datapoint = data.day;
  offset = data.no;
  if (datapoint <= 3) {
    return (datapoint - 0.6) * 250 + offset * 20;
  } else {
    return (datapoint - 3 - 0.6) * 250 + offset * 20;
  }
}

function chooseYt(data) {
  datapoint = data.day;
  offset = data.no;
  if (datapoint <= 3) {
    return (datapoint - 0.6) * 250 + offset * 20 + 13;
  } else {
    return (datapoint - 3 - 0.6) * 250 + offset * 20 + 13;
  }

}

function giveID(d) {
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

function chooseYl(data) {
  datapoint = data.moodb;
  if (datapoint == "Low") {
    return 650;
  } else if (datapoint == "Neutral") {
    return 525;
  } else if (datapoint == "High"){
    return 400;
  }
}

lArray = [];
nArray = [];
hArray = [];
function giveLineID(d) {
  id = d.moodb + (d.no).toString();
  if (d.moodb == "Low") {
    lArray.push(id);
  } else if (d.moodb == "Neutral") {
    nArray.push(id);
  } else if (d.moodb == "High") {
    hArray.push(id);
  }
  return id;
}

btn1Clicked = false;
function showLine1() {
  if (!btn1Clicked) {
    for (var i = 0; i < hArray.length; i++) {
      id = "#" + hArray[i];
      d3.select(id).attr("style", "display:block");
    }
    btn1Clicked = true;
  } else {
    for (var i = 0; i < hArray.length; i++) {
      id = "#" + hArray[i];
      d3.select(id).attr("style", "display:none");
    }
    btn1Clicked = false;
  }
}

btn2Clicked = false;
function showLine2() {
  if (!btn2Clicked) {
    for (var i = 0; i < nArray.length; i++) {
      id = "#" + nArray[i];
      d3.select(id).attr("style", "display:block");
    }
    btn2Clicked = true;
  } else {
    for (var i = 0; i < nArray.length; i++) {
      id = "#" + nArray[i];
      d3.select(id).attr("style", "display:none");
    }
    btn2Clicked = false;
  }
}
btn3Clicked = false;
function showLine3() {
  if (!btn3Clicked) {
    for (var i = 0; i <lArray.length; i++) {
      id = "#" + lArray[i];
      d3.select(id).attr("style", "display:block");
    }
    btn3Clicked = true;
  } else {
    for (var i = 0; i < lArray.length; i++) {
      id = "#" + lArray[i];
      d3.select(id).attr("style", "display:none");
    }
    btn3Clicked = false;
  }
}

function mouseoverBtn() {
  d3.select(this).attr("fill", "lightgrey");
}
function mouseoutBtn() {
  console.log("mouseout");
  self = d3.select(this);
  if (this.id == "moodBlockH") {
    self.attr("fill", "#f75cbc");
  } else if (this.id == "moodBlockN") {
    self.attr("fill", "#55e6a9");
  } else if (this.id == "moodBlockL") {
    self.attr("fill", "#302e85");
  }
}
