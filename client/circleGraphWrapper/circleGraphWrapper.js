import d3 from 'd3'

Template.circleGraphWrapper.rendered = function(){
  var svg = d3.select(this.find("svg.circleGraph"));
  var height = 100;
  var width = 100;
  var padding = 10;



  Tracker.autorun(function(){
    var success = Session.get("successValue");
    var potential = Session.get("potentialValue");
    if(success == undefined) return;
    if(potential == undefined) return;
    //console.log("percet", percent);
    if(potential < success) potential = success;
    svg.select("rect.potential")
        .transition()
        .attr("height", (height+padding/2) * (1.0 - potential))
      ;

      svg.select("rect.success")
          .transition()
          .attr("height", (height+padding/2) * (1.0 - success))
        ;
  });
}
