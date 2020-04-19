

let w1 = 1100;
let h1 = 750;
let xPadding1 = 75;
let yPadding1 = 75;
let mouseXOffset = 5;
let mouseYOffset = 5;

let viz = d3.select("#container1")
  .append("svg")
    .style("width", w1)
    .style("height", h1)
    .style("outline", "solid black")
;

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
        .attr("transform", "translate(0,"+(h1-yPadding1)+")")
    ;
    xAxisGroup1.call(xAxis1);

    // grid lines
    let xgrid = viz.append("g")
        .attr("id", "xgrid")
        .attr("class", "grid")
        .attr("transform", "translate(0," + (h1-yPadding1) + ")")
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
    ;

    let yDomain1 = d3.extent(incomingData1, function(d) { return d.neutrality});
    let yScale1 = d3.scaleLinear().domain(yDomain1).range([h1-yPadding1, yPadding1]);
    let yAxis1 = d3.axisLeft(yScale1);
    let yAxisGroup1 = viz.append("g")
        .attr("class", "yaxisgroup1")
        .attr("transform", "translate("+(xPadding1)+", 0)")
    ;
    yAxisGroup1.call(yAxis1);

    yAxisGroup1.append("text")
        .attr("y", 0 - xPadding1)
        .attr("x",0 - (h1 / 2))
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Neutrality")
        .attr("fill", "black")
        .attr("font-size", 25)
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
        .attr("height", h1 )
        .attr("x", 0)
        .attr("y", 0)
    ;

    var brush = d3.brush()
      .extent([[xPadding1, yPadding1], [w1-xPadding1, h1-yPadding1]])
      .on("end", updateChart);

    var scatter = viz.append('g')
        .attr("clip-path", "url(#clip)")
    ;

    scatter
      .append("g")
        .attr("class", "brush")
          .call(brush)
    ;

    scatter
      .selectAll(".datagroup1")
      .data(incomingData1)
      .enter()
      .append("text")
        .text(function(d) { return d.Emoji})
        .attr("id", giveScatterPlotEmojiID)
        .attr("class", "datagroup1")
        .attr("x", getScatterPlotEmojiX)
        .attr("y", getScatterPlotEmojiY)
        .attr("font-size", getEmojiFontSize)
        .attr("fill", "black")
        .attr("opacity", 1)
        .style("text-anchor", "middle")
        .on("mouseover", showDetail)
        .on("mouseout", hideDetail)
    ;



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
      if (y >= h1/2) {
        y = 0.8 * y;
      } else {
        y = 1.3 * y;
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
    }

    document.getElementById("testButton").addEventListener("click", zoomInSpecific)

    function zoomInSpecific() {
      selection = [[w1/2,h1/2], [w1,h1]]
      updateChart(selection);
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
