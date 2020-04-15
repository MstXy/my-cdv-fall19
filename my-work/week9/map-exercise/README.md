### Lab Exercise - Map Exercise

A visualization on the world's flight route, data is filtered using shuffle() and slice(), since otherwise the 60,000 and more data would take too much loading time every button-press or refresh.
That means, the visualization may be slightly different in every refresh.

The animated lines refer to the air routes from Shanghai airports, either PVG or SHA.

By clicking the left button, it would change the projection method, ranging from
    *["geoAzimuthalEqualArea","geoAzimuthalEquidistant","geoGnomonic","geoOrthographic","geoStereographic","geoEqualEarth","geoConicConformal","geoConicEqualArea", "geoConicEquidistant", "geoEquirectangular","geoMercator", "geoTransverseMercator", "geoNaturalEarth1"]*

The upperleft displays the current projection method.

The right button would "zoom in" the map and focus on mainland China.

Note: as discovered in previous lab exercises, the font doesn't load on other computers, (which is obvious...), I used \@font-face {font-family: "Futura";src: url("Futura/Futura-Book-2.ttf");}, no sure if it works.

Note2: the code for updating the data, i.e switching between data form different files:
    *function updateMap(newData){
       let paths = mapPathGroup.selectAll(".country").data(newData.features);
       let enteringPaths = paths.enter():
       let exitingPaths = paths.exit();
       // entering
       enteringPaths.append("path")
        .attr("class", "country")
        .attr("d", pathMaker)
        .attr("fill", "black")
        .attr("stroke", "grey")
        .attr("stroke-width", 1)
      ;
      // updating
      paths
        .attr("d", pathMaker)
        .attr("fill", "red")
      ;
      //exiting
      exitingPaths.remove()
    }*
which is quite useful! (Thanks, Leon!)
