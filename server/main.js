import { Meteor } from 'meteor/meteor';
var data = {};
Meteor.startup(() => {
  data = JSON.parse(Assets.getText('data.json'));
});

Meteor.methods({
    data: function () {
      return data;
    }
    });
