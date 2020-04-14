let w = 1200;
let h = 800;
let padding = 90

newProjectionFunctionArray = [d3.geoAzimuthalEqualArea(),d3.geoAzimuthalEquidistant(),d3.geoGnomonic(), d3.geoOrthographic(), d3.geoStereographic(),d3.geoEqualEarth(),d3.geoConicConformal(),d3.geoConicEqualArea(), d3.geoConicEquidistant(), d3.geoEquirectangular(), d3.geoMercator(), d3.geoTransverseMercator(), d3.geoNaturalEarth1()]
newProjectionNameArray = ["geoAzimuthalEqualArea", "geoAzimuthalEquidistant","geoGnomonic","geoOrthographic","geoStereographic","geoEqualEarth","geoConicConformal","geoConicEqualArea", "geoConicEquidistant", "geoEquirectangular", "geoMercator", "geoTransverseMercator", "geoNaturalEarth1"]
// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "grey")
;

function processRoutes(d) {
  // return [d[1]]
  d3.shuffle(d);
  d = d.slice(0,d.length / 10);
  return d;
}

// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
  d3.json("mainland.geojson").then(function(landData) {
    d3.csv("airports/routes.csv").then(function(incomingData) {
      d3.csv("airports/airport.csv").then(function(locationData) {

        incomingData = processRoutes(incomingData);

        // incomingData.map(function (d, i) {
        //   d.population = Number(d.population);
        //   return d
        // })
        //
        // let minPop = d3.min(incomingData, function(d, i) {
        //   return d.population;
        // })
        // let maxPop = d3.max(incomingData, function(d, i) {
        //   return d.population;
        // })
        // console.log(minPop, maxPop);
        //
        // let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(["white", "blue"])
        // // PRINT DATA
        // console.log(geoData);

        // SCALES (to translate data values to pixel values)
        // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
        // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
        // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
        // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);


        let projection = d3.geoEqualEarth()
            .translate([w/2, h/2])
            // // .center([103.8, 34.1])
            .fitExtent([[padding,padding], [w-padding, h-padding]], geoData)
        ;

        // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
        // let lineMaker = d3.line()
        //     .x(function(d){
        //       return xScale(Number(d.year));
        //     })
        //     .y(function(d){
        //       return yScale(Number(d.birthsPerThousand));
        //     })
        // ;


        let pathMaker = d3.geoPath(projection);

        // CREATE SHAPES ON THE PAGE!
        let mapPathGroup = viz.append("g").attr("class", "mapPathGroup");

        let mapPath = mapPathGroup.selectAll(".country").data(geoData.features).enter()
          .append("path")
            .attr("class", "country")
            .attr("d", pathMaker)
            // .attr("fill", function(d, i) {
            //   console.log(d.properties.name);
            //   let correspondingDatapoint = incomingData.find(function(datapoint) {
            //     if (datapoint.province == d.properties.name){
            //       return true
            //     } else {
            //       return false
            //     }
            //   })
            //   console.log(correspondingDatapoint);
            //   if (correspondingDatapoint != undefined) {
            //     console.log(correspondingDatapoint.population);
            //     return colorScale(correspondingDatapoint.population)
            //   } else {
            //     return "black"
            //   }
            // })
            .attr("fill", "black")
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
        ;
        function getLatOrLon(d,sod,lol) {
          let correspondingDatapoint = locationData.find(function(datapoint) {
            if (sod == "source") {
              if (datapoint.IATA == d.source_airport){
                return true
              } else {
                return false
              }
            } else if (sod == "des") {
              if (datapoint.IATA == d.destination_airport){
                return true
              } else {
                return false
              }
            }
          })
          if (correspondingDatapoint != undefined) {
            if (lol == "lat") {
              return correspondingDatapoint.latitude;
            } else if (lol == "lon") {
              return correspondingDatapoint.longtitude;
            }
          }
        }

        function getRoute(d) {
          let startLat = getLatOrLon(d,"source", "lat");
          let startLon = getLatOrLon(d,"source","lon");
          let desLat = getLatOrLon(d,"des", "lat");
          let desLon = getLatOrLon(d,"des", "lon");

          if (startLat != undefined && startLon != undefined && desLat != undefined && desLon != undefined) {
            // var geoLineString = {
            //   "type": "LineString",
            //   "coordinates": [[startLat, startLon], [desLat, desLon]]};
            // return geoLineString;
            let startPos = projection([startLon,startLat]);
            let desPos = projection([desLon,desLat])
            return "M" + startPos[0] + " " + startPos[1] + " " + desPos[0] + " " + desPos[1];

            // let referencePointX;
            // let referencePointY;
            // return "M" + startX + " " + startY + " " + "Q " + referencePointX + " " + referencePointY + " " + desX + " " + desY;

          } else {
            // var geoLineString = {
            //   "type": "LineString",
            //   "coordinates": [[0, 0], [0, 0]]};
            // return geoLineString;
            return "M0 0";
          }

        }


        let routeGroup = viz.append("g").attr("class", "routeGroup");
        let route = routeGroup.selectAll(".route").data(incomingData).enter()
          .append("path")
            .attr("class", "route")
            // .datum(getRoute)
            // .attr("d", d3.geoPath(projection))
            .attr("d", getRoute)
            .attr("stroke", "#95ff00")
            .attr("stroke-width", 1)
            .attr("opacity", 0.1)
            // .attr("stroke-width", 1)
            // .attr("opacity", 1)
            .attr("fill", "transparent")
        ;



        let nyulat = 31.22773;
        let nyulon = 121.52946;
        let pixelvalue = projection([nyulon, nyulat]);

        let nyush = viz.append("circle")
            .attr("cx", pixelvalue[0])
            .attr("cy", pixelvalue[1])
            .attr("r", 5)
            .attr("fill", "#57068C")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
        ;

        let title = viz.append("text")
            .text("World Flight Route")
            .attr("font-family", "Futura")
            .attr("font-size", 50)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("x", 650)
            .attr("y", 60)
        ;
        let sub = viz.append("text")
            .text("[Data filtered to save loading time.]")
            .attr("font-family", "Futura")
            .attr("font-size", 30)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("x", 650)
            .attr("y", 100)
        ;

        let projectionText = viz.append("text").attr("id", "projectionText")
            .text("Current Projection: geoEqualEarth")
            .attr("font-family", "Futura")
            .attr("font-size", 30)
            .attr("x", 20)
            .attr("y", 50)
        ;

        projectionIndex = 0
        function changeProjection() {
          if (projectionIndex == newProjectionFunctionArray.length) {
            projectionIndex = 0;
          }
          n_p = newProjectionFunctionArray[projectionIndex];
          n_pName = newProjectionNameArray[projectionIndex];
          projection = n_p
              .translate([w/2, h/2])
              // .center([103.8, 34.1])
          ;
          if (n_pName != "geoConicConformal") {
            projection.fitExtent([[padding,padding], [w-padding, h-padding]], geoData)
          }
          ;
          let newPathMaker = d3.geoPath(projection);
          mapPath.attr("d", newPathMaker);

          // nyu
          let newPixelvalue = projection([nyulon, nyulat]);
          nyush.attr("cx", newPixelvalue[0]).attr("cy", newPixelvalue[1]);
          console.log("newPath");

          // route
          // route.datum(getRoute)
          route.attr("d",getRoute);

          // displayer

          projectionText.text(function(d) {
            return "Current Projection: " + n_pName;
          });

          projectionIndex += 1;

        }
        document.getElementById("changeProjection").addEventListener("click", changeProjection);
        function zoomInOut() {
          console.log("btnpressed");
          // d3.json("mainland.geojson").then(function(land1Data) {
          // let mapPath = mapPathGroup.selectAll(".country").data(land1Data.features).enter()
          //   .append("path")
          //     .attr("class", "country")
          //     .attr("d", pathMaker)
          //     .attr("fill", "black")
          //     .attr("stroke", "grey")
          //     .attr("stroke-width", 1)
          // ;
          // // let newPixelvalue = projection([nyulon, nyulat]);
          // // nyush.attr("cx", newPixelvalue[0]).attr("cy", newPixelvalue[1]);
          // // console.log("newPath");
          // //
          // // // route
          // // // route.datum(getRoute)
          // // route.attr("d",getRoute);
          //
          // })
        };

        document.getElementById("zoom").addEventListener("click", zoomInOut);

        console.log(incomingData);

        function getShAp(datapoint) {
          if (datapoint.source_airport == "PVG" || datapoint.source_airport == "SHA") {
            return true;
          } else {
            return false;
          }
        }
        shAirportArray = incomingData.filter(getShAp);
        function updateRoute() {
          var g = routeGroup.append("g").attr("class", "active")
          for (var n = 0; n < shAirportArray.length; n++) {
            g.append("path")
                .attr("stroke", "#00ff15")
                .attr("stroke-width", 2)
                .attr("opacity", 1)
                .attr("fill", "transparent")
                .style("stroke-dasharray", "0,1000")
                .transition()
                  .duration(1000)
                  .ease(d3.easeCubicIn)
                .attr("d", getRoute(shAirportArray[n]))
                .style("stroke-dasharray", "1000,1000")
          }
          routeGroup.transition().delay(1500).selectAll(".active").remove();
        }
        setInterval(function(){
          updateRoute();
        }, 2000);

      })
    })
  })
})
