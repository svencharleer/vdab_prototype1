import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraph.onRendered(function(){

  var instance = this;

  var cPass = "#3BFD40";
  var cTolerable= "#E1B32D";
  var cFailed = "#FD686A";
  var bar = "#CBCBCB";
  var barSelect = "#020202";
  var colorScale = chroma.scale(["#0099FF","#F566FF"]);
  var maxHeight = 30;
  var barWidth = 10;

  //create basic graph without data

  var svg = d3.select(this.find("svg"));
  var startValues = [];
  for(var i = 0;i <= 10; i++)
  {
    startValues.push({block:i, realValue:i *20,  count:0});
  }
  var max = 10; // real value
  var userLocation = 1;
  var g = svg.append("g");
  var graph = g.selectAll("rect")
                      .data(startValues);

  graph.enter().append("rect")
                  .attr("height",function(d){

                      return d.count/(max) * maxHeight;
                  })
                  .attr("width",function(d){
                      return barWidth;
                  })
                  .attr("fill", function(d){
                         if(d.block != userLocation)
                            return bar;
                         else {
                           return barSelect;
                         }
                  })
                  .attr("transform",function(d,i){
                      var spacing = 2.0;
                      return "translate(" + ((d.block) * spacing +   (d.block) * barWidth).toString() + ","+ (1.0 - d.count/max) * maxHeight+ ")";

                  });


});

updateParameterGraph = function(graph, userLocation, max)
{
  var bar = "#CBCBCB";
  var barSelect = "#87D9E9";

  var maxHeight = 30;
  var barWidth = 10;
  graph.transition()
              .attr("height",function(d){

                  return d.count/(max) * maxHeight;
              })
              .attr("width",function(d){
                  return barWidth;
              })
              .attr("fill", function(d){
                     if(d.block != userLocation)
                        return bar;
                     else {
                       return barSelect;
                     }
              })
              .attr("transform",function(d,i){
                  var spacing = 2.0;
                  return "translate(" + ((d.block) * spacing +   (d.block) * barWidth).toString() + ","+ (1.0 - d.count/max) * maxHeight+ ")";

              });
}
