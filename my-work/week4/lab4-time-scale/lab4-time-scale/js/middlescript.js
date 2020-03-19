let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightpink")
;

function filterFunction(datapoint) {
  if (datapoint.fame_score > 150) {
    return true;
  } else {
    return false;
  }
}

let timeParseFunction = d3.timeParse("%Y");

function mapFunction(datapoint) {
  datapoint.death_year = timeParseFunction(datapoint.death_year);
  return datapoint;
}

function transformData(dataToTransform) {
  let newData = dataToTransform.filter(filterFunction);

  let timeCorrected = newData.map(mapFunction);

  return timeCorrected;
}

function gotData(incomingData){
  console.log(incomingData);
  let transformedData = transformData(incomingData);

  function getYear(datapoint) {
    return datapoint.death_year;
  }
  let minimumYear = d3.min(transformedData, getYear);
  let maximumYear = d3.max(transformedData, getYear);

  let padding = 100;
  let timeScale = d3.scaleTime().domain([minimumYear, maximumYear]).range([padding, w - padding]);

  let datagroups = viz.selectAll(".datagroup").data(transformedData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  let circels = datagroups
    .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 10)
      .attr("fill", "white")
  ;

  let labels = datagroups
    .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text(function(d){return d.name + " " + d.death_year.getFullYear()})

  ;

  function positionGroup(d, i) {
    let x = timeScale(d.death_year);
    let y = padding + Math.random() * (h - padding * 2);
    return "translate(" + x + ", " + y + ")";
  }
  datagroups.attr("transform", positionGroup)

}


d3.json("celebrity_deaths.json").then(gotData);
