"use strict";
var storage = window.localStorage;
var serverData = [{
  "todo": "Pick up milk from store"
}, {
  "todo": "Make Dr. Appointment"
}, {
  "todo": "Pay Water Bill"
}];
var todoList = serverData.map(function (item) {
  return item.todo;
});

var Container = React.createClass({
  displayName: "Container",

  getInitialState: function getInitialState() {
    return {
      list: this.props.toDoList
    };
  },

  addToDoToList: function addToDoToList(newToDo) {
    var newList = this.state.list;
    newList.push(newToDo);
    this.listUpdate(newList);
  },

  removeToDo: function removeToDo(toDo) {
    var newList = this.state.list;
    newList = newList.filter(function (item) {
      return item !== toDo;
    });
    this.listUpdate(newList);
  },

  listUpdate: function listUpdate(newList) {
    //console.log('updating list', newList);
    storage.setItem("todoList", JSON.stringify(newList));
    this.setState({
      list: newList
    });
  },

  render: function render() {
    var count = this.state.list.length;
    return React.createElement(
      "div",
      { className: "main-container" },
      React.createElement(
        "div",
        { className: "header-div" },
        "To Do App"
      ),
      React.createElement(AddToDoBox, { addItemToList: this.addToDoToList }),
      React.createElement(ToDoItems, { toDoList: this.state.list, removeToDo: this.removeToDo }),
      React.createElement(ToDoCount, { count: count })
    );
  }
});

var AddToDoBox = React.createClass({
  displayName: "AddToDoBox",

  addToDo: function addToDo(e) {
    e.preventDefault();
    var newToDo = this.refs.AddedItem.value;
    if (newToDo === "") {
      return;
    }
    this.refs.AddedItem.value = "";
    this.props.addItemToList(newToDo);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "input-div" },
      React.createElement(
        "form",
        null,
        React.createElement("input", { type: "text", placeholder: " Add New ToDo Items Here", ref: "AddedItem", id: "add-item-input" }),
        React.createElement("input", { type: "submit", id: "submitToDo", value: "Add", onClick: this.addToDo, id: "add-item-submit" })
      )
    );
  }
});

var ToDoItems = React.createClass({
  displayName: "ToDoItems",

  removeItem: function remove(e) {
    var toDo = e.target.dataset.item;
    this.props.removeToDo(toDo);
  },

  render: function render() {
    var items = this.props.toDoList.map(function (item) {
      return React.createElement(
        "div",
        { className: "todo-items" },
        React.createElement(
          "span",
          { className: "item-text" },
          item
        ),
        React.createElement("div", { className: "item-clickable", onDoubleClick: this.removeItem, "data-item": item })
      );
    }.bind(this));
    return React.createElement(
      "div",
      null,
      items
    );
  }
});

var ToDoCount = React.createClass({
  displayName: "ToDoCount",

  render: function render() {
    return React.createElement(
      "div",
      { className: "count-div" },
      React.createElement(
        "span",
        null,
        "Items Left To Do: "
      ),
      React.createElement(
        "div",
        { className: "count-display" },
        React.createElement(
          "span",
          { className: "count-text" },
          this.props.count
        )
      )
    );
  }
});



if(storage.getItem("todoList") === null){
  storage.setItem("todoList", JSON.stringify(todoList));
} else {
  todoList = JSON.parse(storage.getItem("todoList"));
};


ReactDOM.render(React.createElement(Container, { toDoList: todoList }), document.getElementById("root"));
