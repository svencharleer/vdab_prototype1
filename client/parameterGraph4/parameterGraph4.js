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


});



updateParameterGraph4 = function(segments,instance)
{
  var distance = 300 / (segments.length+1);
  var hundredpercentHeight = 80;
  var position = 3;
  var svg = d3.select(instance.find("svg"));

  var MAX_VALUE = .10;
  var MAX_PEOPLECOUNT = 300;

  var MAX_WIDTH = 300;
  var MARGIN = 20;
  var MAX_HEIGHT = 50;
  var MAX_RADIUS = 10;
  var MIN_RADIUS = 1;

  var xScale = d3.scaleLinear()
                          .domain([0,segments.length-1])
                          .range([MARGIN,MAX_WIDTH-MARGIN])
                          .clamp(true);
 var radiusScale = d3.scaleLinear()
                         .domain([-MAX_VALUE, MAX_VALUE])
                         .range([MIN_RADIUS,MAX_RADIUS])
                         .clamp(true);
  var opacityScale = d3.scaleLinear()
                          .domain([0,MAX_PEOPLECOUNT])
                          .range([.1,1])
                          .clamp(true);
  var binaryColor = function(d){ if(d<0) return "#E98686"; return "#B8E986";}
  var graph = svg.selectAll("circle").data(segments);

  graph.enter().append("circle")
    .attr("cx", function(d,i){return xScale(i)})
    .attr("cy", MAX_HEIGHT/2)
    .attr("r", function(d,i){
      return radiusScale(d.average)})
    .attr("fill",function(d,i){return binaryColor(d.average)})
    .attr("class",function(d,i){if(i==3) return "clientPosition";})
    .attr("fill-opacity",function(d,i){return opacityScale(d.dataPointCount)});

  var texts = svg.selectAll("text").data(segments);
  graph.enter().append("text")
    .attr("text-anchor", "middle")
    .attr("class",function(d,i){if(i==3) return "clientPosition axisText"; return "axisText";})
    
    .attr("transform",function(d,i) { return "translate("+ xScale(i) +","+ MAX_HEIGHT +")"})
    .text(function(d,i){return d.name});



  graph.exit().remove();


}
