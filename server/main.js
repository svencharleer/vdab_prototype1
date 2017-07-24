import { Meteor } from 'meteor/meteor';
var data = {};
var rawParameterData = {};
Meteor.startup(() => {
  data = JSON.parse(Assets.getText('data.json'));
  rawParameterData = JSON.parse(Assets.getText('parameter2.json'))
});

Meteor.methods({
    data: function () {
      return data;
    },
    rawParameterData: function() {
      return rawParameterData;
    }
    });
