/*global Backbone Store _ $ Eulagy*/

Eulagy.Eula = Backbone.Model.extend({

  EMPTY: "empty eula...",

  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.EMPTY});
    }
  }

});

Eulagy.EulaList = Backbone.Collection.extend({
  
  model: Eulagy.Eula

});

Eulagy.Eulas = new Eulagy.EulaList();

Eulagy.EulaView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#eula-template').html()),

  events: {},

  initialize: function() {},

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});