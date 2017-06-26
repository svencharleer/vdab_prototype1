import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraphWrapper.onRendered(function(){

  var instance = this;
  instance.autorun(function(){
  var svg = d3.select(instance.find("svg"));
  var graph = svg.select("g").selectAll("rect");




  graph.data(
    [
      {block:0, x: 20, count:20},
      {block:1, x: 25, count:100},
      {block:2, x: 30, count:300},
      {block:3, x: 35, count:200},
      {block:4, x: 40, count:0},
      {block:5, x: 45, count:0},
      {block:6, x: 50, count:50},
      {block:7, x: 55, count:500},
      {block:8, x: 60, count:100},
      {block:9, x: 65, count:20},

    ]
  )
  var max =  500;
  var userLocation = 2;
  updateParameterGraph2(graph, userLocation, max);

  });

});

Template.parameterGraphWrapper.helpers({
  graphType() {
    return "parameterGraph";
  },
  /*color() {
    return "green";
  }*/
})
