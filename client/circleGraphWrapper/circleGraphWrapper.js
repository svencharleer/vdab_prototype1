import d3 from 'd3'

Template.circleGraphWrapper.rendered = function(){
  var svg = d3.select(this.find("svg.circleGraph"));
  var height = 100;
  var width = 100;
  var padding = 10;



  Tracker.autorun(function(){
    var percent = Session.get("testValue");
    if(percent == undefined) return;
    //console.log("percet", percent);
    svg.select("rect")
        .transition()
        .attr("height", (height+padding/2) * (1.0 - percent))
      ;
    svg.select("text")
      .transition()
      .attr("fill", function(){
        if(percent > .5)
          return "white";
        else return "#88B458";
      })
      .attr("y", function(){
        var diff = 0;
        if(percent > .5)
          diff = 20;
        if(percent > .9)
          diff = 25;
        return diff + (height+padding/2) * (1.0 - percent)-3;
      })
      .text(parseInt(100 * percent) + "%");
  });
}
