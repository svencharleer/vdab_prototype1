import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {

  Session.set("successValue",.6);
  Session.set("potentialValue",.5);
  Session.set("title","Leeftijd");
});

Template.main.helpers({
  parameters() {
    var tempList = [
      {
        name:"Talen",
        color:"green",
        recommendations: [
          {name: "Engels",
           percent: 4},
           {name: "Frans",
            percent: 2},
        ]
      },
      {
        name:"Regio",
        color:"red",
        recommendations: [
          {name: "Antwerpen",
           percent: 8},
           {name: "Brussel",
            percent: 10},
        ]
      }
    ];
    return tempList;

  }
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
