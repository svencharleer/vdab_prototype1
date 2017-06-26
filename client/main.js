import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {

  Session.set("testValue",.3);
  Session.set("title","Leeftijd");
});

Template.main.helpers({
  parameters() {
    var tempList = [
      {
        name:"Leeftijd",
        color:"green"
      },
      {
        name:"Dagen Werkloos",
        color:"red"
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
