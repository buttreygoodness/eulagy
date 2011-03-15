/*global Backbone Store _ $ alert*/

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