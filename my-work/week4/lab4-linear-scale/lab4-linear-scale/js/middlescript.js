let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightblue")
;

function gotData(incomingData){
  console.log(incomingData);

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  let yScale = d3.scaleLinear().domain([0, 850]).range([0, h / 2]);
  let colorScale = d3.scaleLinear().domain([300, 450, 850]).range(["black", "orange", "yellow"]);

  function getHeight(d, i) {
    return yScale(d.height);
  }

  function getYPosition(d, i) {
    return - yScale(d.height);
  }

  function getColor(d, i) {
    return colorScale(d.height);
  }

  let towers = datagroups
    .append("rect")
      .attr("class", "tower")
      .attr("x", 0)
      .attr("y", getYPosition)
      .attr("width", 20)
      .attr("height", getHeight)
      .attr("fill", getColor)
  ;

  function getName(d,i) {
    return d.name;
  }

  let labels = datagroups
    .append("text")
      .attr("class", "name")
      .text(getName)
      .attr("x", 5)
      .attr("y", -4)
      .attr("transform", "rotate(90)")
      .style("font-family", "Roboto")
  ;

  function getGroupPosition(d, i) {
    let x = (w/100) * i;
    let y = h / 2;
    return "translate(" + x + ", " + y + ")";
  }
  datagroups.attr("transform", getGroupPosition);


}


d3.json("buildings.json").then(gotData);
