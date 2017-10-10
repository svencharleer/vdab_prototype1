import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraph.onRendered(function(){

  var instance = this;
  instance.autorun(function(){


console.log(Template.currentData());
console.log(instance.data)

var raw = Template.currentData().segments;


  var segments = {};
  // to identify continues... it's a string!

  if(raw.length > 0 && typeof raw[0].y === 'string')
  {
      for(var i = 0; i < raw.length;i++)
      {
        var offset=  raw[i].y;
        var value = raw[i].x;
        if(segments[offset] == undefined)
          segments[offset] = {
            name: offset,
            dataPointCount:0,
            total:0
            };
        segments[offset].dataPointCount++;
        segments[offset].total += value;
      }
  }
  else {
    var max = 0;
    for(var i = 0; i < raw.length;i++)
    {
      if(raw[i].y > max) max = raw[i].y;
    }
    var definedSegments = []
    for(var i=0;i < 10;i++)
    {
      definedSegments.push((i*max/10));
    }
    for(var i = 0; i < raw.length;i++)
    {
      var s = 0;
      while(raw[i].y > definedSegments[s] && s < 9)
        s++;

      var offset=  definedSegments[s];
      var value = raw[i].x;
      if(segments[offset] == undefined)
        segments[offset] = {
          name: offset,
          dataPointCount:0,
          total:0
          };
      segments[offset].dataPointCount++;
      segments[offset].total += value;
    }
  }


  var segments = Object.values(segments);
  /*segments.sort(function(a,b){
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0;
  });*/

  segments.forEach(function(d){
    var total = 0;
    //console.log(d.minAverage, d.minNegative, d.maxAverage, d.maxPositive);
    if(d.dataPointCount > 0)
      d.average = d.total/d.dataPointCount;
    if(typeof d.name != 'string')
    {
      console.log("st")
      d.name *= 50;
      d.name=d.name.toFixed(2);
    }
  })
  var userLocation = Template.currentData().clientPosition;


  var distance = 300 / (segments.length+1);
  var hundredpercentHeight = 80;
  var position = userLocation;
  var svg = d3.select(instance.find("svg"));
  svg.selectAll("*").remove();

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
      return 10;})//radiusScale(d.average)})
    .attr("fill",function(d,i){return binaryColor(d.average)})
    .attr("class",function(d,i){if(i==position) return "clientPosition";});
    //.attr("fill-opacity",function(d,i){return opacityScale(d.average)});

  var texts = svg.selectAll("text").data(segments);
  graph.enter().append("text")
    .attr("text-anchor", "middle")
    .attr("class",function(d,i){if(i==position) return "clientPosition axisText"; return "axisText";})

    .attr("transform",function(d,i) { return "translate("+ xScale(i) +","+ MAX_HEIGHT +")"})
    .text(function(d,i){return d.name});

graph.exit().remove();




}
);
});
