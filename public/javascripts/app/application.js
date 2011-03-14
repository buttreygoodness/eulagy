/*global Backbone Store _ $*/

var Application = Backbone.Model.extend({

  EMPTY: "empty application...",

  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.EMPTY});
    }
  },

  toggle: function() {
    this.save({done: !this.get("done")});
  },

  clear: function() {
    this.destroy();
    this.view.remove();
  }

});

var ApplicationList = Backbone.Collection.extend({
  
  model: Application,

  localStorage: new Store("applications"),

  done: function() {
    return this.filter(function(application){ return application.get('done'); });
  },

  remaining: function() {
    return this.without.apply(this, this.done());
  },

  nextOrder: function() {
    if (!this.length){
      return 1;
    }
    
    return this.last().get('order') + 1;
  },
      
  comparator: function(application) {
    return application.get('order');
  }

});

var ApplicationView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#item-template').html()),

  events: {
    "click .check"              : "toggleDone",
    "dblclick div.application-content" : "edit",
    "click span.application-destroy"   : "clear",
    "keypress .application-input"      : "updateOnEnter"
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
  },

  setContent: function() {
    var content = this.model.get('content');
    this.$('.application-content').text(content);
    this.input = this.$('.application-input');
    this.input.bind('blur', this.close);
    this.input.val(content);
  },

  toggleDone: function() {
    this.model.toggle();
  },

  edit: function() {
    $(this.el).addClass("editing");
    this.input.focus();
  },

  close: function() {
    this.model.save({content: this.input.val()});
    $(this.el).removeClass("editing");
  },

  updateOnEnter: function(e) {
    if (e.keyCode === 13){
      this.close();
    }
  },

  remove: function() {
    $(this.el).remove();
  },

  clear: function() {
    this.model.clear();
  }

});

var Applications = new ApplicationList();