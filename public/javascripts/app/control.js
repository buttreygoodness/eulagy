/*global Backbone $ Eulagy*/

Eulagy.Control = Backbone.Controller.extend({

  routes: {
    "company/:company_id":  "company",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  company: function(company_id) {
    var company = Eulagy.Companies.get(company_id);
    var view = new Eulagy.CompanyDetailView({model: company});
    view.el = $("#company_detail_pane");
    view.render();
  },

  search: function(query, page) {
    //...
  }

});