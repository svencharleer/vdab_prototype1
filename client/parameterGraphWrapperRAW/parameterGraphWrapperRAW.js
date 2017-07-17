import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraphWrapperRAW.onRendered(function(){

  var instance = this;
  instance.autorun(function(){



  var raw = Session.get("rawParameterData");
  var segments = {};
  for(var i = 0; i < raw.length;i++)
  {
    var offset = raw[i].y;
    var value = raw[i].x;

    if(segments[offset] == undefined)
      segments[offset] = {
        name: offset,
        dataPointCount:0,
        dataPointPositiveCount:0,
        dataPointNegativeCount:0,
        dataPointPositiveValues:[],
        dataPointNegativeValues: [],
        maxPositive:0,
        minNegative:0,
        maxAverage:0,
        minAverage:0
        };

    segments[offset].dataPointCount++;
    if(value < 0)
    {
      segments[offset].dataPointNegativeCount++;
      segments[offset].dataPointNegativeValues.push(value);
      if(value < segments[offset].minNegative)
        segments[offset].minNegative = value;
    }
    else {
      segments[offset].dataPointPositiveCount++;
      segments[offset].dataPointPositiveValues.push(value);
      if(value > segments[offset].maxPositive)
        segments[offset].maxPositive = value;
    }

  }
  var segments = Object.values(segments);
  segments.forEach(function(d){
    var total = 0;
    d.dataPointPositiveValues.forEach(function(d2){
      total+=d2;
    })
    if(d.dataPointPositiveCount>0)
      d.maxAverage = total/d.dataPointPositiveCount;
    total = 0;
    d.dataPointNegativeValues.forEach(function(d2){
      total+=d2;
    })
    if(d.dataPointNegativeCount>0)
      d.minAverage = total/d.dataPointNegativeCount;
    console.log(d.minAverage, d.minNegative, d.maxAverage, d.maxPositive);
  })

  //var max =  instance.data.max;
  //var userLocation = instance.data.clientPosition;
  updateParameterGraph3(segments,instance);



  });

});

Template.parameterGraphWrapperRAW.helpers({
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
