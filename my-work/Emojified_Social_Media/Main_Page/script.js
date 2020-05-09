

d3.selection.prototype.first = function() { return d3.select(this.nodes()[0]); };
d3.selection.prototype.last = function() { return d3.select(this.nodes()[this.size() - 1]); };

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

d3.csv("data/Emoji_Sentiment_Data_v1.0.csv").then(function(incomingData1) {
  d3.csv("data/emoji_df.csv").then(function(descriptionData) {

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
    // console.log(incomingData1);



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
        .attr("fill", "#ff4242")
        .attr("font-family", "Futura")
    ;
    viz.append("text")
        .text("Positive")
        .attr("x", w1-175)
        .attr("y", h1Offset+100)
        .attr("font-size", 25)
        .attr("fill", "#81d8d0")
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
let h2 = 650;
let h22 = 3500;
let h2Offset = h22-h2;
let xPadding2 = 50;
let yPadding2 = 42;

let viz2 = d3.select("#container2")
  .append("svg")
      .style("width", w2)
      .style("height", h2)
      // .style("outline", "solid black")
;
viz2.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", (w2))
    .attr("height", (h2))
    .attr("fill", "lightgrey")
    // .attr("stroke-width", 2)
    // .attr("stroke", "black")
;

viz2.append("rect")
    .attr("x", xPadding2)
    .attr("y", yPadding2)
    .attr("width", (w2-2*xPadding2))
    .attr("height", (h2-2*yPadding2))
    .attr("fill", "#3d3d3d")
    .attr("stroke-width", 0)
;



function filterFunction2(d) {
  if (d.frequency.length > 50) {
    return true;
  } else {
    return false;
  }
}



// function transformSpamGroup(d, i) {
//   let x,y;
//   if (i == 0) {
//     x = h2/4;
//   } e
//
//   return "translate(" + x + ", " + y+ ")";
// }
function randomFill(num) {
  // let myseed = new Math.seedrandom(num);
  // let ran1, ran2, ran3, ran4, ran5, ran6;
  // let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f"];
  // let index1 = Math.floor((myseed()*arr.length));
  // ran1 = arr[index1]
  // let index2 = Math.floor((myseed()*arr.length));
  // ran2 = arr[index2]
  // let index3 = Math.floor((myseed()*arr.length));
  // ran3 = arr[index3]
  // let index4 = Math.floor((myseed()*arr.length));
  // ran4 = arr[index4]
  // let index5 = Math.floor((myseed()*arr.length));
  // ran5 = arr[index5]
  // let index6 = Math.floor((myseed()*arr.length));
  // ran6 = arr[index6]
  // return "#" + ran1 + ran2 + ran3 + ran4 + ran5 + ran6;
  if (num == 1) {
    return "#ff5757";
  } else if (num == 2) {
    return "#ff8c57";
  } else if (num == 3) {
    return "#576dff";
  } else if (num == 4) {
    return "#ff578c";
  }
}


function chooseSpamForceX(d, i) {
  return w2/4 + (i % 2) * (w2/2);
}
function chooseSpamForceY(d, i) {
  return h2/4 + Math.floor(i/2) * (h2/2);
}


d3.json("data/NEATfrequencyListFile.json").then(function(incomingData2) {
  d3.json("data/frequencyListFile.json").then(function(totalFreqData) {
    // for (var i = 0; i < incomingData2.length; i++) {
    //   incomingData2[i]
    // }
    incomingData2 = incomingData2.filter(filterFunction2);
    // console.log(incomingData2);

    let maxFreq = 0;
    for (var i = 0; i < incomingData2.length; i++) {
      for (var n = 0; n < incomingData2[i].frequency.length; n++) {
        num = incomingData2[i].frequency[n];
        if (num > maxFreq) {
          maxFreq = num;
        }
        incomingData2[i].frequency[n] = {"frequency": num};
      }
    }
    console.log(incomingData2);
    initialData = incomingData2.slice(12,16);
    console.log(initialData);

    for (var i = 0; i < totalFreqData.length; i++) {
      totalFreqData[i].frequency = totalFreqData[i].frequency.length;
    }


    document.getElementById("spamPercentage").addEventListener("click", showPercentage);

    // let spamPercentageClicked = false;
    function showPercentage() {
      // spamPercentageClicked = true;

      percentage = 100*(1011166/6000000);
      document.getElementById("spamPercentage").innerHTML = "% " + percentage.toFixed(2);

      var sampleSize = (percentage/100) * 2184;
      var tfArray = [];
      for (var i = 0; i < sampleSize; i++) {
        tfArray.push(true);
      }
      for (var i = 0; i < (2184-sampleSize); i++) {
        tfArray.push(false);
      }
      oriArray = JSON.parse(JSON.stringify(tfArray));
      randomArray = d3.shuffle(tfArray);
      console.log(oriArray);
      console.log(randomArray);
      spamFillIndex = 0;
      d3.selectAll(".spamEmoji").transition().delay(function(d, i) {
        if (randomArray[i] == true) {
          spamFillIndex += 1;
          return spamFillIndex*10;
        } else {
          return 0;
        }
      }).attr("fill", function(d, i) {
        if (randomArray[i] == true) {
          return "#61ffed";
        } else {
          return "grey";
        }
      })

      spamFillIndex1 = 0;
      d3.selectAll(".spamEmoji").transition().delay(function(d, i) {
        if (oriArray[i] == true) {
          spamFillIndex1 += 1;
          return 6000 + spamFillIndex1*10;
        } else {
          return 6000;
        }
      }).attr("fill", function(d, i) {
        if (oriArray[i] == true) {
          return "#61ffed";
        } else {
          return "grey";
        }
      })

    }

    console.log(maxFreq);
    // let spamRadiusScale = d3.scaleLinear().domain([3, maxFreq]).range([5, 50]);
    let spamRadiusScale = d3.scaleLinear().domain([3, maxFreq]).range([16, 100]);



    function updateSpam(newData, state=2) {

      let spamXIndex = 0;
      let spamYIndex = 0;
      function chooseSpamX(d) {
        if (state == 0) {
          numX = (w2 - 2*xPadding2 - 10) / 15 + 6 ;
          remain = spamXIndex % numX;
          spamXIndex += 1;
          return xPadding2 + 10 + remain*13.3;
        }
        // else {
        //   return d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)), Math.min(w2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x));
        // }
      }
      function chooseSpamY(d) {
        if (state == 0) {
          numY = (w2 - 2*xPadding2 - 10) / 15 + 6;
          remain = Math.floor(spamYIndex / numY);
          spamYIndex += 1;
          // console.log(spamIndex);
          return yPadding2 + 10 + remain*13.3;
        }
        //  else {
        //   return d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)), Math.min(h2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y));
        // }

      }

      let spamEmojiGroup = viz2.selectAll(".spamEmojiGroup").data(newData, d => d.emoji);
      let enteringSpamGroups = spamEmojiGroup.enter();
      let exitingSpamGroups = spamEmojiGroup.exit();
      let spamDotGroup = enteringSpamGroups
        .append("g")
          .attr("class", "spamEmojiGroup")
          .attr("id", d => d.emoji)
          // .attr("transform", transformSpamGroup)
      ;

      let spamEmoji = spamDotGroup.selectAll(".spamEmoji").data(d => d.frequency).enter();

      spamEmoji
        .append("circle")
          .attr("class", "spamEmoji")
          .attr("id", function (d) {
            return "node" + d3.select(this.parentNode).datum().emoji;
          })
          .attr("cx", chooseSpamX)
          .attr("cy", chooseSpamY)
          .attr("r", 4)
          .attr("fill", "grey")
          .attr("stroke-width", 0)
      ;

      //force
      let simulation1 = d3.forceSimulation();
      let simulation2 = d3.forceSimulation();
      let simulation3 = d3.forceSimulation();
      let simulation4 = d3.forceSimulation();
      let label1 = false;
      let label2 = false;
      let label3 = false;
      let label4 = false;

      let bboxPadding = 5;

      if (state == 1) {

        node1 = newData[0].frequency;
        node1.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
        simulation1.nodes(node1)
            .force("forceX", d3.forceX(w2/4).strength(0.05))
            .force("forceY", d3.forceY(h2/4).strength(0.05))
            .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
            // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
            // .alphaDecay(0.1)
            .on("tick", simulation1Ran)
        ;
        function simulation1Ran() {
          tempClass = "#node" + newData[0].emoji;
          viz2.selectAll(tempClass)
            .attr("fill", randomFill(1))
            .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
            // .attr("r", d => spamRadiusScale(d.frequency))
            .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
            .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

          let last = viz2.selectAll(tempClass).last();
          last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

          if (label1 == false) {
            label1 = true;
            //emoji
            viz2.append("text").attr("class", "spamEmoji").attr("id", "label1").text(newData[0].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
            //data text
            let textDown = viz2.append("g").attr("class", "spamEmoji");
            let textTop = viz2.append("g").attr("class", "spamEmoji");
            let textt = textTop.append("text").text(function() {
              let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                if (datapoint.emoji == newData[0].emoji) {
                  return true;
                } else {
                  return false;
                }
              })
              return newData[0].emoji + ": " + correspondingDatapoint.frequency;
            })
            .attr("x", w2/2 - 10).attr("y", h2/2 - 25)
            .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "end")
            .attr("stroke-width", 0).attr("fill","white");
            let bbox = textt.node().getBBox();
            textDown.append("rect")
              // .attr("x", w2/2).attr("y", h2/2)
              // .transition().duration(1000)
              .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
              .attr("fill", randomFill(1)).attr("stroke-width", 2).attr("stroke", "black")
              .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
              .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
            ;
          }
          posX = last.attr("cx");
          posY = last.attr("cy");
          viz2.selectAll("#label1").attr("x", posX).attr("y", parseFloat(posY) + 10);

        }
        // simulation1.stop();
        // for (let i = 0; i < node1.length; ++i){
        //     simulation1.tick();
        // }
        // tempClass1 = "." + newData[0].emoji;
        // viz2.selectAll(tempClass1).transition()
        //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
        //   .attr("cx", d => d.x)
        //   .attr("cy", d => d.y);


        node2 = newData[1].frequency;
        node2.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
        simulation2.nodes(node2)
            .force("forceX", d3.forceX(3 *w2/4).strength(0.05))
            .force("forceY", d3.forceY(h2/4).strength(0.05))
            .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
            // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
            // .alphaDecay(0.1)
            .on("tick", simulation2Ran)
        ;
        function simulation2Ran() {
          tempClass = "#node" + newData[1].emoji;
          viz2.selectAll(tempClass)
            .attr("fill", randomFill(2))
            .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
            // .attr("r", d => spamRadiusScale(d.frequency))
            .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
            .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

          let last = viz2.selectAll(tempClass).last();

          last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

          if (label2 == false) {
            viz2.append("text").attr("class", "spamEmoji").attr("id", "label2").text(newData[1].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
            label2 = true;

            //data text
            let textDown = viz2.append("g").attr("class", "spamEmoji");
            let textTop = viz2.append("g").attr("class", "spamEmoji");
            let textt = textTop.append("text").text(function() {
              let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                if (datapoint.emoji == newData[1].emoji) {
                  return true;
                } else {
                  return false;
                }
              })
              return newData[1].emoji + ": " + correspondingDatapoint.frequency;
            })

            .attr("x", w2/2 + 10).attr("y", h2/2 - 25)
            .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "start")
            .attr("stroke-width", 0).attr("fill","white");
            let bbox = textt.node().getBBox();
            textDown.append("rect")
              .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
              .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
              .attr("fill", randomFill(2)).attr("stroke-width", 2).attr("stroke", "black")
              .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
              ;
          }
          posX = last.attr("cx");
          posY = last.attr("cy");
          viz2.selectAll("#label2").attr("x", posX).attr("y", parseFloat(posY) + 10);

        }
        // simulation2.stop();
        // for (let i = 0; i < node2.length; ++i){
        //     simulation2.tick();
        // }
        // tempClass2 = "." + newData[1].emoji;
        // viz2.selectAll(tempClass2).transition()
        //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
        //   .attr("cx", d => d.x)
        //   .attr("cy", d => d.y);

        node3 = newData[2].frequency;
        node3.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
        simulation3.nodes(node3)
            .force("forceX", d3.forceX(w2/4).strength(0.05))
            .force("forceY", d3.forceY(3 *h2/4).strength(0.05))
            .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
            // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
            // .alphaDecay(0.1)
            .on("tick", simulation3Ran)
        ;
        function simulation3Ran() {
          tempClass = "#node" + newData[2].emoji;
          viz2.selectAll(tempClass)
            .attr("fill", randomFill(3))
            .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
            // .attr("r", d => spamRadiusScale(d.frequency))
            .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
            .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

          let last = viz2.selectAll(tempClass).last();
          last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

          if (label3 == false) {
            viz2.append("text").attr("class", "spamEmoji").attr("id", "label3").text(newData[2].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
            label3 = true;
            //data text
            let textDown = viz2.append("g").attr("class", "spamEmoji");
            let textTop = viz2.append("g").attr("class", "spamEmoji");
            let textt = textTop.append("text").text(function() {
              let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                if (datapoint.emoji == newData[2].emoji) {
                  return true;
                } else {
                  return false;
                }
              })
              return newData[2].emoji + ": " + correspondingDatapoint.frequency;
            })

            .attr("x", w2/2 - 10).attr("y", h2/2 + 25)
            .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "end")
            .attr("stroke-width", 0).attr("fill","white");
            let bbox = textt.node().getBBox();
            textDown.append("rect")
              .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
              .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
              .attr("fill", randomFill(3)).attr("stroke-width", 2).attr("stroke", "black")
              .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
            ;
          }
          posX = last.attr("cx");
          posY = last.attr("cy");
          viz2.selectAll("#label3").attr("x", posX).attr("y", parseFloat(posY) + 10);

        }
        // simulation3.stop();
        // for (let i = 0; i < node3.length; ++i){
        //     simulation3.tick();
        // }
        // tempClass3 = "." + newData[2].emoji;
        // viz2.selectAll(tempClass3).transition()
        //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
        //   .attr("cx", d => d.x)
        //   .attr("cy", d => d.y);

        node4 = newData[3].frequency;
        node4.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
        simulation4.nodes(node4)
            .force("forceX", d3.forceX(3 *w2/4).strength(0.05))
            .force("forceY", d3.forceY(3 *h2/4).strength(0.05))
            .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
            // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
            // .alphaDecay(0.1)
            .on("tick", simulation4Ran)
        ;
        function simulation4Ran() {
          tempClass = "#node" + newData[3].emoji;
          viz2.selectAll(tempClass)
            .attr("fill", randomFill(4))
            .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
            // .attr("r", d => spamRadiusScale(d.frequency))
            .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
            .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

          let last = viz2.selectAll(tempClass).last();
          last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

          if (label4 == false) {
            viz2.append("text").attr("class", "spamEmoji").attr("id", "label4").text(newData[3].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
            label4 = true;
            //data text
            let textDown = viz2.append("g").attr("class", "spamEmoji");
            let textTop = viz2.append("g").attr("class", "spamEmoji");
            let textt = textTop.append("text").text(function() {
              let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                if (datapoint.emoji == newData[3].emoji) {
                  return true;
                } else {
                  return false;
                }
              })
              return newData[3].emoji + ": " + correspondingDatapoint.frequency;
            })

            .attr("x", w2/2 + 10).attr("y", h2/2 + 25)
            .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "start")
            .attr("stroke-width", 0).attr("fill","white");
            let bbox = textt.node().getBBox();
            textDown.append("rect")
              .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
              .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
              .attr("fill", randomFill(4)).attr("stroke-width", 2).attr("stroke", "black")
              .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
              ;
          }
          posX = last.attr("cx");
          posY = last.attr("cy");
          viz2.selectAll("#label4").attr("x", posX).attr("y", parseFloat(posY) + 10);

        }
        // simulation4.stop();
        // for (let i = 0; i < node4.length; ++i){
        //     simulation4.tick();
        // }
        // tempClass4 = "." + newData[3].emoji;
        // viz2.selectAll(tempClass4).transition()
        //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
        //   .attr("cx", d => d.x)
        //   .attr("cy", d => d.y);
      } else if (state == 2) {
          // simulation1.force("forceX", w2/2).force("forceY", h2/2).force("collide", d3.forceCollide(0.5));
          // simulation2.force("forceX", w2/2).force("forceY", h2/2).force("collide", d3.forceCollide(0.5));
          // simulation3.force("forceX", w2/2).force("forceY", h2/2).force("collide", d3.forceCollide(0.5));
          // simulation4.force("forceX", w2/2).force("forceY", h2/2).force("collide", d3.forceCollide(0.5));


          simulation1.stop();
          simulation2.stop();
          simulation3.stop();
          simulation4.stop();
          viz2.selectAll(".spamEmoji").remove();
          spamEmoji = spamDotGroup.selectAll(".spamEmoji").data(d => d.frequency).enter();


          spamEmoji
            .append("circle")
              .attr("class", "spamEmoji")
              .attr("id", function (d) {
                return "node" + d3.select(this.parentNode).datum().emoji;
              })
              .attr("cx", w2/2)
              .attr("cy", h2/2)
              .attr("r", 5)
              .attr("fill", "grey")
              .attr("stroke-width", 0)
          ;

          label1 = false;
          label2 = false;
          label3 = false;
          label4 = false;

          console.log(newData);
          node1 = newData[0].frequency;
          node1.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
          simulation1.nodes(node1)
              .force("forceX", d3.forceX(w2/4).strength(0.05))
              .force("forceY", d3.forceY(h2/4).strength(0.05))
              .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
              // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
              // .alphaDecay(0.1)
              .on("tick", simulation1Ran)
          ;
          simulation1.restart();

          function simulation1Ran() {
            tempClass = "#node" + newData[0].emoji;
            viz2.selectAll(tempClass)
              .attr("fill", randomFill(1))
              .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
              // .attr("r", d => spamRadiusScale(d.frequency))
              .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
              .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

            let last = viz2.selectAll(tempClass).last();
            last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

            if (label1 == false) {
              viz2.append("text").attr("class", "spamEmoji").attr("id", "label1").text(newData[0].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
              label1 = true;

              //data text
              let textDown = viz2.append("g").attr("class", "spamEmoji");
              let textTop = viz2.append("g").attr("class", "spamEmoji");
              let textt = textTop.append("text").text(function() {
                let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                  if (datapoint.emoji == newData[0].emoji) {
                    return true;
                  } else {
                    return false;
                  }
                })
                return newData[0].emoji + ": " + correspondingDatapoint.frequency;
              })

              .attr("x", w2/2 - 10).attr("y", h2/2 - 25)
              .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "end")
              .attr("stroke-width", 0).attr("fill","white");
              let bbox = textt.node().getBBox();
              textDown.append("rect")
                .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
                .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
                .attr("fill", randomFill(1)).attr("stroke-width", 2).attr("stroke", "black")
                .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
                ;
            }
            posX = last.attr("cx");
            posY = last.attr("cy");
            viz2.selectAll("#label1").attr("x", posX).attr("y", parseFloat(posY) + 10);

          }
          // simulation1.stop();
          // for (let i = 0; i < node1.length; ++i){
          //     simulation1.tick();
          // }
          // tempClass1 = "." + newData[0].emoji;
          // viz2.selectAll(tempClass1).transition()
          //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
          //   .attr("cx", d => d.x)
          //   .attr("cy", d => d.y);


          node2 = newData[1].frequency;
          node2.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
          simulation2.nodes(node2)
              .force("forceX", d3.forceX(3 *w2/4).strength(0.05))
              .force("forceY", d3.forceY(h2/4).strength(0.05))
              .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
              // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
              // .alphaDecay(0.1)
              .on("tick", simulation2Ran)
          ;
          simulation2.restart();

          function simulation2Ran() {
            tempClass = "#node" + newData[1].emoji;
            viz2.selectAll(tempClass)
              .attr("fill", randomFill(2))
              .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
              // .attr("r", d => spamRadiusScale(d.frequency))
              .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
              .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

            let last = viz2.selectAll(tempClass).last();
            last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

            if (label2 == false) {
              viz2.append("text").attr("class", "spamEmoji").attr("id", "label2").text(newData[1].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
              label2 = true;
              //data text
              let textDown = viz2.append("g").attr("class", "spamEmoji");
              let textTop = viz2.append("g").attr("class", "spamEmoji");
              let textt = textTop.append("text").text(function() {
                let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                  if (datapoint.emoji == newData[1].emoji) {
                    return true;
                  } else {
                    return false;
                  }
                })
                return newData[1].emoji + ": " + correspondingDatapoint.frequency;
              })

              .attr("x", w2/2 + 10).attr("y", h2/2 - 25)
              .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "start")
              .attr("stroke-width", 0).attr("fill","white");
              let bbox = textt.node().getBBox();
              textDown.append("rect")
                .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
                .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
                .attr("fill", randomFill(2)).attr("stroke-width", 2).attr("stroke", "black")
                .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
                ;
            }
            posX = last.attr("cx");
            posY = last.attr("cy");
            viz2.selectAll("#label2").attr("x", posX).attr("y", parseFloat(posY) + 10);

          }
          // simulation2.stop();
          // for (let i = 0; i < node2.length; ++i){
          //     simulation2.tick();
          // }
          // tempClass2 = "." + newData[1].emoji;
          // viz2.selectAll(tempClass2).transition()
          //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
          //   .attr("cx", d => d.x)
          //   .attr("cy", d => d.y);

          node3 = newData[2].frequency;
          node3.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
          simulation3.nodes(node3)
              .force("forceX", d3.forceX(w2/4).strength(0.05))
              .force("forceY", d3.forceY(3 *h2/4).strength(0.05))
              .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
              // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
              // .alphaDecay(0.1)
              .on("tick", simulation3Ran)
          ;
          simulation3.restart();

          function simulation3Ran() {
            tempClass = "#node" + newData[2].emoji;
            viz2.selectAll(tempClass)
              .attr("fill", randomFill(3))
              .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
              // .attr("r", d => spamRadiusScale(d.frequency))
              .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
              .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

            let last = viz2.selectAll(tempClass).last();
            last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

            if (label3 == false) {
              viz2.append("text").attr("class", "spamEmoji").attr("id", "label3").text(newData[2].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
              label3 = true;
              //data text
              let textDown = viz2.append("g").attr("class", "spamEmoji");
              let textTop = viz2.append("g").attr("class", "spamEmoji");
              let textt = textTop.append("text").text(function() {
                let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                  if (datapoint.emoji == newData[2].emoji) {
                    return true;
                  } else {
                    return false;
                  }
                })
                return newData[2].emoji + ": " + correspondingDatapoint.frequency;
              })

              .attr("x", w2/2 - 10).attr("y", h2/2 + 25)
              .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "end")
              .attr("stroke-width", 0).attr("fill","white");
              let bbox = textt.node().getBBox();
              textDown.append("rect")
                .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
                .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
                .attr("fill", randomFill(3)).attr("stroke-width", 2).attr("stroke", "black")
                .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
                ;
            }
            posX = last.attr("cx");
            posY = last.attr("cy");
            viz2.selectAll("#label3").attr("x", posX).attr("y", parseFloat(posY) + 10);

          }
          // simulation3.stop();
          // for (let i = 0; i < node3.length; ++i){
          //     simulation3.tick();
          // }
          // tempClass3 = "." + newData[2].emoji;
          // viz2.selectAll(tempClass3).transition()
          //   .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
          //   .attr("cx", d => d.x)
          //   .attr("cy", d => d.y);

          node4 = newData[3].frequency;
          node4.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
          simulation4.nodes(node4)
              .force("forceX", d3.forceX(3 *w2/4).strength(0.05))
              .force("forceY", d3.forceY(3 *h2/4).strength(0.05))
              .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
              // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
              // .alphaDecay(0.1)
              .on("tick", simulation4Ran)
          ;
          simulation4.restart();
          function simulation4Ran() {
            tempClass = "#node" + newData[3].emoji;
            viz2.selectAll(tempClass)
              .attr("fill", randomFill(4))
              .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
              // .attr("r", d => spamRadiusScale(d.frequency))
              .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
              .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

            let last = viz2.selectAll(tempClass).last();
            last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

            if (label4 == false) {
              viz2.append("text").attr("class", "spamEmoji").attr("id", "label4").text(newData[3].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
              label4 = true;
              //data text
              let textDown = viz2.append("g").attr("class", "spamEmoji");
              let textTop = viz2.append("g").attr("class", "spamEmoji");
              let textt = textTop.append("text").text(function() {
                let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                  if (datapoint.emoji == newData[3].emoji) {
                    return true;
                  } else {
                    return false;
                  }
                })
                return newData[3].emoji + ": " + correspondingDatapoint.frequency;
              })

              .attr("x", w2/2 + 10).attr("y", h2/2 + 25)
              .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "start")
              .attr("stroke-width", 0).attr("fill","white");
              let bbox = textt.node().getBBox();
              textDown.append("rect")
                .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
                .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
                .attr("fill", randomFill(4)).attr("stroke-width", 2).attr("stroke", "black")
                .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
                ;
            }
            posX = last.attr("cx");
            posY = last.attr("cy");
            viz2.selectAll("#label4").attr("x", posX).attr("y", parseFloat(posY) + 10);

          }
        } else if (state == 3) {

            simulation1.stop();
            simulation2.stop();
            simulation3.stop();
            simulation4.stop();
            viz2.selectAll(".spamEmoji").remove();
            spamEmoji = spamDotGroup.selectAll(".spamEmoji").data(d => d.frequency).enter();


            spamEmoji
              .append("circle")
                .attr("class", "spamEmoji")
                .attr("id", function (d) {
                  return "node" + d3.select(this.parentNode).datum().emoji;
                })
                .attr("cx", w2/2)
                .attr("cy", h2/2)
                .attr("r", 5)
                .attr("fill", "grey")
                .attr("stroke-width", 0)
            ;

            label1 = false;

            node1 = newData[0].frequency;
            node1.forEach(function(d) { d.x = w2/2; d.y = h2/2; })
            simulation1.nodes(node1)
                .velocityDecay(0.2)
                .force("forceX", d3.forceX(w/2).strength(0.002))
                .force("forceY", d3.forceY(h/2).strength(0.002))
                .force("collide", d3.forceCollide(d => Math.sqrt(spamRadiusScale(d.frequency)) + 1))
                // .force("collide", d3.forceCollide(d => spamRadiusScale(d.frequency) + 1))
                .alphaDecay(0.125)
                .on("tick", simulation1Ran)
            ;
            simulation1.restart();

            function simulation1Ran() {
              tempClass = "#node" + newData[0].emoji;
              viz2.selectAll(tempClass)
                .attr("fill", randomFill(1))
                .attr("r", d => Math.sqrt(spamRadiusScale(d.frequency)))
                // .attr("r", d => spamRadiusScale(d.frequency))
                .attr("cx", d => d.x = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + xPadding2, Math.min(w2 - xPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.x)))
                .attr("cy", d => d.y = Math.max(Math.sqrt(spamRadiusScale(d.frequency)) + yPadding2, Math.min(h2 - yPadding2 - Math.sqrt(spamRadiusScale(d.frequency)), d.y)));

              let last = viz2.selectAll(tempClass).last();
              last.attr("r", 25).attr("stroke-width", 2).attr("stroke", "#3d3d3d");

              if (label1 == false) {
                viz2.append("text").attr("class", "spamEmoji").attr("id", "label1").text(newData[0].emoji).attr("font-size", 25).attr("x", w2/4).attr("y", h2/4).attr("text-anchor", "middle");
                label1 = true;
                //data text
                let textDown = viz2.append("g").attr("class", "spamEmoji");
                let textTop = viz2.append("g").attr("class", "spamEmoji");
                let textt = textTop.append("text").text(function() {
                  let correspondingDatapoint = totalFreqData.find(function(datapoint) {
                    if (datapoint.emoji == newData[0].emoji) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  return newData[0].emoji + ": " + correspondingDatapoint.frequency;
                })

                .attr("x", w2/2).attr("y", h2/4*3)
                .attr("font-family", "Futura").attr("font-size", 20).attr("text-anchor", "middle")
                .attr("stroke-width", 0).attr("fill","darkred");
                let bbox = textt.node().getBBox();
                textDown.append("rect")
                  .attr("x", bbox.x-bboxPadding).attr("y", bbox.y-bboxPadding)
                  .attr("width", bbox.width+2*bboxPadding).attr("height", bbox.height+2*bboxPadding)
                  .attr("fill", "white").attr("stroke-width", 2).attr("stroke", "black")
                  .attr("rx", 5).attr("ry", 5).attr("opacity", 0.8)
                  ;
              }
              posX = last.attr("cx");
              posY = last.attr("cy");
              viz2.selectAll("#label1").attr("x", posX).attr("y", parseFloat(posY) + 10);

            }
        }
      // if (state == 1) {
      //   d3.selectAll(".spamEmoji").transition()
      //     .attr("cx", chooseSpamX)
      //     .attr("cy", chooseSpamY);
      // }
      // update
      // enteringSpamGroups.attr("transform", transformSpamGroup);
      // spamEmoji;


      // some animation for removing

      setTimeout(function () {
        exitingSpamGroups.remove();
      }, 1000);



    }
    var initState = 0;
    updateSpam(initialData, 0);

    // document.getElementById("changeToForce").addEventListener("click", toForce);
    // function toForce() {
    //   updateSpam(initialData, 1);
    // }

    enterView({
    	selector: '#changeToForce',
    	enter: function(el) {
    		// el.classList.add('entered');
        // console.log(spamPercentageClicked);
        // if (spamPercentageClicked == true) {
        //   console.log("why");
        //   updateSpam(initialData, 1);
        // }
        updateSpam(initialData, 1);

    	},
    	// exit: function(el) {
    	// 	el.classList.remove('entered');
    	// },
    	// progress: function(el, progress) {
    	// 	el.style.opacity = progress;
    	// },
    	offset: 0.65, // enter at 0.7middle of viewport
    	once: true, // trigger just once
    });

    document.getElementById("changeRandomForce").addEventListener("click", randomForce);

    function randomForce() {
      ranDataIndex = Math.floor(Math.random()*212);
      randata = incomingData2.slice(ranDataIndex,ranDataIndex+4);
      updateSpam(randata, 2);
    }

    document.getElementById("changeTopForce").addEventListener("click", topForce);

    function topForce() {
      topdata = [incomingData2[1]];
      updateSpam(topdata, 3);
      document.getElementById("spam06").style.transition = "2s";
      document.getElementById("spam06").style.opacity = "1";
    }

  });

});

// document.getElementById("changeTopMostForce").addEventListener("click", topMost);
//
// function topMost() {
//
// }


// viz 3

// position
let w3 = 850;
let h3 = 450;
let h33 = 5500;
let h3Offset = h33-h3;
let xPadding3 = 10;
let xPadding30 = 30;
let yPadding3 = 40;

let viz3 = d3.select("#container3")
  .append("svg")
      .style("width", w3)
      .style("height", h3)
      // .style("outline", "solid black")
;

// legend
viz3.append("circle")
  .attr("fill", "#81d8d0")
  .attr("stroke-width", 0)
  .attr("cx", 40)
  .attr("cy", 25)
  .attr("r", 5)
;
viz3.append("text")
  .text(": Positive")
  .attr("font-family", "Futura")
  .attr("font-size", 25)
  .attr("x", 50)
  .attr("y", 30)
;
viz3.append("circle")
  .attr("fill", "#ff4242")
  .attr("stroke-width", 0)
  .attr("cx", 40)
  .attr("cy", 50)
  .attr("r", 5)
;
viz3.append("text")
  .text(": Negative")
  .attr("font-family", "Futura")
  .attr("font-size", 25)
  .attr("x", 50)
  .attr("y", 55)
;

d3.csv("data/Emoji_Sentiment_Data_v1.0.csv").then(function(incomingData3) {
  d3.csv("data/emoji_df.csv").then(function(descriptionData) {

    function filterFunction3(d) {
      let correspondingDatapoint = descriptionData.find(function(datapoint) {
        if (datapoint.emoji == d.Emoji) {
          return true;
        } else {
          return false;
        }
      })
      if (correspondingDatapoint != undefined) {
        return true;
      } else {
        return false;
      }
    }

    let xAxisGroup3 = viz3.append("g").attr("class", "xaxisgroup3").attr("transform", "translate(0,"+ (h3 - yPadding3) +")");
    let xScale3 = d3.scaleLinear().domain([0,1]).range([xPadding3, w3-xPadding3*3]);
    let xScale30 = d3.scaleLinear().domain([0,1]).range([xPadding30, w3-xPadding30*3]);
    let xAxis3 = d3.axisBottom(xScale3);
    xAxisGroup3.call(xAxis3);

    let textElement = viz3.append("text")
        // .text("hi")
        .attr("x", w3/2)
        .attr("y", yPadding3-10)
        .style("text-anchor", "middle")
        .attr("class", "description")
        .attr("font-family", "Futura")
        .attr("font-size", 30)
    ;

    let simulation = d3.forceSimulation(incomingData3)
          .force('x', d3.forceX().x(d => xScale30(d.Position)).strength(1))
          .force('y', d3.forceY().y(d => h3/2).strength(1))
          .force('collision', d3.forceCollide(6))//.radius(d => d.radius + 1))
    ;
    simulation.stop();

    for (let i = 0; i < incomingData3.length; ++i){
        simulation.tick();
    }

    let u = viz3.selectAll('.positionSwarm').data(incomingData3);
    let swarmCircle = u.enter()
      .append('circle')
        .attr("class", "positionSwarm")
        // .attr('r', d => d.radius + 1))
        .attr('r', 5)
        .style('fill', function(d) {
          if (parseFloat(d.Positive) > parseFloat(d.Negative)) {
            return "#81d8d0";
          } else {
            return "#ff4242";
          }
        })
        .merge(u)
        .attr("cx", d => d.x)
        .attr("cy", -25)
        .on("mouseover", function(d) {
          // console.log(d3.mouse(viz3.node()));
          textElement.text(d.Emoji + ": " + parseFloat(d.Position).toFixed(2));
          // d3.selectAll(".positionSwarm").attr("opacity", 0.2);
          d3.select(this)
              .attr("opacity", 0.1)
          ;
        })
        .on("mouseout", function(d) {
          // textElement.text("");
          // d3.selectAll(".positionSwarm").attr("opacity", 1);
          d3.select(this)
            .attr("opacity", 1)
          ;
        })
    ;

    enterView({
    	selector: '#position1',
    	enter: function(el) {
        console.log("IN");
        swarmCircle
          .transition().duration(1000).ease(d3.easeBounce)
          .delay(function(d,i) {
            return Math.pow(i, 1/2)*1000;
          })
          .attr('cy', d => d.y)

        ;    	},
    	exit: function(el) {
    		// el.classList.remove('entered');
    	},
    	progress: function(el, progress) {
    		// el.style.opacity = progress;
    	},
    	offset: 0.5, // enter at middle of viewport
    	once: true, // trigger just once
    });


    viz3.append("text")
        .text("👈"
        + "\xa0\xa0E\xa0m\xa0o\xa0j\xa0i\xa0s"
        + "\xa0\xa0\xa0C\xa0o\xa0u\xa0l\xa0d"
        + "\xa0\xa0\xa0F\xa0a\xa0l\xa0l"
        + "\xa0\xa0\xa0A\xa0n\xa0y\xa0w\xa0h\xa0e\xa0r\xa0e\xa0."
        + "\xa0\xa0👉")
        .attr("font-family", "Futura")
        .attr("font-size", 23.5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("x", (w3+xPadding3-xPadding30)/2)
        .attr("y", h3 - yPadding3*1.2)
    ;

  })
});
// viz 4

// combination
d3.json("data/comb0.json").then(gotData);


let w = 850;
let h = 835;
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
  // console.log("shuffle");
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
  // console.log(emojiPosList);
  // console.log(incomingData);

  d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
    });
  };


  let graphGroup = viz4.append("g").attr("class", "graphGroup");

  let pathGroup = graphGroup.append("g").attr("class", "pathGroup");
  let emojiGroup = graphGroup.append("g").attr("class", "emojiGroup");

  // let datagroups = graphGroup.selectAll(".emoji").data(incomingData, function(d,i) { return d.emoji });


  // console.log("creating lines");

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

  // console.log("creating emojis");
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
    // console.log(showList);
    // console.log(targetList);
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

document.getElementById("combSt1").addEventListener("click", showCombSt1)
function showCombSt1() {
  document.getElementById("st1").style.transition = "1s";
  document.getElementById("st1").style.opacity = 1;
}
document.getElementById("combSt2").addEventListener("click", showCombSt2)
function showCombSt2() {
  document.getElementById("st2").style.transition = "1s";
  document.getElementById("st2").style.opacity = 1;
}
document.getElementById("combSt3").addEventListener("click", showCombSt3)
function showCombSt3() {
  document.getElementById("st3").style.transition = "1s";
  document.getElementById("st3").style.opacity = 1;
}

// viz 5

// text Sentiment vs.emoji sentiment

let w5 = 1300;
let h5 = 600;
let h55 = 7000;
let mid = w5/2;
let h5Offset = h55-h5;
let xPadding5 = 75;
let yPadding5 = 75;

let viz5 = d3.select("#container5")
  .append("svg")
      .style("width", w5)
      .style("height", h5)
      // .style("outline", "solid black")
;

function filterPos(d) {
  if (d.sentiment.compound > 0) {
    return true;
  } else {
    return false;
  }
}
function filterNeg(d) {
  if (d.sentiment.compound < 0) {
    return true;
  } else {
    return false;
  }
}

function filterNeu(d) {
  if (d.sentiment.compound == 0) {
    return false;
  } else {
    return true;
  }
}

d3.json("data/new_data.json").then(function (incomingData5) {
  console.log(incomingData5);

  let posData = incomingData5.filter(filterPos);
  let negData = incomingData5.filter(filterNeg);
  incomingData5 = incomingData5.filter(filterNeu);

  console.log(posData,negData);

  // let posExtent = d3.extent(posData, function(d) {
  //   return d.emoji_total;
  // })
  // let negExtent = d3.extent(negData, function(d) {
  //   return d.emoji_total;
  // })
  // let extent = d3.extent(incomingData5, function(d) {
  //   return d.emoji_total;
  // });
  let min = d3.min(incomingData5, function(d) {
    return d.emoji_total;
  });
  let max = d3.max(incomingData5, function(d) {
    return d.emoji_total;
  });


  let xScalePos = d3.scaleLinear().domain([min, -1, 1, max]).range([xPadding5,(w5-xPadding5-mid)/2 - 150,(w5-xPadding5-mid)/2 + 150, mid-xPadding5]);
  let xScaleNeg = d3.scaleLinear().domain([min, -1, 1, max]).range([mid+xPadding5, (mid+w5-xPadding5)/2 - 150,(mid+w5-xPadding5)/2 + 150, w5-xPadding5]);

  let posYExt = d3.extent(posData, function(d) {
    // return d.sentiment.compound;
    return d.sentiment.neu;
  })
  let negYExt = d3.extent(posData, function(d) {
    // return d.sentiment.compound;
    return d.sentiment.neu;
  })
  let yScalePos = d3.scaleLinear().domain(posYExt).range([h5-yPadding5, yPadding5]);
  let yScaleNeg = d3.scaleLinear().domain(negYExt).range([h5-yPadding5, yPadding5]);

  let posGroup = viz5.append("g").attr("class", "pos");
  let negGroup = viz5.append("g").attr("class", "neg");

  let posXAxisGroup6 = posGroup.append("g").attr("class", "posXAxisGroup");
  let posYAxisGroup6 = posGroup.append("g").attr("class", "posYAxisGroup");
  let negXAxisGroup6 = negGroup.append("g").attr("class", "negXAxisGroup");
  let negYAxisGroup6 = negGroup.append("g").attr("class", "negYAxisGroup");

  let pX = d3.axisBottom(xScalePos);
  posXAxisGroup6.call(pX);
  posXAxisGroup6.attr("transform", "translate(0," + (h5-yPadding5) + ")");

  let pY = d3.axisLeft(yScalePos);
  posYAxisGroup6.call(pY);
  posYAxisGroup6.attr("transform", "translate(" + xPadding5 + ",0)");


  posXAxisGroup6.append("text")
      .attr("transform",
          "translate(" + (mid/2) + " ," + yPadding5 / 1.5 + " )")
      .style("text-anchor", "middle")
      .text("Sentiment Score")
      .attr("fill", "black")
      .attr("font-size", 25)
      .attr("font-family", "Futura")
      .attr("font-weight", "bold")
  ;
  posYAxisGroup6.append("text")
      .attr("y", 0 - xPadding5)
      .attr("x",0 - (h5 / 2))
      .attr("transform", "rotate(-90)")
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Neutrality")
      .attr("fill", "black")
      .attr("font-size", 25)
      .attr("font-family", "Futura")
      .attr("font-weight", "bold")
  ;

  let nX = d3.axisBottom(xScaleNeg);
  negXAxisGroup6.call(nX);
  negXAxisGroup6.attr("transform", "translate(0," + (h5-yPadding5) + ")");

  let nY = d3.axisLeft(yScaleNeg);
  negYAxisGroup6.call(nY);
  negYAxisGroup6.attr("transform", "translate(" + (mid+xPadding5) + ",0)");



  negXAxisGroup6.append("text")
      .attr("transform",
          "translate(" + (mid + mid/2) + " ," + yPadding5 / 1.5 + " )")
      .style("text-anchor", "middle")
      .text("Sentiment Score")
      .attr("fill", "black")
      .attr("font-size", 25)
      .attr("font-family", "Futura")
      .attr("font-weight", "bold")
  ;
  negYAxisGroup6.append("text")
      .attr("y", 0 - xPadding5)
      .attr("x",0 - (h5 / 2))
      .attr("transform", "rotate(-90)")
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Neutrality")
      .attr("fill", "black")
      .attr("font-size", 25)
      .attr("font-family", "Futura")
      .attr("font-weight", "bold")
  ;


  let posGraphGroup = viz5.append("g").attr("class", "posGraphGroup");
  let negGraphGroup = viz5.append("g").attr("class", "negGraphGroup");

  // legend
  // scatterPlot text support: Positive, Negative
  posGraphGroup.append("text")
      .text("Positive")
      .attr("x", 100)
      .attr("y", 100)
      .attr("font-size", 25)
      .attr("fill", "#81d8d0")
      .attr("font-family", "Futura")
  ;
  negGraphGroup.append("text")
      .text("Negative")
      .attr("x", mid+100)
      .attr("y", 100)
      .attr("font-size", 25)
      .attr("fill", "#ff4242")
      .attr("font-family", "Futura")
  ;


  let ps = posGraphGroup.selectAll(".posGraph").data(posData).enter();
  let ng = negGraphGroup.selectAll(".negGraph").data(negData).enter();

  let psT = ps.append("circle")
    .attr("class", "posGraph")
    .attr("cx", d => xScalePos(d.sentiment.compound))
    .attr("cy", d => yScalePos(d.sentiment.neu))
    .attr("r", 5)
    .attr("fill", "grey")
    .attr("opacity", 0)
  ;
  let ngT = ng.append("circle")
    .attr("class", "negGraph")
    .attr("cx", d => xScaleNeg(d.sentiment.compound))
    .attr("cy", d => yScaleNeg(d.sentiment.neu))
    .attr("r", 5)
    .attr("fill", "grey")
    .attr("opacity", 0)
  ;
  let psE = ps.append("circle")
    .attr("class", "posGraph")
    .attr("cx", d => xScalePos(d.emoji_total))
    .attr("cy", d => yScalePos(d.sentiment.neu))
    .attr("r", 5)
    .attr("fill", "#81d8d0")
    .attr("opacity", 0)
  ;
  let ngE = ng.append("circle")
    .attr("class", "negGraph")
    .attr("cx", d => xScaleNeg(d.emoji_total))
    .attr("cy", d => yScaleNeg(d.sentiment.neu))
    .attr("r", 5)
    .attr("fill", "#ff4242")
    .attr("opacity", 0)
  ;
  document.getElementById("btnSentiText").addEventListener("click", showSentiText);
  document.getElementById("btnwSentiEmo").addEventListener("click", showSentiEmo);

  btnSentiTextClicked = false;

  function showSentiText() {
    if (btnSentiTextClicked == false) {
      psT.transition().delay(function (d,i) {
        return i*4;
      }).attr("opacity", 0.5);
      ngT.transition().delay(function (d,i) {
        return i*4;
      }).attr("opacity", 0.5);
      btnSentiTextClicked = true;
    }
  }
  function showSentiEmo() {
    if (btnSentiTextClicked == true) {
      psE.transition().delay(function (d,i) {
        return i*10;
      }).attr("opacity", 0.8);
      ngE.transition().delay(function (d,i) {
        return i*10;
      }).attr("opacity", 0.6);
    }
  }


})

// Ending

let w6 = 500;
let h6 = 1050;
let xPadding6 = 25;
let yPadding6 = 25;


let viz6 = d3.select("#container6")
  .append("svg")
      .style("width", w6)
      .style("height", h6)
      // .style("outline", "solid black")
;

d3.json("data/randEmojiList.json").then(function(incomingData6) {

  viz6.selectAll("finalEmoji").data(incomingData6).enter()
    .append("text")
      .text(d => d)
      .attr("font-size", 20)
      .attr("x", function () {
        return xPadding6 + Math.random()*(w6-xPadding6*2);
      })
      .attr("y", function() {
        return yPadding6 + Math.random()*(h6-yPadding6*2);
      })
      .attr("text-anchor", "middle")

})

document.getElementById("Ending0").addEventListener("click", clickEnd)

function clickEnd() {
  document.getElementById("Ending0").style.opacity = 0;
  document.getElementById("Ending1").style.opacity = 1;
  document.getElementById("Ending1").style.zIndex = 1;
  document.getElementById("Ending2").style.opacity = 1;
  window.scrollTo(0, 10000);
}
