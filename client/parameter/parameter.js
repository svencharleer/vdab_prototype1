import d3 from 'd3'


Template.parameter.helpers({
  title() {
    return Session.get("title");
  },
  /*color() {
    return "green";
  }*/
  visible(id)
  {
    if(Session.get("showHiddenJobs") && Session.get("hiddenComponents")[id]) return "hiddenParamVisible";
    if(Session.get("hiddenComponents")[id]) return "hiddenParam";
  },
  
})

Template.paramhider.events({
  'click'(event, instance) {

    var hidden = Session.get("hiddenComponents")[instance.data.id];
    if(hidden == undefined || hidden == false) hidden = true;
    else hidden = !hidden;
    var hiddenComponents = Session.get("hiddenComponents");
    hiddenComponents[instance.data.id] = hidden;
    Session.set("hiddenComponents", hiddenComponents);
  },
  'mouseover'(event, instance) {
    instance.$(".hide").show();
    instance.$(".show").hide();
  },
  'mouseleave'(event, instance) {
    instance.$(".hide").hide();
    instance.$(".show").show();
  }

});
