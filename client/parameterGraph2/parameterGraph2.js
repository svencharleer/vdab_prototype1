import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraph2.onRendered(function(){

  var instance = this;

  var colorScale = chroma.scale(["#EFFFF4","#B8E986"]);
  var maxHeight = 30;
  var barWidth = 20;

  //create basic graph without data

  var svg = d3.select(this.find("svg"));
  var startValues = [];
  for(var i = 0;i <= 10; i++)
  {
    startValues.push({block:i, realValue:i *20,  count:i*20});
  }
  var max = 200; // real value
  var userLocation = 1;
  var g = svg.append("g");
  var graph = g.selectAll("rect")
                      .data(startValues);

  graph.enter().append("rect")
                  .attr("height",function(d){

                        return barWidth;

                  })
                  .attr("width",function(d){

                      return barWidth;


                  })
                  .attr("rx",2)
                  .attr("ry",2)
                  .attr("fill", function(d){

;                         return colorScale(d.count/max).hex();
                  })
                  .attr("stroke",function(d){
                    if(d.block != userLocation)
                      return "white";
                    else {
                      return "#B8E986";
                  }
                }
                )
                  .attr("transform",function(d,i){
                      var spacing = 2.0;
                      return "translate(" + ((d.block) * spacing +   (d.block) * barWidth).toString() + ",0)";

                  });


});

updateParameterGraph2 = function(graph, userLocation, max)
{
  var bar = "#CBCBCB";
  var barSelect = "#87D9E9";
  var colorScale = chroma.scale(["#FFD327","#B8E986"]);
  var maxHeight = 30;
  var barWidth = 20;
  graph.transition()
                .attr("height",function(d){

                      return barWidth;

                })
                .attr("width",function(d){

                    return barWidth;


                })
                .attr("fill", function(d){

              ;                         return colorScale(d.count/max).hex();
                })
                .attr("stroke",function(d){
                  if(d.block == userLocation)
                    return colorScale(d.count/max).hex();
                  //else {
                  //  return "#B8E986";
                //}

              }

              )
              .attr("stroke-width",2)
                .attr("transform",function(d,i){
                    var spacing = 2.0;
                    return "translate(" + ((d.block) * spacing +   (d.block) * barWidth).toString() + ",2)";

                });
}
