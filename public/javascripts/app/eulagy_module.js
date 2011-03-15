/*global CompanyList ApplicationList EulaList CompanyView ApplicationView EulaView*/

/**
* Eulagy
* Closure Public
* Main Eulagy class
*/
function Eulagy() {
  
  this.url = "/api";
  
  this.lists = {
    company: new CompanyList(),
    application: new ApplicationList(),
    eula: new EulaList()
  };
  
}

Eulagy.prototype.stamp = function (string) {
    return this.member + string;
};
