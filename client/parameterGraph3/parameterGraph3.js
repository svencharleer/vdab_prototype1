import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraph3.onRendered(function(){

  var instance = this;

  var cPass = "#3BFD40";
  var cTolerable= "#E1B32D";
  var cFailed = "#FD686A";
  var bar = "#CBCBCB";
  var barSelect = "#020202";
  var colorScale = chroma.scale(["#0099FF","#F566FF"]);
  var maxHeight = 30;
  var barWidth = 15;

  //create basic graph without data

  var svg = d3.select(this.find("svg"));
  var startValues = [];
  for(var i = 0; i < 1; i++)
    startValues.push({
      dataPointCount:2,
      dataPointPositiveCount:1,
      dataPointNegativeCount:1,
      dataPointPositiveValues:[],
      dataPointNegativeValues:[],
      maxPositive:-1,
      minNegative:+1});

  var max = 10; // real value
  var userLocation = 1;
  var g = svg.append("g").attr("class","negative");



    g = svg.append("g").attr("class","positive");


    //updateParameterGraph3(graph,0,0);

});

var arc = function(start,end){
  var arc = d3.arc()
  .innerRadius(5)
  .outerRadius(10)
  .startAngle( start)
  .endAngle( end);
  return arc();
}

updateParameterGraph3 = function(segments,instance)
{
  var distance = 300 / (segments.length+1);
  var hundredpercentHeight = 80;
  var position = 3;
  var svg = d3.select(instance.find("svg"));

  var g = svg.select(".negative");
  var graph = g.selectAll(".negativeArc").data(segments);

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  graph.enter().append("rect")
      .attr("transform", function(d,i) { return "translate("+ (distance * (i+.5))+",0)"})
      .attr("x",0)
      .attr("y",0)
      .attr("width",distance)
      .attr("fill",function(d,i){if(i == position) return "grey"; return "none"})
      .attr("height",90);

  graph.enter().append("path")
                  .attr("transform", function(d,i) { return "translate("+ (distance * (i+1))+",20)"})
                  .attr("class","negativeArc")
                  .attr("d", function(d){
                    return arc(0,2 * Math.PI)})
                    .on("mouseover", function(d) {
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div	.html("aantal pos: " + Math.round(d.dataPointPositiveCount)
                            + "<br/>aantal neg: " + Math.round(d.dataPointNegativeCount)
                        )
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");
                            })
                            .on("mouseout", function(d) {
                              div.transition()
                                  .duration(500)
                                  .style("opacity", 0);});
  graph.enter().append("text")
      .attr("text-anchor", "middle")
        .attr("transform", function(d,i) { return "translate("+ (distance * (i+1))+",40)"})
        .attr("font-family", "sans-serif")
         .attr("font-size", "8px")
        .attr("fill", "white")
        .text(function(d){return d.name;});

  graph.enter().append("rect")
    .attr("transform", function(d,i) { return "translate("+ (distance * (i+1))+",0)"})
    .attr("x",0)
    .attr("y",function(d) {if(d.maxAverage < 0)return hundredpercentHeight; return (1-d.maxAverage)*hundredpercentHeight})
    .attr("width",8)
    .attr("height",function(d){
        if(d.maxAverage > 0)
          return d.maxAverage * hundredpercentHeight;
        else return hundredpercentHeight;
    })
    .attr("class","positiveArc")
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("gemiddeld neg: " + Math.round(d.minAverage*100) + "% "
            + "<br/>minimum neg: " + Math.round(d.minNegative*100) + "% "
          + "<br/>gemiddeld pos: " + Math.round(d.maxAverage*100) + "% "
        + "<br/>maximum pos: " + Math.round(d.maxPositive*100) + "% ")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);});;
  graph.enter().append("rect")
      .attr("transform", function(d,i) { return "translate("+ (distance * (i+1))+",0)"})
      .attr("x",-8)
      .attr("y",function(d) {if(d.minAverage > 0)return hundredpercentHeight; return (1+d.minAverage)*hundredpercentHeight})
      .attr("width",8)
      .attr("height",function(d){
          if(d.minAverage < 0)
            return -d.minAverage * hundredpercentHeight;
          else return 0;
      })
      .attr("class","negativeArc")
      .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div	.html("gemiddeld neg: " + Math.round(d.minAverage*100) + "% "
              + "<br/>minimum neg: " + Math.round(d.minNegative*100) + "% "
            + "<br/>gemiddeld pos: " + Math.round(d.maxAverage*100) + "% "
          + "<br/>maximum pos: " + Math.round(d.maxPositive*100) + "% ")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
              .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
});;

  graph.exit().remove();

  g = svg.select(".positive");
  graph = g.selectAll(".positiveArc").data(segments);

  console.log(graph.data())
  graph.enter().append("path")
                  .attr("transform", function(d,i) { return "translate("+ (distance * (i+1))+",20)"})
                  .attr("class","positiveArc")
                  .attr("d", function(d){
                    return arc(0,2 * Math.PI * d.dataPointPositiveCount / d.dataPointCount)})
                    .on("mouseover", function(d) {
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div	.html("aantal pos: " + Math.round(d.dataPointPositiveCount)
                            + "<br/>aantal neg: " + Math.round(d.dataPointNegativeCount)
                        )
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");
                            })
                            .on("mouseout", function(d) {
                              div.transition()
                                  .duration(500)
                                  .style("opacity", 0);});


  graph.transition()
  .delay(1000)
                  .attr("transform", function(d,i) { return "translate("+ (30 * (i+1))+",20)"})
                  .attr("d", function(d){
                    if(d.dataPointCount == 0) arc(0,0);
                    console.log(d.dataPointPositiveCount , d.dataPointCount, d.dataPointPositiveCount / d.dataPointCount)
                    return arc(0,2 * Math.PI * d.dataPointPositiveCount / d.dataPointCount)});

  graph.exit().remove();
}
