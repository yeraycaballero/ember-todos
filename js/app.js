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
    var todo = App.Todo.create({'title' : title});
    this.pushObject(todo);
  },

  clearCompletedTodos : function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  allAreDone : function(key, value) {
    console.log('all are done');
  },

  remaining : function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  isEmpty: function() {
    return this.get('length') === 0;
  }.property('length')


});


App.ApplicationView = Ember.View.extend({
  controller : null,
  textField : null,
  text : '',

  didInsertElement : function() {
    this.textField.insertNewline = $.proxy(this._insertNewline, this);
  },

  _insertNewline : function(event) {
    this.controller.createTodo( this.textField.get('value') );
    this.textField.set('value', '');
  }
});

