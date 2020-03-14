let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
;

//center circle
let centerCircle = viz
  .append("circle")
    .attr("cx", 1200)
    .attr("cy", 400)
    .attr("r", 285)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
;
//center circle decoration
viz
  .append("circle")
    .attr("cx", 1200)
    .attr("cy", 400)
    .attr("r", 10)
    .attr("fill", "#cc00ff")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
;

//GLOBAL ATTRIBUTES
x1 = 250;
x2 = 500;
x3 = 725;
y1 = 140;
y2 = 400;
y3 = 660;

s1 = 20  * 1.2;
s2 = 30 * 1.2;
s3 = 40 * 1.2;

// connection line
// start circle
circleXArray = [Math.cos(Math.PI / 168 * 125) * 150, Math.cos(Math.PI) * 150, Math.cos(Math.PI / 168 * 125) * 150, Math.cos(Math.PI / 168 * 43) * 150, Math.cos(0) * 150, Math.cos(Math.PI / 168 * 43) * 150];
circleYArray = [Math.sin(Math.PI / 168 * 125) * 150, Math.sin(Math.PI) * 150, -Math.sin(Math.PI / 168 * 125) * 150, -Math.sin(Math.PI / 168 * 43) * 150, Math.sin(0) * 150, Math.sin(Math.PI / 168 * 43) * 150];
for (var i = 0; i < 6; i++) {
  viz.append("circle")
    .attr("cx", 1200 + circleXArray[i])
    .attr("cy", 400 + circleYArray[i])
    .attr("r", 10)
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "black")
  ;
}
// mid line
linetipXArray = [1200 - 250, 1200 - 325, 1200 - 250, 1200 + 250, 1200 + 325, 1200 + 250];
linetipYArray = [y3, y2, y1, y1, y2, y3];
for (var i = 0; i < 6; i++) {
  viz.append("line")
    .attr("x1", linetipXArray[i])
    .attr("y1", linetipYArray[i])
    .attr("x2", 1200 + circleXArray[i])
    .attr("y2", 400 + circleYArray[i])
    .attr("stroke-width", 3)
    .attr("stroke", "black")
  ;
}
// extension line
linetipX_Array = [1200 - 250 - 50, 1200 - 325, 1200 - 250 - 50, 1200 + 250 + 50, 1200 + 325, 1200 + 250 + 50];
linetipYArray = [y3, y2, y1, y1, y2, y3];
for (var i = 0; i < 6; i++) {
  viz.append("line")
    .attr("x1", linetipXArray[i])
    .attr("y1", linetipYArray[i])
    .attr("x2", linetipX_Array[i])
    .attr("y2", linetipYArray[i])
    .attr("stroke-width", 3)
    .attr("stroke", "black")
  ;
}

// get original data
d3.json("data.json").then(gotData);

//transformData
function transformData(d) {
  // modify bowls
  for (var i = 0; i < d.length; i++) {
    num = d[i].bowls;
    bowl_list = [];
    for (var n = 0; n < num; n++) {
      list = {"bowl": n + 1, "total": num, "type": d[i].type, "day": d[i].day};
      bowl_list.push(list);
    }
    d[i].bowls = bowl_list;
  }
  // modify duration
  for (var i = 0; i < d.length; i++) {
    num = d[i].duration / 5;
    duration_list = [];
    for (var n = 0; n < num; n++) {
      list = {"duration": n + 1, "total": num, "type": d[i].type, "day": d[i].day};
      duration_list.push(list);
    }
    d[i].duration = duration_list;
  }
  // modify color
  for (var i = 0; i < d.length / 3; i++) {
    // "colors":[{"color": "red", "amount": "10"}, {"color": "red", "amount": "10"}];
    breakfast = d[i * 3].ingredients;
    lunch = d[i * 3 + 1].ingredients;
    dinner = d[i * 3 + 2].ingredients;
    day = d[i * 3].day;
    checkArray = [];
    colorArray = [];
    index = 0;
    for (var b = 0; b < breakfast.length; b++) {
      color = breakfast[b].color;
      amount = breakfast[b].amount;
      if (checkArray.indexOf(color) == -1) {
        dict = {};
        dict["color"] = color;
        dict["amount"] = amount;
        dict["day"] = day;
        index += 1
        dict["index"] = index;
        checkArray.push(color);
        colorArray.push(dict);
      }
      for (var n = 0; n < colorArray.length; n++) {
        if (color == colorArray[n].color) {
          colorArray[n].amount += amount;
        }
      }
    }
    for (var l = 0; l < lunch.length; l++) {
      color = lunch[l].color;
      amount = lunch[l].amount;
      if (checkArray.indexOf(color) == -1) {
        dict = {};
        dict["color"] = color;
        dict["amount"] = amount;
        dict["day"] = day;
        index += 1
        dict["index"] = index;
        checkArray.push(color);
        colorArray.push(dict);
      }
      for (var n = 0; n < colorArray.length; n++) {
        if (color == colorArray[n].color) {
          colorArray[n].amount += amount;
        }
      }
    }
    for (var di = 0; di < dinner.length; di++) {
      color = dinner[di].color;
      amount = dinner[di].amount;
      if (checkArray.indexOf(color) == -1) {
        dict = {};
        dict["color"] = color;
        dict["amount"] = amount;
        dict["day"] = day;
        index += 1
        dict["index"] = index;
        checkArray.push(color);
        colorArray.push(dict);
      }
      for (var n = 0; n < colorArray.length; n++) {
        if (color == colorArray[n].color) {
          colorArray[n].amount += amount;
        }
      }
    }
    for (var m = 0; m < colorArray.length; m++) {
      colorArray[m]["total"] = index;
    }
    d[i * 3]["colors"] = colorArray;
    d[i * 3 + 1]["colors"] = colorArray;
    d[i * 3 + 2]["colors"] = colorArray;
  }

  // false data starts here: feelsguiltyman
  // manipulate WHITE color
  for (var i = 0; i < d.length; i++) {
    for (var n = 0; n < d[i].colors.length; n++) {
      if (d[i].colors[n].color == "#fffaf0") {
        d[i].colors[n].amount *= 0.96;
      }
    }
  }
  return d;
}

function gotData(incomingData) {
  console.log(incomingData);

  let transformedData = transformData(incomingData);

  console.log(transformedData);

  //create <g> for data
  let groupElements = viz.selectAll(".datagroup").data(transformedData).enter()
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

  // duration
  let polyGroup = viz.selectAll(".polyGroup").data(transformedData).enter()
    .append("g")
      .attr("class", "polyGroup")
      .attr("transform", "translate(1200, 400)")
  ;

  polyGroup.selectAll(".durationPoly").data(function(d) {return d.duration}).enter()
    .append("polygon")
      .attr("class", "durationPoly")
      .attr("points", durationPoints)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("transform", transformPoly)
  ;

  // bowls
  let lineGroup = viz.selectAll(".lineGroup").data(transformedData).enter()
    .append("g")
      .attr("class", "lineGroup")
      .attr("transform", chooseBowlsLinePos)
  ;
  // base line
  lineGroup.append("line")
      .attr("x1", chooseLinePoint1)
      .attr("y1", 0)
      .attr("x2", chooseLinePoint2)
      .attr("y2", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
  ;
  // base circle 1
  lineGroup.append("circle")
      .attr("cx", chooseLinePoint1)
      .attr("cy", 0)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
  ;
  // base circle 2
  lineGroup.append("circle")
      .attr("cx", chooseLinePoint2)
      .attr("cy", 0)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
  ;
  // sep group
  let sepLineGroup = lineGroup.selectAll(".durationPoly").data(function(d) {return d.bowls}).enter();
  // sep line static
  sepLineGroup.append("line")
      .attr("x1", chooseSepLinePointX1)
      .attr("y1", chooseSepLinePointY)
      .attr("x2", chooseSepLinePointX2)
      .attr("y2", chooseSepLinePointY)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
  ;
  // sep line
  sepLineGroup.append("line")
      .attr("x1", chooseLinePoint2)
      .attr("y1", 0)
      .attr("x2", chooseSepLinePointX2)
      .attr("y2", chooseSepLinePointY)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
  ;
  // sep circle
  sepLineGroup.append("circle")
      .attr("cx", chooseSepLinePointX1)
      .attr("cy", chooseSepLinePointY)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
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

  // color
  let colorGroups = viz.selectAll(".colorGroup").data(transformedData).enter()
    .append("g")
      .attr("class", "colorGroup")
      .attr("transform", translateColorPosition)
  ;
  //color block
  colorGroups.selectAll(".colorBlock").data(function(d) {return d.colors}).enter()
    .append("polygon")
      .attr("class", "colorBlock")
      .attr("points", function(d) { return (d.day <= 3) ? "0,10 0,-10 8,-8 8,8" : "0,10 0,-10 -8,-8 -8,8"})
      .attr("fill", function(d) {return d.color})
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("transform", transformColorPoly)
  ;
  colorGroups.selectAll(".colorPptBlock").data(function(d) {return d.colors}).enter()
    .append("rect")
      .attr("class", "colorPptBlock")
      .attr("width", function(d) {return d.amount * 0.9})
      .attr("height", 20)
      .attr("fill", function(d) {return d.color})
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("transform", transformColorRect)
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

  // // ingredients triangle
  // let ingredientsGroup = groupElements.append("g");
  // ingredientsGroup.selectAll(".trigroup").data(function(d){return d.ingredients}).enter()
  //   .append("polygon")
  //     .attr("class", "trigroup")
  //     .attr("points", chooseTriPoint)
  //     .attr("stroke", "#000")
  //     .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 3})
  //     .attr("fill", function(d) { return d.color })
  // ;
  //
  // // ingredients proportion rects
  // ingredientsGroup.selectAll(".rectgroup").data(function(d) { return d.ingredients}).enter()
  //   .append("rect")
  //     .attr("x", chooseRectX)
  //     .attr("y", 50)
  //     .attr("width", chooseRectWidth)
  //     .attr("height", function(d) { return d.amount })
  //     .attr("fill", function(d) { return d.color })
  //     .attr("stroke", "black")
  //     .attr("stroke-width", function(d) { return (d.size == "Small") ? 2.5 : 2.5})
  //

}


function translatePosition(d) {
  let x = 0, y = 0;
  type = d.type;
  day = d.day;
  if (d.day <= 3) {
    if (d.day == 1) {
      y = y1;
    }else if (d.day == 2) {
      y = y2;
    }else if (d.day == 3) {
      y = y3;
    }
    // y = (day - 0.45) * 250;
    if (type == "Breakfast") {
      x = x3;
    } else if (type == "Lunch") {
      x = x2;
    } else if (type == "Dinner") {
      x = x1;
    }
  } else {
    if (d.day == 4) {
      y = y3;
    }else if (d.day == 5) {
      y = y2;
    }else if (d.day == 6) {
      y = y1;
    }
    // y = (day - 3 - 0.45) * 250;
    if (type == "Breakfast") {
      x = 2400 - x3;
    } else if (type == "Lunch") {
      x = 2400 - x2;
    } else if (type == "Dinner") {
      x = 2400 - x1;
    }
  }
  return "translate(" + x + "," + y + ")";
}

function chooseRadius(d) {
  data = d.size;
  if (data == "Small") {
    return s1;
  } else if (data == "Medium") {
    return s2;
  } else if (data == "Big") {
    return s3;
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
    return - 0.6 * s1 * 1.5;
  } else if (data == "Medium") {
    return - 0.6 * s2 * 1.5;
  } else if (data == "Big") {
    return - 0.6 * s3 * 1.5;
  }
}
function chooseOffsetY(d) {
  data = d.size;
  if (data == "Small") {
    return - 0.6 * s1 * 1.9;
  } else if (data == "Medium") {
    return - 0.6 * s2 * 1.9;
  } else if (data == "Big") {
    return - 0.6 * s3 * 1.9;
  }
}

function chooseWidthS(d) {
  data = d.size;
  if (data == "Small") {
    return 0.6 * s1;
  } else if (data == "Medium") {
    return 0.6 * s2;
  } else if (data == "Big") {
    return 0.6 * s3;
  }
}
function chooseHeightS(d) {
  data = d.size;
  if (data == "Small") {
    return 0.9 * s1;
  } else if (data == "Medium") {
    return 0.9 * s2;
  } else if (data == "Big") {
    return 0.9 * s3;
  }
}

function chooseMoodbPoint(d) {
  data = d.moodb;
  size = d.size;
  if (size == "Small") {
    s = 0.1 * s1;
  } else if (size == "Medium") {
    s = 0.1 * s2;
  } else if (size == "Big") {
    s =  0.1 * s3;
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
    s = 0.1 * s1;
  } else if (size == "Medium") {
    s = 0.1 * s2;
  } else if (size == "Big") {
    s =  0.1 * s3;
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
    return "-5,45 -5,35 -25,30 -30,35 -30,45 -25,50 -5,45 -3,47 3,47 5,45 25,50 30,45 30,35 25,30 5,35 -5,35 -3,33 3,33 5,35 5,45";
  }
}
function shapeFormal2(d) {
  if (d.category == "Formal") {
    return "-5,45 -5,35 5,35 5,45";
  }
}


function durationPoints(d){
  return "-6,-15 2,-14 2,14 -6,15 ";
}
function transformPoly(d){
  let x,y,r,cx;
  y = 0;
  //translate
  if (d.type == "Breakfast") {
    x = -185;
    cx = 185;
  } else if (d.type == "Lunch") {
      x = -220;
      cx = 220;
  } else if (d.type == "Dinner") {
      x = -255;
      cx = 255;
  }
  //transform
  r = 0;
  if (d.total % 2 == 0) {
    //even偶
    if (d.day == 1) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI) + (645 / 14);
    } else if (d.day == 2) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI);
    } else if (d.day == 3) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI) - (645 / 14);
    } else if (d.day == 4) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI) + 180 - (645 / 14);
    } else if (d.day == 5) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI) + 180;
    } else if (d.day == 6) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * Math.atan(15/cx) * (180 / Math.PI) + 180+ (645 / 14);
    }
  } else if (d.total % 2 == 1) {
    //odd奇
    if (d.day == 1) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI) + (645 / 14);
    } else if (d.day == 2) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI);
    } else if (d.day == 3) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI) - (645 / 14);
    } else if (d.day == 4) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI) + 180 - (645 / 14);
    } else if (d.day == 5) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI) + 180;
    } else if (d.day == 6) {
      i = d.duration;
      r = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * Math.atan(15/cx) * (180 / Math.PI) + 180+ (645 / 14);
    }

  }
  translate = "translate(" + x + "," + y + ")";
  rotate = "rotate(" + r + "," + cx + ", 0)";
  return translate + " " + rotate;
}

function chooseBowlsLinePos(d) {
  let x = 0, y = 0;
  type = d.type;
  day = d.day;
  if (d.day <= 3) {
    if (d.day == 1) {
      y = y1;
    }else if (d.day == 2) {
      y = y2;
    }else if (d.day == 3) {
      y = y3;
    }
    // y = (day - 0.45) * 250;
    if (type == "Breakfast") {
      x = x3 + 50;
    } else if (type == "Lunch") {
      x = x2 + 60;
    } else if (type == "Dinner") {
      x = x1 + 70;
    }
  } else {
    if (d.day == 4) {
      y = y3;
    }else if (d.day == 5) {
      y = y2;
    }else if (d.day == 6) {
      y = y1;
    }
    // y = (day - 3 - 0.45) * 250;
    if (type == "Breakfast") {
      x = 2400 - (x3 + 50);
    } else if (type == "Lunch") {
      x = 2400 - (x2 + 60);
    } else if (type == "Dinner") {
      x = 2400 - (x1 + 70);
    }
  }
  return "translate(" + x + "," + y + ")";
}

function chooseLinePoint1(d) {
  if (d.day <= 3) {
    if (d.type == "Breakfast") {
      if (d.day == 2) {
        return 100;
      } else {
        return 130;
      }
    } else {
      return 120;
    }
  } else {
    if (d.type == "Breakfast") {
      if (d.day == 5) {
        return -100;
      } else {
        return -130;
      }
    } else {
      return -120;
    }
  }
}

function chooseLinePoint2(d) {
  if (d.day <= 3) {
    if (d.type == "Breakfast") {
      return 50;
    } else {
      return 70;
    }
  } else {
    if (d.type == "Breakfast") {
      return -50;
    } else {
      return -70;
    }
  }
}

function chooseSepLinePointX1(d) {
  if (d.day <= 3) {
    if (d.type == "Breakfast") {
      return 0;
    } else {
      return 10;
    }
  } else {
    if (d.type == "Breakfast") {
      return 0;
    } else {
      return -10;
    }
  }
}
function chooseSepLinePointX2(d) {
  if (d.day <= 3) {
    if (d.type == "Breakfast") {
      return 30;
    } else {
      return 50;
    }
  } else {
    if (d.type == "Breakfast") {
      return -30;
    } else {
      return -50;
    }
  }
}
function chooseSepLinePointY(d) {
  if (d.total % 2 == 0) {
    //even偶
    i = d.bowl;
    y = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * (10 - d.total) * 0.1 * 15;
  } else if (d.total % 2 == 1) {
    //odd奇
    i = d.bowl;
    y = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * (10 - d.total) * 0.1 * 15;
  }
  return y;
}

function translateColorPosition(d) {
  if (d.day <= 3) {
    x = 100;
    if (d.day == 1) {
      y = y1;
    } else if (d.day == 2) {
      y = y2;
    } else if (d.day == 3) {
      y = y3;
    }
  } else {
    x = 2300;
    if (d.day == 4) {
      y = y1;
    } else if (d.day == 5) {
      y = y2;
    } else if (d.day == 6) {
      y = y3;
    }
  }
  return "translate(" + x + "," + y + ")"

}

function transformColorPoly(d) {
  if (d.day <= 3) {
    x = 50;
  } else {
    x = -50;
  }
  if (d.total % 2 == 0) {
    //even偶
    i = d.index;
    y = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * 15;
  } else if (d.total % 2 == 1) {
    //odd奇
    i = d.index;
    y = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * 15;
  }
  return "translate(" + x + "," + y + ")"
}

function transformColorRect(d) {
  offsetX = 0;
  offsetY = 0;
  if (d.day <= 3) {
    x = 50;
  } else {
    x = -50;
  }
  if (d.total % 2 == 0) {
    //even偶
    i = d.index;
    y = Math.pow(-1,i + 1) * (Math.floor((i+1)/2) * 2 - 1) * 15;
  } else if (d.total % 2 == 1) {
    //odd奇
    i = d.index;
    y = Math.pow(-1,i + 1) * (Math.floor((i)/2) * 2) * 15;
  }
  // set offset
  if (d.day > 3) {
    offsetX = 10;
    offsetY = -10;
  } else {
    offsetY = -10;
    offsetX = - d.amount * 0.9 - 10;
  }
  return "translate(" + (x + offsetX) + "," + (y + offsetY) + ")"
}
//
// function chooseTriPoint(d) {
//   let xl, yl, xr, yr, xt, yt;
//
//   size = d.size;
//   if (size == "Small") {
//     s = 2;
//   } else if (size == "Medium") {
//     s = 3;
//   } else if (size == "Big") {
//     s = 4;
//   }
//   offset = d.no * 3;
//   offset = offset * s;
//   xl = - 6  * s + offset;
//   yl = -5  * s + offset;
//   xr = 0 * s + offset;
//   yr = -5 * s + offset;
//   xt = -3 * s + offset;
//   yt = -10 * s + offset;
//   pointL = xl + "," + yl;
//   pointR = xr + "," + yr;
//   pointT = xt + "," + yt;
//   return  pointL + " " + pointR + " " + pointT;
// }
//
// function chooseRectX(d) {
//   size = d.size;
//   if (size == "Small") {
//     s = 2;
//   } else if (size == "Medium") {
//     s = 3;
//   } else if (size == "Big") {
//     s = 4;
//   }
//   offset = d.no * 3;
//   return - 6  * s + offset * s;
// }
// function chooseRectWidth(d) {
//   size = d.size;
//   if (size == "Small") {
//     s = 2;
//   } else if (size == "Medium") {
//     s = 3;
//   } else if (size == "Big") {
//     s = 4;
//   }
//   return 4  * s;
// }
