/*global */

/**
* EulagyModule
* Module Export
* Main eulagy module
*/
var EulagyModule = (function () {
  var em = {};
  
  function privateMethod(string) {
    return ("privateMethod " + string);
  }

  em.moduleProperty = privateMethod("first module property");
  
  em.name = "EulagyModule";
  
  em.publicMethod = function () {
    
  };

  return em;
}());