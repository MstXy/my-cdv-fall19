d3.json("comb0.json").then(gotData);


let w = 800;
let h = 800;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

circleRadius1 = 360;
circleRadius2 = 380;
lineRadius1 = 360;
lineRadius2 = 380;
emojiPosList = [];

//create random seed
var myrng = new Math.seedrandom('hello.');
// function unique (arr) {
//   return Array.from(new Set(arr))
// }

function filterFunction(datapoint) {
  uniqueEmoji = unique(datapoint.emoji)

  if (uniqueEmoji.length > 2) {
    return true;
  } else {
    return false;
  }
}

function createDict(d) {
  for (var i = 0; i < d.length; i++) {
    emojiPosList.push(d[i]['emoji'])
  }
}

//
function shuffle(array, i0 = 0, i1 = array.length) {
  console.log("shuffle");
  var m = i1 - (i0 = +i0),
      t,
      i;

  while (m) {
    i = myrng() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}

function processData(d) {
  for (var i = 0; i < d.length; i++) {
    for (var n = 0; n < d[i]["comb"].length; n++) {
      d[i]["comb"][n] = [d[i]['emoji'], d[i]["comb"][n]]
    }
  }
}

function gotData(incomingData){
  // incomingData = incomingData.slice(0,200);
  // let filteredData = incomingData.filter(filterFunction)
  // console.log(filteredData);
  arrayLength = incomingData.length;
  // console.log(arrayLength);
  processData(incomingData);
  shuffle(incomingData);
  createDict(incomingData);
  console.log(emojiPosList);
  console.log(incomingData);

  d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
    });
  };


  let graphGroup = viz.append("g").attr("class", "graphGroup");

  let pathGroup = graphGroup.append("g").attr("class", "pathGroup");
  let emojiGroup = graphGroup.append("g").attr("class", "emojiGroup");

  // let datagroups = graphGroup.selectAll(".emoji").data(incomingData, function(d,i) { return d.emoji });


  console.log("creating lines");

  // let linegroups = emoji.append("g");
  let linegroups = pathGroup.selectAll(".linegroup").data(incomingData, function(d,i) { return d.emoji }).enter()
    .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .attr("class", "linegroup")
  ;
  let lineSelection = linegroups.selectAll(".emojiLine").data(function(d){return d.comb}).enter();

  let emojiLine = lineSelection
    .append("path")
      .attr("class", "emojiLine")
      // .attr("id", giveLineID)
      .attr("d", getPath)
      // .attr("x1", getStartX)
      // .attr("y1", getStartY)
      // .attr("x2", getDesX)
      // .attr("y2", getDesY)
      // .attr("stroke", function(d) { return (d[0] == "🎈") ? "red" : "lightgrey"})
      .attr("stroke", "lightgrey")
      .attr("stroke-width", 1)
      .attr("opacity", 0.1)
      .attr("fill", "transparent")
  ;

  console.log("creating emojis");
  // make it on the top layer
  let emojigroups = emojiGroup.selectAll(".emoji").data(incomingData, function(d,i) { return d.emoji }).enter()
    .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
  ;


  let emojiDot = emojigroups.append("text")
      .text(function(d, i) { return d.emoji })
      .attr("transform", "translate(" + -4 + "," + 2 + ")")
      // .attr("class", "emojiDotClass")
      .attr("id", giveEmojiID)
      .on("mouseover", showLine)
      .on("mouseout", hideLine)
      .attr("class", "emoji")
  ;
  emojiDot
      .attr("x", getCircleX)
      .attr("y", getCircleY)
      .attr("font-size", 10)
  ;
  // console.log(d3.selectAll(".emojiDot"));
  // d3.selectAll(".emojiDot").moveToFront();

  function showLine(d) {
    showList = [];
    targetList = [];
    startPoint = d.emoji;
    // do things with emoji dots
    showList.push(startPoint);
    for (var n = 0; n < d.comb.length; n++) {
      showList.push(d.comb[n][1])
      targetList.push([startPoint, d.comb[n][1]]);
    }
    console.log(showList);
    console.log(targetList);
    d3.selectAll(".emoji").attr("opacity", 0.2);
    for (var n = 0; n < showList.length; n++) {
      id = "#" + showList[n];
      d3.select(id).attr("font-size", 50).attr("transform", "translate(-20, 10)").attr("opacity", 1);
    }

    // do things with emoji lines
    var g = pathGroup.append("g")
      .attr("class", "active")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
    ;
    for (var n = 0; n < targetList.length; n++) {
      g.append("path")
          .attr("d", getPathOri(targetList[n]))
          .attr("stroke", "darkblue")
          .attr("stroke-width", 3)
          .attr("opacity", 1)
          .attr("fill", "transparent")
          .style("stroke-dasharray", "0,1000")
          .transition()
            .duration(1000)
            .ease(d3.easeCubicIn)
          .attr("d", getPath(targetList[n]))
          .style("stroke-dasharray", "1000,1000")
    }


  }
  function hideLine(d, i) {
    d3.selectAll(".emoji").attr("font-size", 10).attr("transform", "translate(-4, 2)").attr("opacity", 1);
    pathGroup.selectAll(".active").remove();
  }
}



function getStartX(d, i) {
  if (i % 2 == 0) {
    return Math.cos( emojiPosList.indexOf(d[0]) * (Math.PI * 2) / arrayLength) * lineRadius1;
  } else {
    return Math.cos( emojiPosList.indexOf(d[0]) * (Math.PI * 2) / arrayLength) * lineRadius2;
  }
}
function getStartY(d, i) {
  if (i % 2 == 0) {
    return Math.sin( emojiPosList.indexOf(d[0]) * (Math.PI * 2) / arrayLength) * lineRadius1;
  } else {
    return Math.sin( emojiPosList.indexOf(d[0]) * (Math.PI * 2) / arrayLength) * lineRadius2;
  }
}


function getDesX(d, i) {
  if (i % 2 == 0) {
    return Math.cos( emojiPosList.indexOf(d[1]) * (Math.PI * 2) / arrayLength) * lineRadius1;
  } else {
    return Math.cos( emojiPosList.indexOf(d[1]) * (Math.PI * 2) / arrayLength) * lineRadius2;
  }
}
function getDesY(d, i) {
  if (i % 2 == 0) {
    return Math.sin( emojiPosList.indexOf(d[1]) * (Math.PI * 2) / arrayLength) * lineRadius1;
  } else {
    return Math.sin( emojiPosList.indexOf(d[1]) * (Math.PI * 2) / arrayLength) * lineRadius2;
  }
}

function getPath(d) {
  i1 = emojiPosList.indexOf(d[0]);
  i2 = emojiPosList.indexOf(d[1]);
  startX = getStartX(d, i1);
  startY = getStartY(d, i1);
  desX = getDesX(d, i2);
  desY = getDesY(d, i2);

  return "M" + startX + " " + startY + " " + "Q 0 0" + " " + desX + " " + desY;
}

function getCircleX(d, i) {
  if (i % 2 == 0) {
    return Math.cos( i * (Math.PI * 2) / arrayLength) * circleRadius1;
  } else {
    return Math.cos( i * (Math.PI * 2) / arrayLength) * circleRadius2;
  }
}

function getCircleY(d, i) {
  if (i % 2 == 0) {
    return Math.sin( i * (Math.PI * 2) / arrayLength) * circleRadius1;
  } else {
    return Math.sin( i * (Math.PI * 2) / arrayLength) * circleRadius2;
  }
}

function giveEmojiID(d, i) {
  return d.emoji;
}
// function giveLineID(d, i) {
//   return d[0] + d[1];
// }



// function getRandom() {
//   return - w/ 2 + Math.random() * w;
// }

function getPathOri(d) {
  i1 = emojiPosList.indexOf(d[0]);
  i2 = emojiPosList.indexOf(d[1]);
  startX = getStartX(d, i1);
  startY = getStartY(d, i1);
  return "M" + startX + " " + startY;
}
