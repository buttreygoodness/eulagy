/*global Backbone Store _ $ alert console Eulagy*/

Eulagy.Company = Backbone.Model.extend({

  EMPTY: "empty company...",
  
  url: "/api/company"

});

Eulagy.CompanyList = Backbone.Collection.extend({
  
  model: Eulagy.Company,
  
  url: "/api/companies"

});

Eulagy.Companies = new Eulagy.CompanyList();

Eulagy.CompanyView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#company-template').html()),

  events: {},
  
  initialize: function(){
    _.bindAll(this, 'render');
  },
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    $(this.el).find("a").attr("href", "#company/" + this.model.id);
    return this;
  }

});

Eulagy.CompanyDetailView = Backbone.View.extend({
  
  tagName:  "div",
  
  template: _.template($('#company-detail-template').html()),

  events: {},
  
  initialize: function(){
    _.bindAll(this, 'render');
  },
  
  render: function(){
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});

Eulagy.CompanyListView = Backbone.View.extend({
  
  el: "#company_pane",

  events: {},
  
  initialize: function(){
    _.bindAll(this, 'render');
    console.log("blars2", this);
    Eulagy.Companies.each(function(company, i, j, k){
      var view_ = new Eulagy.CompanyView({ model: company });
      this.$("#company_list").append(view_.render().el);
    });
  },
    
  render: function(){
    Eulagy.Companies.each(function(){
      console.log("blars");
    });
  }

});