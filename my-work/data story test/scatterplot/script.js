// title, front page



scrollToSecond = false;

let w1 = 950;
let h1 = 750;
let h11 = 864 * 3;
let h1Offset = h11-h1;
let xPadding1 = 75;
let yPadding1 = 75;
let mouseXOffset = 5;
let mouseYOffset = 5;

var top  = window.pageYOffset;

let viz0 = d3.select("#container1")
  .append("svg")
      .style("width", w1)
      .style("height", h11)
    // .style("outline", "solid black")
;
let viz = viz0.append("g").attr("transform", "translate(0," + 0 + ")");
      // .attr("transform", "translate(0," + h1Offset + ")");

function calculateSentiment(incomingData1) {
  for (var i = 0; i < incomingData1.length; i++) {
    // console.log(incomingData1[i].positive);
    incomingData1[i].sentimentScore = (parseFloat(incomingData1[i].Positive) - parseFloat(incomingData1[i].Negative)) / parseFloat(incomingData1[i].Occurrences);

    incomingData1[i].neutrality = (parseFloat(incomingData1[i].Neutral) / parseFloat(incomingData1[i].Occurrences));
  }
}

d3.csv("Emoji_Sentiment_Data_v1.0.csv").then(function(incomingData1) {
  d3.csv("emoji_df.csv").then(function(descriptionData) {

    function filterFunction1(d) {
      let correspondingDatapoint = descriptionData.find(function(datapoint) {
        if (datapoint.emoji == d.Emoji) {
          return true;
        } else {
          return false;
        }
      })
      if (d.Occurrences >= 5 && d.Positive != 0 && d.Negative != 0 && correspondingDatapoint != undefined) {
        return true;
      } else {
        return false;
      }
    }

    // console.log(incomingData1);
    calculateSentiment(incomingData1);
    incomingData1 = incomingData1.filter(filterFunction1)
    console.log(incomingData1);



    // let xMax1 = d3.max(incomingData1, function(d) { return d.sentimentScore});
    // let xMin1 = d3.min(incomingData1, function(d) { return d.sentimentScore});
    // console.log(xMax1, xMin1);
    let xDomain1 = d3.extent(incomingData1, function(d) { return d.sentimentScore});
    let xScale1 = d3.scaleLinear().domain(xDomain1).range([xPadding1, w1-xPadding1]);
    let xAxis1 = d3.axisBottom(xScale1);
    let xAxisGroup1 = viz.append("g")
        .attr("class", "xaxisgroup1")
        .attr("transform", "translate(0,"+(h1+h1Offset-yPadding1)+")")
    ;
    xAxisGroup1.call(xAxis1);

    // grid lines
    let xgrid = viz.append("g")
        .attr("id", "xgrid")
        .attr("class", "grid")
        .attr("transform", "translate(0," + (h1+h1Offset-yPadding1) + ")")
    ;
    xgrid
        .call(d3.axisBottom(xScale1)
            .ticks(5)
            .tickSize(-h1+yPadding1*2)
            .tickFormat("")
        )
    ;

    xAxisGroup1.append("text")
        .attr("transform",
            "translate(" + (w1/2) + " ," + yPadding1 / 1.5 + " )")
        .style("text-anchor", "middle")
        .text("Sentiment Score")
        .attr("fill", "black")
        .attr("font-size", 25)
        .attr("font-family", "Futura")
        .attr("font-weight", "bold")
    ;

    let yDomain1 = d3.extent(incomingData1, function(d) { return d.neutrality});
    let yScale1 = d3.scaleLinear().domain(yDomain1).range([h1+h1Offset-yPadding1, +h1Offset+yPadding1]);
    let yAxis1 = d3.axisLeft(yScale1);
    let yAxisGroup1 = viz.append("g")
        .attr("class", "yaxisgroup1")
        .attr("transform", "translate("+(xPadding1)+", 0)")
    ;
    yAxisGroup1.call(yAxis1);

    yAxisGroup1.append("text")
        .attr("y", 0 - xPadding1)
        .attr("x",0 - (h1 / 2) -h1Offset)
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Neutrality")
        .attr("fill", "black")
        .attr("font-size", 25)
        .attr("font-family", "Futura")
        .attr("font-weight", "bold")
    ;


    // add the Y gridlines
    let ygrid = viz.append("g")
        .attr("class", "grid")
        .attr("id", "ygrid")
        .attr("transform", "translate("+(xPadding1)+", 0)")
    ;
    ygrid
        .call(d3.axisLeft(yScale1)
            .ticks(5)
            .tickSize(-w1+xPadding1*2)
            .tickFormat("")
        )
    ;
    // scatterPlot text support: Positive, Negative
    viz.append("text")
        .text("Negative")
        .attr("x", 100)
        .attr("y", h1Offset+100)
        .attr("font-size", 25)
        .attr("fill", "grey")
        .attr("font-family", "Futura")
    ;
    viz.append("text")
        .text("Positive")
        .attr("x", w1-175)
        .attr("y", h1Offset+100)
        .attr("font-size", 25)
        .attr("fill", "grey")
        .attr("font-family", "Futura")
    ;

    // let graphGroup1 = viz.append("g").attr("class", "graphGroup1")
    //
    // let dataGroups1 = graphGroup1.selectAll(".datagroup1").data(incomingData1).enter();



    function getEmojiFontSize(d) {
      // return 17;
      return Math.sqrt(emojiFontSizeScale(d.Occurrences));
    }
    function getScatterPlotEmojiX(d) {
      return xScale1(d.sentimentScore);
    }
    function getScatterPlotEmojiY(d) {
      return yScale1(d.neutrality)+getEmojiFontSize(d)/2;
    }

    function getScatterPlotEmojiX0(d, i) {
      remain = i % 10;
      return 55 + remain * 50;
    }
    function getScatterPlotEmojiY0(d, i) {
      remain = Math.floor(i/10)
      return 55 + remain * 50;
    }

    function giveScatterPlotEmojiID(d, i) {
      return d.Emoji;
      // return getScatterPlotEmojiX(d) + ',' + getScatterPlotEmojiY(d)
    }

    let emojiFontSizeDomain = d3.extent(incomingData1, function(d) { return d.Occurrences});
    let emojiFontSizeScale = d3.scaleLinear().domain(emojiFontSizeDomain).range([200, 1000]);
    // let scatterPlotEmoji = dataGroups1.append("text")
    //     .text(function(d) { return d.Emoji})
    //     .attr("id", giveScatterPlotEmojiID)
    //     .attr("class", "datagroup1")
    //     .attr("x", getScatterPlotEmojiX)
    //     .attr("y", getScatterPlotEmojiY)
    //     .attr("font-size", getEmojiFontSize)
    //     .attr("fill", "black")
    // ;

    var clip = viz.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", w1 )
        .attr("height", h1+h1Offset)
        .attr("x", 0)
        .attr("y", 0)
    ;

    var brush = d3.brush()
      .extent([[xPadding1, yPadding1+h1Offset], [w1-xPadding1, h1+h1Offset-yPadding1]])
      .on("end", updateChart);

    var scatter = viz.append('g')
        .attr("clip-path", "url(#clip)")
    ;

    scatter
      .append("g")
        .attr("class", "brush")
          .call(brush)
    ;

    let scatterEmoji = scatter
      .selectAll(".datagroup1")
      .data(incomingData1)
      .enter()
      .append("text")
        .text(function(d) { return d.Emoji})
        .attr("id", giveScatterPlotEmojiID)
        .attr("class", "datagroup1")
        .attr("x", getScatterPlotEmojiX0)
        .attr("y", getScatterPlotEmojiY0)
        .attr("font-size", 18)
        // .attr("x", getScatterPlotEmojiX)
        // .attr("y", getScatterPlotEmojiY)
        // .attr("font-size", getEmojiFontSize)
        .attr("fill", "black")
        .attr("opacity", 1)
        .style("text-anchor", "middle")
        // .on("mouseover", showDetail)
        // .on("mouseout", hideDetail)
    ;

    window.onscroll = pageScrolled;
    scrollToFirst = false;
    function pageScrolled() {
        var scrollTop = window.pageYOffset;
        // console.log(scrollTop);
        if (scrollTop >= 1400 && scrollTop <= 1800 && scrollToFirst == false) {
          window.scrollTo(0, 1870);
          scrollToFirst = true;
          scatterEmoji.transition().duration(2000)
              .attr("x", getScatterPlotEmojiX)
              .attr("y", getScatterPlotEmojiY)
          ;
          scatterEmoji.transition().delay(2000).duration(1000)
              .attr("font-size", getEmojiFontSize)
          ;
          scatterEmoji
              .on("mouseover", showDetail)
              .on("mouseout", hideDetail)
          ;
        } else if (scrollTop <= 1400 && scrollToFirst == true) {
          scrollToFirst = false;
          scatterEmoji.transition().duration(2000)
              .attr("x", getScatterPlotEmojiX0)
              .attr("y", getScatterPlotEmojiY0)
              .attr("font-size", 18)
        }
        // else if (scrollTop >= 2900 && scrollTop <= 3500 && scrollToSecond == false) {
        //   document.getElementById("container2").style.position = "fixed";
        //   document.getElementById("container2").style.top = "110px";
        //   scrollToSecond = true;
        // } else if ((scrollTop <= 2900 || scrollTop >= 3950) && scrollToSecond == true) {
        //   document.getElementById("container2").style.position = "absolute";
        //   document.getElementById("container2").style.top = scrollTop + "px";
        //   scrollToSecond = false;
        // }

    }


    var idleTimeout;
    function idled() { idleTimeout = null; }

    function updateChart(state=0) {
      if (state == 0) {
        extent = d3.event.selection;
      } else {
        extent = state;
      }
      // console.log(extent);
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        xScale1.domain(xDomain1);
        yScale1.domain(yDomain1);
        inWholeSize = true;

      }else{
        // yScale1.domain([ yScale1.invert(extent[1]), yScale1.invert(extent[0]) ])
        xScale1.domain([ xScale1.invert(extent[0][0]), xScale1.invert(extent[1][0]) ])
        yScale1.domain([ yScale1.invert(extent[1][1]), yScale1.invert(extent[0][1]) ])
        scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and circle position
      xAxisGroup1.transition().duration(2000).call(d3.axisBottom(xScale1));
      yAxisGroup1.transition().duration(2000).call(d3.axisLeft(yScale1));



      scatter
        .selectAll(".datagroup1")
        .transition().duration(2000)
        .attr("x", getScatterPlotEmojiX)
        .attr("y", getScatterPlotEmojiY)
        .attr("font-size", getEmojiFontSize)
      ;

      // scatterPlotEmoji.classed("selected", function(d){ return isBrushed(extent, xScale1(d.sentimentScore), yScale1(d.neutrality) ) } )
      // console.log("update");

      xgrid.transition().duration(2000)
          .call(d3.axisBottom(xScale1)
              .ticks(5)
              .tickSize(-h1+yPadding1*2)
              .tickFormat("")
          )
      ;

      ygrid.transition().duration(2000)
          .call(d3.axisLeft(yScale1)
              .ticks(5)
              .tickSize(-w1+xPadding1*2)
              .tickFormat("")
          )
      ;
    }





    function showDetail(d) {
      d3.selectAll(".datagroup1").attr("opacity", 0.2);
      d3.select(this).attr("opacity", 1);

      let correspondingDatapoint = descriptionData.find(function(datapoint) {
        if (datapoint.emoji == d.Emoji) {
          return true;
        } else {
          return false;
        }
      })
      x = getScatterPlotEmojiX(d);
      y = getScatterPlotEmojiY(d);
      prelength = Math.max(correspondingDatapoint.name.length, correspondingDatapoint.group.length /3);
      length = prelength*12 + 100;
      if (x >= w1/2) {
        pos = -1
      } else {
        pos = 1
      }
      if (y >= h1/2 + h1Offset) {
        // console.log("down");
        y = h1Offset + 0.8 * (y-+h1Offset);
      } else {
        // console.log("up");
        y = h1Offset + (y-+h1Offset);
      }
      informationGroup = scatter.append("g");
      informationGroup.append("rect")
          .attr("class", "tempInfo")
          .attr("x", function(d) { return (pos == 1) ? x+30 : x+30-60-length})
          .attr("y", y-60)
          .attr("width", length)
          .attr("height", 180)
          .attr("fill", "white")
          .attr("stroke-width", 3)
          .attr("stroke", "black")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text(d.Emoji)
          .attr("x", function(d) { return (pos == 1) ? x+35 : x+35-60-length})
          .attr("y", y-25)
          .attr("font-size", 25)
          .attr("fill", "black")
          .attr("font-family", "Futura")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text(correspondingDatapoint.name)
          .attr("x", function(d) { return (pos == 1) ? x+75 : x+75-60-length})
          .attr("y", y-25)
          .attr("font-size", 25)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text(correspondingDatapoint.group)
          .attr("x", function(d) { return (pos == 1) ? x+30 + length - prelength : x+30-60 - prelength})
          .attr("y", y)
          .attr("font-size", 16)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .style("text-anchor", "end")
      ;
      // informationGroup.append("text")
      //     .attr("class", "tempInfo")
      //     .text(correspondingDatapoint.sub_group)
      //     .attr("x", x+80)
      //     .attr("y", y+5)
      //     .attr("font-size", 15)
      //     .attr("fill", "black")
      //     .attr("font-family", "Futura")
      // ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text("Occurrences: " + d.Occurrences)
          .attr("x", function(d) { return (pos == 1) ? x+40 : x+40-60-length})
          .attr("y", y+25)
          .attr("font-size", 20)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;

      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text("Positive: " + d.Positive)
          .attr("x", function(d) { return (pos == 1) ? x+40 : x+40-60-length})
          .attr("y", y+45)
          .attr("font-size", 20)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text("Negative: " + d.Negative)
          .attr("x", function(d) { return (pos == 1) ? x+40 : x+40-60-length})
          .attr("y", y+65)
          .attr("font-size", 20)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text("Netruality: " + d.neutrality.toFixed(2))
          .attr("x", function(d) { return (pos == 1) ? x+40 : x+40-60-length})
          .attr("y", y+85)
          .attr("font-size", 20)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;
      informationGroup.append("text")
          .attr("class", "tempInfo")
          .text("Sentiment: " + d.sentimentScore.toFixed(2))
          .attr("x", function(d) { return (pos == 1) ? x+40 : x+40-60-length})
          .attr("y", y+105)
          .attr("font-size", 20)
          .attr("fill", "black")
          .attr("font-family", "Futura")
          .attr("font-weight", "bold")
      ;


    }
    function hideDetail(d) {
      d3.selectAll(".tempInfo").remove();
      d3.selectAll(".datagroup1").attr("opacity", 1);
    }

    // button for Zoomming In.

    document.getElementById("clickToZoomIn1").addEventListener("click", zoomInSpecific1);
    document.getElementById("clickToZoomIn2").addEventListener("click", zoomInSpecific2);
    //
    inWholeSize = true;
    function zoomInSpecific1() {
      if (inWholeSize == true) {
        selection = [[w1/2,h1Offset+h1/2+50], [w1-50,h1Offset+h1-175]]
        updateChart(selection);
        inWholeSize = false;
      }
    }
    function zoomInSpecific2() {
      if (inWholeSize == true) {
        selection = [[200,h1Offset+h1/2+100], [w1-50,h1Offset+h1-175]]
        updateChart(selection);
        inWholeSize = false;
      }
    }


    // function isBrushed(brush_coords, cx, cy) {
    //    var x0 = brush_coords[0][0],
    //        x1 = brush_coords[1][0],
    //        y0 = brush_coords[0][1],
    //        y1 = brush_coords[1][1];
    //   return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    // }

    // function updateMousePosition(e) {
    //   e = window.event;
    //   var x = e.clientX;
    //   var y = e.clientY;
    //
    //   // // offset test
    //   // viz.append("circle")
    //   //     .attr("cx", x-mouseXOffset)
    //   //     .attr("cy", y-mouseYOffset)
    //   //     .attr("r", 2)
    //   // ;
    //
    //   function getEmojiFontSizeTemp(d) {
    //     return 1.2 * Math.sqrt(emojiFontSizeScale(d.Occurrences));
    //   }
    //   function getScatterPlotEmojiXTemp(d) {
    //     tempx = xScale1(d.sentimentScore)-getEmojiFontSize(d)/2;
    //     return tempx + (tempx- x) * 0.5;
    //   }
    //   function getScatterPlotEmojiYTemp(d) {
    //     tempy = yScale1(d.neutrality)+getEmojiFontSize(d)/2;
    //     return tempy + (tempy- y) * 0.5;
    //   }
    //
    //   x = x - mouseXOffset;
    //   y = y - mouseYOffset;
    //
    //   let affectRadius = 50;
    //   affectingElements = [];
    //   d3.selectAll(".datagroup1").each(function() {
    //     let eachX = d3.select(this).attr("x");
    //     let eachY = d3.select(this).attr("y");
    //     let eachID = d3.select(this).attr("id");
    //     // let eachRadius = d3.select(this).attr("font-size")/2;
    //     let dist = Math.pow((eachX - x), 2) + Math.pow((eachY - y), 2);
    //     if (dist <= Math.pow(affectRadius, 2)) {
    //       affectingElements.push(eachID);
    //     }
    //   });
    //
    //   d3.selectAll(".datagroup1")
    //       .attr("opacity", 0.1)
    //       .attr("x", getScatterPlotEmojiX)
    //       .attr("y", getScatterPlotEmojiY)
    //       // .attr("font-size", getEmojiFontSize)
    //       .attr("font-size", 16)
    //   ;
    //
    //   for (var i = 0; i < affectingElements.length; i++) {
    //     id = "#" + affectingElements[i];
    //     d3.select(id)
    //         .transition()
    //         .attr("opacity", 1)
    //         .attr("x", getScatterPlotEmojiXTemp)
    //         .attr("y", getScatterPlotEmojiYTemp)
    //         // .attr("font-size", getEmojiFontSizeTemp)
    //     ;
    //
    //   }
    //
    //   // scatterPlotEmoji
    //
    // }
    //
    // function recoverEmojiScatterState() {
    //   d3.selectAll(".datagroup1").attr("opacity", 1);
    // }
    // viz.on("mousemove", updateMousePosition)
    // viz.on("mouseout", recoverEmojiScatterState)
  })
});

// viz 2

// Spamming

let w2 = 800;
let h2 = 550;
let h22 = 3500;
let h2Offset = h22-h2;
let xPadding2 = 75;
let yPadding2 = 75;

let viz2 = d3.select("#container2")
  .append("svg")
      .style("width", w2)
      .style("height", h2)
      .style("outline", "solid black")
;

document.getElementById("spamPercentage").addEventListener("click", showPercentage);

function showPercentage() {
  // document.getElementById("container2").style.position = "fixed";
  // document.getElementById("container2").style.top = "110px";
}


// viz 3

// position
let w3 = 800;
let h3 = 450;
let h33 = 5500;
let h3Offset = h33-h3;
let xPadding3 = 75;
let yPadding3 = 75;

let viz3 = d3.select("#container3")
  .append("svg")
      .style("width", w3)
      .style("height", h3)
      .style("outline", "solid black")
;



// viz 4

// combination
d3.json("comb0.json").then(gotData);


let w = 850;
let h = 800;
let viz4 = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    // .style("outline", "solid black")
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


  let graphGroup = viz4.append("g").attr("class", "graphGroup");

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
      id = "#c" + showList[n];
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
  return "c" + d.emoji;
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


// viz 5

// text Sentiment vs.emoji sentiment

let w5 = 1300;
let h5 = 600;
let h55 = 7000;
let h5Offset = h55-h5;
let xPadding5 = 75;
let yPadding5 = 75;

let viz5 = d3.select("#container5")
  .append("svg")
      .style("width", w5)
      .style("height", h5)
      .style("outline", "solid black")
;


// Ending

document.getElementById("Ending0").addEventListener("click", clickEnd)

function clickEnd() {
  document.getElementById("Ending0").style.opacity = 0;
  document.getElementById("Ending1").style.opacity = 1;
  document.getElementById("Ending1").style.zIndex = 1;
  document.getElementById("Ending2").style.opacity = 1;
  window.scrollTo(0, 10000);
}
