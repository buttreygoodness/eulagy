/*global console Companies*/

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
    this.view = new this.CompanyListView();
  };

  return eu;
}());

