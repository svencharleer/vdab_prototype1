import d3 from 'd3'


Template.parameter.helpers({
  title() {
    return Session.get("title");
  },
  /*color() {
    return "green";
  }*/
})
