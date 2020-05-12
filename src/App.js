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
    selectAll: false,
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
    elt.comleted = !elt.comleted;
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

  // removeCompleted = () => {
  //   this.setState(prevState => ({
  //     todos: [...prevState.todos].filter(todo => !todo.completed),
  //   }));
  // };

  toggleSelectAll = () => {
    this.setState({
      todos: this.state.todos.map(todo => todo.completed),
    })
  };

  removeCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.comleted),
    });
  }

  render() {
    const { todos, filter } = this.state;

    const counter = todos.filter(todo => !todo.comleted).length;
    const count = todos.filter(todo => todo.comleted).length;

    return (
      <section className="todoapp">
        <Header
          todos={todos}
          addTodoItem={this.addTodoItem}
        />
        <TodoList
          todos={todos}
          filter={filter}
          deleteTodo={this.deleteTodo}
          onClickCompleted={this.onClickCompleted}
          toggleSelectAll={this.toggleSelectAll}
          deleteCompleted={this.deleteCompleted}
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


