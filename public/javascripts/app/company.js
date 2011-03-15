/*global Backbone Store _ $ alert console eu*/

var Company = Backbone.Model.extend({

  EMPTY: "empty company...",
  
  url: "/api/company"

});

var CompanyList = Backbone.Collection.extend({
  
  model: Company,
  
  url: "/api/companies"

});

var CompanyView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#company-template').html()),

  events: {}

});

var CompanyListView = Backbone.View.extend({
  
  el: "#company_pane",

  events: {},
  
  initialize: function(){
    console.log("Initialize");
  },
    
  render: function(){
    $(this.el).html("<p>Blars</p>");
  }

});