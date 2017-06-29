import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {

  
  Meteor.call("data", function(error, data) {
    Session.set("jobs",data);
    console.log("test",data);
  });



  Session.set("hiddenJobs", {});
  Session.set("showHiddenJobs", false);

});

Template.main.helpers({
  jobs(){
    return Session.get("jobs");
  },
  jobVisible(id)
  {
    if(Session.get("showHiddenJobs") && Session.get("hiddenJobs")[id]) return "hiddenJobVisible";
    if(Session.get("hiddenJobs")[id]) return "hiddenJob";
  },
  actionnable() {
    if(Session.get("activeJob") == undefined) return undefined;
    return Session.get("activeJob").actionnable;
  },
  nonactionnable() {
    if(Session.get("activeJob") == undefined) return undefined;
    return Session.get("activeJob").nonactionnable;
  }
});

Template.job.events({
  'click'(event, instance) {
    // increment the counter when button is clicked
    Session.set("activeJob", instance.data);
    Session.set("selectedParameters", {selectedPotential:Session.get("activeJob").successValue})

  },
});

Template.jobhider.events({
  'click'(event, instance) {
    // increment the counter when button is clicked
    Session.set("activeJob", undefined);
    Session.set("selectedParameters", undefined);
    var hidden = Session.get("hiddenJobs")[instance.data.id];
    if(hidden == undefined || hidden == false) hidden = true;
    else hidden = !hidden;
    var hiddenJobs = Session.get("hiddenJobs");
    hiddenJobs[instance.data.id] = hidden;
    Session.set("hiddenJobs", hiddenJobs);
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

Template.showHiddenJobs.helpers(
  {
    text(){
      return Session.get("showHiddenJobs") == true ? "toon selectie" : "toon alles";
    }
  }
);

Template.showHiddenJobs.events({
  'click'(event, instance) {
    var showHiddenJobs = Session.get("showHiddenJobs");
    showHiddenJobs = ! showHiddenJobs;
    Session.set("showHiddenJobs", showHiddenJobs);
  }
});
