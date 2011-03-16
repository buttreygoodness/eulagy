/*global Backbone Store _ $ Eulagy*/

Eulagy.Application = Backbone.Model.extend({

  EMPTY: "empty application...",

  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.EMPTY});
    }
  }
  
});

Eulagy.ApplicationList = Backbone.Collection.extend({
  
  model: Eulagy.Application

});

Eulagy.Applications = new Eulagy.ApplicationList();

Eulagy.ApplicationView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#application-template').html()),

  events: {
    "click .check"                      : "toggleDone",
    "dblclick div.application-content"  : "edit",
    "click span.application-destroy"    : "clear",
    "keypress .application-input"       : "updateOnEnter"
  },

  initialize: function() {
    _.bindAll(this, 'render', 'close');
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.setContent();
    return this;
  }

});