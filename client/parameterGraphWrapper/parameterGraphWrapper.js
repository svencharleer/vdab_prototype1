import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraphWrapper.onRendered(function(){

  var instance = this;
  instance.autorun(function(){
    var svg = d3.select(instance.find("svg"));
    var graph = svg.select("g").selectAll("rect");


    graph.data(
      instance.data.segments
    )
    var max =  instance.data.max;
    var userLocation = instance.data.clientPosition;
    updateParameterGraph(graph, userLocation, max);



  });

});

Template.parameterGraphWrapper.helpers({
  min() {
    return this.segments[0].x;
  },
  max() {
    return this.segments[9].x;
  }
  /*color() {
    return "green";
  }*/
})
