import { Meteor } from 'meteor/meteor';
var data = {};
var rawParameterData = {};
Meteor.startup(() => {
  data = JSON.parse(Assets.getText('dataEVAL.json'));
  

});

Meteor.methods({
    data: function () {
      return data;
    },
    rawParameterData: function() {
      return rawParameterData;
    }
    });
