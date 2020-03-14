let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
;

// left corner big circle
viz.append("circle")
    .attr("cx", 150)
    .attr("cy", 550)
    .attr("r", 500)
    .attr("fill", "#f6e8ff")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// mid big circle
viz.append("circle")
    .attr("cx", 650)
    .attr("cy", 20)
    .attr("r", 175)
    .attr("fill", "#ffede8")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;


// line connecting two small circle
viz.append("line")
    .attr("x1", 300)
    .attr("y1", 400)
    .attr("x2", 600)
    .attr("y2", 100)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;


// left small circle
viz.append("circle")
    .attr("cx", 300)
    .attr("cy", 400)
    .attr("r", 15)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// mid small circle
viz.append("circle")
    .attr("cx", 600)
    .attr("cy", 100)
    .attr("r", 15)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;



// top right polygon
viz.append("polygon")
    .attr("points", "950,50 1150,250 1350,50 1150,-150")
    .attr("fill", "#e8f2ff")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// mid bottom circle
viz.append("circle")
    .attr("cx", 780)
    .attr("cy", 700)
    .attr("r", 75)
    .attr("fill", "#e8ffef")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// small fork
// fork mid line
viz.append("line")
    .attr("x1", 900)
    .attr("y1", 700)
    .attr("x2", 1075)
    .attr("y2", 700)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork top line
viz.append("line")
    .attr("x1", 1000)
    .attr("y1", 650)
    .attr("x2", 1075)
    .attr("y2", 650)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork bottom line
viz.append("line")
    .attr("x1", 1000)
    .attr("y1", 750)
    .attr("x2", 1075)
    .attr("y2", 750)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork connect top line
viz.append("line")
    .attr("x1", 1000)
    .attr("y1", 650)
    .attr("x2", 975)
    .attr("y2", 700)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork connect bottom line
viz.append("line")
    .attr("x1", 1000)
    .attr("y1", 750)
    .attr("x2", 975)
    .attr("y2", 700)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;
// small left circle
viz.append("circle")
    .attr("cx", 900)
    .attr("cy", 700)
    .attr("r", 10)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork circle top
viz.append("circle")
    .attr("cx", 1075)
    .attr("cy", 650)
    .attr("r", 10)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork circle mid
viz.append("circle")
    .attr("cx", 1075)
    .attr("cy", 700)
    .attr("r", 10)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// fork circle bottom
viz.append("circle")
    .attr("cx", 1075)
    .attr("cy", 750)
    .attr("r", 10)
    .attr("fill", "lightgrey")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// right most circle
viz.append("circle")
    .attr("cx", 1325)
    .attr("cy", 700)
    .attr("r", 200)
    .attr("fill", "#e8fffa")
    .attr("stroke", "black")
    .attr("stroke-width", 5)
;

// text
// title
viz.append("text")
    .text("Food")
    .attr("fill", "black")
    .attr("x", 725)
    .attr("y", 350)
    .attr("font-family", "Roboto")
    .attr("font-size", 130)
    .attr("font-weight", 350)
;
viz.append("text")
    .text("Step")
    .attr("fill", "black")
    .attr("x", 775)
    .attr("y", 500)
    .attr("font-family", "Roboto")
    .attr("font-size", 130)
    .attr("font-weight", 350)
;
// description
viz.append("text")
    .text("A Record on")
    .attr("fill", "black")
    .attr("x", 50)
    .attr("y", 500)
    .attr("font-family", "Roboto")
    .attr("font-size", 50)
    .attr("font-weight", 350)
;
viz.append("text")
    .text("A Week's Food")
    .attr("fill", "black")
    .attr("x", 100)
    .attr("y", 600)
    .attr("font-family", "Roboto")
    .attr("font-size", 50)
    .attr("font-weight", 350)
;
viz.append("text")
    .text("2/25 - 3/1")
    .attr("fill", "black")
    .attr("x", 150)
    .attr("y", 700)
    .attr("font-family", "Roboto")
    .attr("font-size", 50)
    .attr("font-weight", 350)
;
