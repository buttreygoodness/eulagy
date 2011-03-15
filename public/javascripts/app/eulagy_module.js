/*global CompanyList ApplicationList EulaList 
CompanyView ApplicationView EulaView CompanyListView*/

/**
* Eulagy
* Closure Public
* Main Eulagy class
*/
function Eulagy() {
  
  this.lists = {
    company: new CompanyList(),
    application: new ApplicationList(),
    eula: new EulaList()
  };
  
  this.view = new CompanyListView();
  
}

Eulagy.prototype.stamp = function (string) {
    return this.member + string;
};
