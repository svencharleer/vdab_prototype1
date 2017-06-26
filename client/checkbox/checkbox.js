Template.checkbox.rendered = function()
{
  var instance = this;
  var selectedParameters = Session.get("selectedParameters");
  if(selectedParameters == undefined) selectedParameters = {};
  if(selectedParameters[this.data.id] == undefined){
     selectedParameters[this.data.id] = {checked: false}
   }

  Session.set("selectedParameters",selectedParameters);
}

Template.checkbox.helpers({
  isChecked(id){
      var checked = false;
      var selectedParameters = Session.get("selectedParameters");
      if(selectedParameters == undefined) return false;
      if(selectedParameters[id] == undefined) return false;
      return selectedParameters[id].checked
  }
});

Template.checkbox.events({
  'click': function(event, template)
  {

    var selectedParameters = Session.get("selectedParameters");
    if(selectedParameters == undefined) return;
    if(selectedParameters[template.data.id] == undefined) return;
    var checked = selectedParameters[template.data.id].checked;
    if(!checked) selectedParameters.selectedPotential += template.data.percent;
    else selectedParameters.selectedPotential -= template.data.percent;
    selectedParameters[template.data.id].checked = !checked;
    Session.set("selectedParameters", selectedParameters);
    template.$(".checkbox").attr("c",selectedParameters[template.data.id].checked);


    return;

    var currentState = template.$(".checkbox").attr("c");
    template.$(".checkbox").attr("c", !currentState);
    var selectedParameters = Session.get("selectedParameters");
    if(selectedParameters == undefined){ return }; //selectedParameters = {};
    selectedParameters[template.$(".checkbox").attr("parameterId")].checked = !currentState;
    Session.set("selectedParameters", selectedParameters);
    return;




  }
});
