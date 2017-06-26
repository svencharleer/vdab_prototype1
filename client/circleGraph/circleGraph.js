import d3 from 'd3'

Template.circleGraph.rendered = function(){

  var svg = d3.select(this.find("svg.circleGraph"));
  var height = 100;
  var width = 100;
  var padding = 10;

  svg.attr("width", 100 + padding);
  svg.attr("height",100 + padding);



  //success circle
  svg.append("circle")
      .attr("class", "success")
      .attr("cx", (padding+width)/2)
      .attr("cy", (padding+height)/2)
      .attr("r", width/2)
      .attr("fill","#87D9E9");
  svg.append("rect")
      .attr("class", "success")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width+padding)
      .attr("fill","white");

      //selected potential circle
        svg.append("circle")
            .attr("class", "selectedpotential")
            .attr("cx", (padding+width)/2)
            .attr("cy", (padding+height)/2)
            .attr("r", width/2)
            .attr("fill","grey");
        svg.append("rect")
            .attr("class", "selectedpotential")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width+padding)
            .attr("fill","white");

    //potential circle
      svg.append("circle")
          .attr("class", "potential")
          .attr("cx", (padding+width)/2)
          .attr("cy", (padding+height)/2)
          .attr("r", width/2)
          .attr("fill","grey");
      svg.append("rect")
          .attr("class", "potential")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width+padding)
          .attr("fill","white");

  /*svg.append("text")
          .attr("x", (padding+width)/2 )

          .attr("fill","#88B458")
          .attr("text-anchor","middle")
          .text("");
*/
  svg.append("circle")
          .attr("cx", (padding+width)/2)
          .attr("cy", (padding+height)/2)
            .attr("r", width/2+3)
            .attr("fill","none")
            .attr("stroke","#6A6A6A");
}
