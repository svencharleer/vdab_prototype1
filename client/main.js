import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

Template.main.onCreated(function helloOnCreated() {

  var parameterDistribution1 =
    { segments: [{block:0, x: 0, count:0},
      {block:1, x: 1, count:1},
      {block:2, x: 2, count:2},
      {block:3, x: 3, count:3},
      {block:4, x: 4, count:4},
      {block:5, x: 5, count:4},
      {block:6, x: 6, count:4},
      {block:7, x: 7, count:4},
      {block:8, x: 8, count:4},
      {block:9, x: 9, count:4}],
      max: 4,
      clientPosition: 2
    };

    var parameterDistribution2 =
      { segments: [{block:0, x: 0, count:20},
        {block:1, x: 1, count:10},
        {block:2, x: 2, count:20},
        {block:3, x: 3, count:0},
        {block:4, x: 4, count:0},
        {block:5, x: 5, count:0},
        {block:6, x: 6, count:5},
        {block:7, x: 7, count:7},
        {block:8, x: 8, count:15},
        {block:9, x: 9, count:1}],
        max: 20,
        clientPosition: 8
      };

    var parameterDistribution3 =
        { segments: [{block:0, x: 20, count:20},
          {block:1, x: 25, count:100},
          {block:2, x: 30, count:300},
          {block:3, x: 35, count:200},
          {block:4, x: 40, count:0},
          {block:5, x: 45, count:0},
          {block:6, x: 50, count:50},
          {block:7, x: 55, count:500},
          {block:8, x: 60, count:100},
          {block:9, x: 65, count:20}],
          max: 500,
          clientPosition: 2
        };

  var actionnable = [
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
      ],
      distribution: parameterDistribution1
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
      ],
      distribution: parameterDistribution2
    }];
    var nonactionnable = [
    {
      name:"Leeftijd",
      color:"red",
      recommendations: [

      ],
      distribution: parameterDistribution3
    }
  ];


  Session.set("jobs",[
    {
      id:"Poetsvrouw",
      name:"Poetsvrouw",
      successValue: .2,
      potentialValue: .5,
      actionnable: actionnable,
      nonactionnable: nonactionnable
    },
    {
      id:"Verkoop",
      name:"Verkoop",
      successValue: .4,
      potentialValue: .8,
      actionnable: nonactionnable,
      nonactionnable: nonactionnable
    }
  ]);


});

Template.main.helpers({
  jobs(){
    return Session.get("jobs");
  },

  actionnable() {
    return Session.get("activeJob").actionnable;
  },
  nonactionnable() {
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
