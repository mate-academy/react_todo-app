import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filter/Filter';
//import todos from './api/todos';

const todos = [];

export default class App extends React.Component {
  state = {
    todos: [...todos],
    counter: 0,
    count: 0,
    filter: 'all',
    selectedAll: false,
  }
  deleteTodo = (id) => {
    const index = this.state.todos.findIndex((el) => el.id === id);

    const newArray = [
      ...this.state.todos.slice(0, index),
      ...this.state.todos.slice(index + 1)
    ];
    this.setState({
      todos: newArray
    });
  }

  addTodoItem = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  onClickCompleted = (elt) => {
    elt.completed = !elt.completed;
    const index = this.state.todos.findIndex((el) => el.id === elt.id);

    const newArray = [
      ...this.state.todos.slice(0, index),
      elt,
      ...this.state.todos.slice(index + 1)
    ];
    this.setState({
      todos: newArray
    });
  };

  onFilterChange = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  toggleSelectAll = () => {
    this.state.selectedAll = !this.state.selectedAll;
    this.setState({
      todos: this.state.todos.map((todo) => {
        todo.completed = this.state.selectedAll;
        return todo;
      })
    });
  };

  removeCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed),
    });
  }

  render() {
    const { todos, filter } = this.state;

    const counter = todos.filter(todo => !todo.completed).length;
    const count = todos.filter(todo => todo.completed).length;

    return (
      <section className="todoapp">
        <Header
          todos={todos}
          addTodoItem={this.addTodoItem}
          toogleSelection={this.toggleSelectAll}
        />
        <TodoList
          todos={todos}
          filter={filter}
          deleteTodo={this.deleteTodo}
          onClickCompleted={this.onClickCompleted}
         removeCompleted={this.removeCompleted}
        />
        <Filter
          todos={todos}
          counter={counter}
          count={count}
          filter={filter}
          onFilterChange={this.onFilterChange}
          removeCompleted={this.removeCompleted}
        />
      </section>
    )
  }
}


