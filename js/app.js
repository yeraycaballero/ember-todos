var App = Ember.Application.create();


App.Todo = Ember.Object.extend({
  title : null,
  isDone : false,
  toString : function() { return 'TODO ' +  this.get('title') + ' ' + this.get('isDone') }
});

App.Todos = [];

App.ApplicationRoute = Ember.Route.extend({  
  model: function() {
    return App.Todos;
  }
});

App.ApplicationController = Ember.ArrayController.extend({
  content : [],  
//  sortProperties: ['title'],
//  sortAscending: true,

  createTodo : function(title) {
    if (title == '') return;
    var todo = App.Todo.create({'title' : title});
    this.pushObject(todo);
  },

  clearCompletedTodos : function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  markAll : function(key, value) {
   if (arguments.length === 2) {
      this.setEach('isDone', value);
      return value;
    } else {
      return ! this.get('isEmpty') && this.everyProperty('isDone', true); 
    }
  }.property('@each.isDone'),

  remaining : function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  noOneDone : function() {
    return this.everyProperty('isDone', false);
  }.property('@each.isDone'),

  isEmpty: function() {
    return this.get('length') === 0;
  }.property('length'),

  markLabel : function() {    
    console.log('markAll: ' + this.get('markAll') );

    if (this.get('markAll') == true) return 'UnMark All'
    return 'Mark All Done';
  }.property('@each.isDone')

});


App.ApplicationView = Ember.View.extend({
  controller : null,
  textField : null,
  text : '',

  didInsertElement : function() {
    this.textField.insertNewline = $.proxy(this._insertNewline, this);
    this.textField.$().focus();
  },

  _insertNewline : function(event) {
    this.controller.createTodo( this.textField.get('value') );
    this.textField.set('value', '');
  }
});

