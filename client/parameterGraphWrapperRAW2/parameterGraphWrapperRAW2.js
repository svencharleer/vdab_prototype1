import d3 from 'd3'
import chroma from 'chroma-js'
Template.parameterGraphWrapperRAW2.onRendered(function(){

  var instance = this;
  instance.autorun(function(){



  var raw = Session.get("rawParameterData");
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
  segments.sort(function(a,b){
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0;
  });

  segments.forEach(function(d){
    var total = 0;
    console.log(d.minAverage, d.minNegative, d.maxAverage, d.maxPositive);
    if(d.dataPointCount > 0)
      d.average = d.total/d.dataPointCount;
    if(typeof d.name != 'string')
    {
      console.log("st")
      d.name *= 50;
      d.name=d.name.toFixed(2);
    }
  })

  updateParameterGraph4(segments,instance);



  });

});

Template.parameterGraphWrapperRAW2.helpers({
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
