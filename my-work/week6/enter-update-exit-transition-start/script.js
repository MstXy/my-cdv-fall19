let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  // restructure data to get min and max
  let mergedData = d3.merge(incomingData);
  console.log(mergedData);

  // x Scale
  let maxX = d3.max(mergedData, function(d){return d.x});

  let xScale = d3.scaleLinear().domain([0, maxX]).range([xPadding, w-xPadding]);
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);
  xAxisGroup.attr("transform", "translate(0, " + (h-yPadding) + ")");

  // y Scale
  let maxY = d3.max(mergedData, function(d){return d.y});
  let yScale = d3.scaleLinear().domain([0, maxY]).range([h-yPadding, yPadding]);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate(" + xPadding + ", 0)");


  // group for viz
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  function getGroupLocation(d, i) {
    let x = xScale(d.x);
    let y = yScale(d.y);
    return "translate(" + x + ", " + y + ")"
  }
  function getIncomingGroupLocation(d, i) {
    let x = xScale(d.x);
    let y = -30;
    return "translate(" + x + ", " + y + ")"
  }
  function getExitingGroupLocation(d, i) {
    let x = xScale(d.x);
    let y = h + 30;
    return "translate(" + x + ", " + y + ")"
  }
  let dataIndex = 0;

  // visualize data
  function visualizeData() {
    // get data
    let dataToShow = incomingData[dataIndex];

    // assign Key to each data point, make their visualization identifiable for D3.
    function assignKey(d, i) {
      return d.name;
    }

    // viz
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow, assignKey);

    // Entering elements
    let enteringElements = datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
        .attr("r", 30)
        .attr("fill", "red")
    ;

    enteringElements.append("text")
        .text(function(d){return d.name})
        .attr("x", -17)
        .attr("y", 17)
        .attr("font-family", "Microsoft Sans Serif")
        .attr("font-size", "3em")
        .attr("fill", "white")
    ;

    enteringElements.attr("transform", getIncomingGroupLocation).transition().delay(500).duration(500).attr("transform", getGroupLocation);

    // Exiting elemnts
    let exitingElements = datagroups.exit();
    exitingElements.transition().duration(500).attr("transform", getExitingGroupLocation).remove();


    // Updating elements
    // transition
    datagroups.transition().duration(500).attr("transform", getGroupLocation);

  }

  // step1
  document.getElementById('step1').addEventListener("click", function() {
    dataIndex = 0;
    visualizeData();
  });
  // step2
  document.getElementById('step2').addEventListener("click", function() {
    dataIndex = 1;
    visualizeData();
  });
  // step3
  document.getElementById('step3').addEventListener("click", function() {
    dataIndex = 2;
    visualizeData();
  });
  // step4
  document.getElementById('step4').addEventListener("click", function() {
    dataIndex = 3;
    visualizeData();
  });
  // step5
  document.getElementById('step5').addEventListener("click", function() {
    dataIndex = 4;
    visualizeData();
  });



}



d3.json("data.json").then(gotData);
