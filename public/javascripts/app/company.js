/*global Backbone Store _ $*/

var Company = Backbone.Model.extend({

  EMPTY: "empty company...",

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

var CompanyList = Backbone.Collection.extend({
  
  model: Company,

  localStorage: new Store("companies"),

  done: function() {
    return this.filter(function(company){ return company.get('done'); });
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
      
  comparator: function(company) {
    return company.get('order');
  }

});

var CompanyView = Backbone.View.extend({
  
  tagName:  "li",
  
  template: _.template($('#item-template').html()),

  events: {
    "click .check"              : "toggleDone",
    "dblclick div.company-content" : "edit",
    "click span.company-destroy"   : "clear",
    "keypress .company-input"      : "updateOnEnter"
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
    this.$('.company-content').text(content);
    this.input = this.$('.company-input');
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

var Companies = new CompanyList();