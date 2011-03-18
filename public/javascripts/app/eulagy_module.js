/*global console Companies Backbone*/

/**
* Eulagy
* Module Export
* Main Eulagy Module
*/
var Eulagy = (function () {
  var eu = {};

  function privateMethod(string) {
    return ("private " + string);
  }
  
  eu.init = function (companies_) {
    this.Companies.refresh(companies_);
    
    this.controller = new this.Control();
    this.view = new this.CompanyListView();
    
    Backbone.history.start();
  };

  return eu;
}());

