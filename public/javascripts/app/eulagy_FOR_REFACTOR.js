/*global $ console window */

/**
* App
* Closure Public
* Main app
*/
function Eulagy(param) {
  this.name = "eulagy";
  
  this.forms = {
    company: {},
    application: {},
    license: {}
  };
  
  this.company_buttons = [];
  
  this.showForm = function(form_name){
    this.show_form_(form_name);
  };
  
  this.hideForm = function(form_name){
    this.hide_form_(form_name);
  };
  
  this.init = function(){
    this.init_();
  };
}

Eulagy.prototype.init_ = function(){
  this.forms.company = $("#company_form");
  this.forms.application = $("#application_form");
  this.forms.license = $("#license_form");
  $.each(this.forms, function(i, e){
    e.hide();
  });
  this.add_toolbar_listeners_();
  this.add_company_button_listeners_();
};

Eulagy.prototype.add_toolbar_listeners_ = function(){
  $("#toolbar").delegate("#add_company", "click", function(e){
    e.preventDefault();
    $(this).parent().hide();
    this.show_form_("company");
  }.bind(this));
  
  this.forms.company.delegate("form", "submit", function(e){
    this.before_submit_(e);
    this.send_ajax_("/api/company", $(e.target).serialize(), function(data, textStatus, jqXHR){
      this.set_company_id_(data[0].company_id);
      this.after_submit_(e, "application");
    }.bind(this));
  }.bind(this));
  
  this.forms.application.delegate("form", "submit", function(e){
    this.before_submit_(e);
    this.send_ajax_("/api/application", $(e.target).serialize(), function(data, textStatus, jqXHR){
      this.set_application_id_(data[0].application_id);
      this.after_submit_(e, "license");
    }.bind(this));
  }.bind(this));
  
  this.forms.license.delegate("form", "submit", function(e){
    this.before_submit_(e);
    this.send_ajax_("/api/license", $(e.target).serialize(), function(data, textStatus, jqXHR){
      this.set_license_id_(data[0].license_id);
      this.after_submit_(e);
    }.bind(this));
  }.bind(this));
};

Eulagy.prototype.add_company_button_listeners_ = function(){
  this.company_buttons = $(".company_button");
  this.company_buttons.each(function(i, button){
    var co_button = $(button);
    co_button.delegate("a", "click", function(e){
      e.preventDefault();
      $.getJSON(co_button.children("a").attr("href"), function(data, textStatus, jqXHR){
        this.show_form_("company");
        this.forms.company.children("form")
          .children("fieldset")
          .children("div")
          .children("input")
          .val(data[0].name);
      }.bind(this));
    }.bind(this));
  }.bind(this));
};

Eulagy.prototype.show_form_ = function(form_name){
  if(this.forms[form_name].children(".toolbar")){
    $("#toolbar").hide();
  }
  this.forms[form_name].fadeIn();
};

Eulagy.prototype.hide_form_ = function(form_name){
  if(this.forms[form_name].children(".toolbar")){
    $("#toolbar").hide();
  }
  this.forms[form_name].fadeOut();
};

Eulagy.prototype.before_submit_ = function(event){
  event.preventDefault();
  event.stopPropagation();
};

Eulagy.prototype.after_submit_ = function(event, show_form_){
  $(event.target).hide();
  $(event.target).children().show();
  if(show_form_){
    this.show_form_(show_form_);
  }
};

Eulagy.prototype.set_company_id_ = function(company_id){
  console.log("setting company_id to " + company_id);
  var co_id_ = "<input type='hidden' name='company_id' value='" + company_id + "'/>";
  $(this.forms.application.children('form')).append(co_id_);
  $(this.forms.license.children('form')).append(co_id_);
};

Eulagy.prototype.set_application_id_ = function(application_id){
  console.log("setting application_id to " + application_id);
  var app_id_ = "<input type='hidden' name='application_id' value='" + application_id + "'/>";
  $(this.forms.license.children('form')).append(app_id_);
};

Eulagy.prototype.send_ajax_ = function(url, data, callback){
  $.ajax({
    url: url,
    data: data,
    type: "POST",
    success: function(data, textStatus, jqXHR){
      callback(data, textStatus, jqXHR);
    }
  });
};