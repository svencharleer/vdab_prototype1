import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {

  var parameters1 = [
    {
      name:"Talen",
      color:"green",
      recommendations: [
        {
          id: "Engels",
          description: "Leer Engels",
         percent: .04},
         {id: "Frans",
         description: "Leer Frans",
          percent: .02},
      ]
    },
    {
      name:"Regio",
      color:"red",
      recommendations: [
        {id: "Antwerpen",
        description: "Antwerpen",
         percent: .08},
         {id: "Brussel",
         description: "Brussel",
          percent: .10},
      ]
    }
  ];


  Session.set("jobs",[
    {
      name:"Poetsvrouw",
      successValue: .2,
      potentialValue: .5,
      parameters: parameters1
    }
  ]);
  Session.set("selectedParameters", {selectedPotential:Session.get("jobs")[0].successValue})

});

Template.main.helpers({
  parameters() {
    return Session.get("jobs")[0].parameters;


  }
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
