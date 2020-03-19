let w = 1200;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lavender")
;

function gotData(incomingData){
  // all the data:
  console.log(incomingData);


  function filterFunction(datapoint) {
    if (datapoint.Code == "USA" || datapoint.Code == "CHN") {
      return true;
    } else {
      return false;
    }

  }
  let filteredData = incomingData.filter(filterFunction);
  console.log(filteredData);

  // JS DATE OBJECTS
  let yearToDateObjectConverter = d3.timeParse("%Y");

  // // "14:04"
  // let convertHoursAndMinutes = d3.timeParse("%H:%M");
  // console.log(convertHoursAndMinutes("14:15"));
  function mapFunction(datapoint) {
    datapoint.Year = yearToDateObjectConverter(datapoint.Year)
    datapoint["Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"] = parseFloat(datapoint["Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)"])
    return datapoint;
  }

  let filteredAndTimedAdjustedData = filteredData.map(mapFunction);

  // X Scale

  // MIN
  let minTime = d3.min(filteredAndTimedAdjustedData, function(d) {return d.Year});
  // MAX
  let maxTime = d3.max(filteredAndTimedAdjustedData, function(d) {return d.Year});

  // Extent: get the min and max same time
  let alternativeXDomain = d3.extent(filteredAndTimedAdjustedData, function(d) {return d.Year});

  console.log(minTime, maxTime);

  let xPadding = 50;
  // let xScale = d3.scaleTime().domain([minTime, maxTime]).range([xPadding, w - xPadding]);

  let xScale = d3.scaleTime().domain(alternativeXDomain).range([xPadding, w - xPadding]);

  // X Axis

  let xAxisGroup = viz.append("g")
      .attr("class", "xaxis")
  ;
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 30;
  xAxisGroup.attr("transform", "translate(0," + xAxisYPos + ")");


  // Y Scale

  let valueKey = "Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)";

  let hivCaseCountExtent = d3.extent(filteredAndTimedAdjustedData, function (d) { return d[valueKey]});

  let yPadding = 50;
  let yScale = d3.scaleLinear().domain(hivCaseCountExtent).range([h - yPadding, yPadding]);

  // Y Axis
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);

  yAxisGroup.call(yAxis);
  let yAxisXPos = xPadding - 10;
  yAxisGroup.attr("transform", "translate(" + yAxisXPos + ",0)");

  let vizGroup = viz.append("g").attr("class", "vizGroup");

  let dataGroups = vizGroup.selectAll(".datagroup").data(filteredData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  // let circles = dataGroups.append("circle")
  //     .attr("cx", 0)
  //     .attr("cy", 0)
  //     .attr("r", 5)
  //     .attr("fill", function (d) { return  (d.Code == "CHN") ? "Red" : "grey"})
  // ;


  let shape = `<polygon points="61.93 108.58 54.08 196.51 165.57 218.49 297.64 253.04 200.11 168.25 335.16 180.81 335.16 135.27 272.35 108.58 229.95 33.2 176.56 97.58 61.93 108.58" style="fill: #231f20"/>
  <polygon points="205.63 33.2 167.45 80.25 71.6 88.82 48.22 88.82 41.2 160.52 9.25 43.62 127.7 16.35 205.63 33.2" style="fill: #231f20"/>
  <polygon points="259.4 59.21 282 94.28 323.3 111.42 329.54 24.14 238.36 33.2 259.4 59.21" style="fill: #231f20"/>
  <path d="M62.24,244.68s330.15,49.94,205-56.11S36.78,14.1,178.89,71.68,360.71,38.17,360.71,38.17" style="fill: none;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 13px"/>`;

  let customShapes = dataGroups.append("g").attr("class", "customShapes").html(shape);
  customShapes.attr("transform", "scale(0.2)")

  // !!Inline styling is not mutable!!
  customShapes.select("path").attr("stroke", function (d) { return  (d.Code == "CHN") ? "Red" : "grey"});


  // let countryLabel = dataGroups.append("text")
  //     .attr("x", 8)
  //     .attr("y", 8)
  //     .text(function(d) {return d.Code})
  // ;
  // let yearLabel = dataGroups.append("text")
  //     .attr("x", 8)
  //     .attr("y", 23)
  //     .text(function(d) {return d.Year.getFullYear()})
  // ;


  function getTranslate(d, i) {
    let x = xScale( d.Year );
    let y = yScale( d[valueKey]);
    return "translate(" + x + ", " + y + ")";
  }
  dataGroups.attr("transform", getTranslate)




}

d3.csv("new-cases-of-hiv-infection.csv").then(gotData);
