import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filter/Filter';
import FILTERS from './common/constants'

const todos = [];

export default class App extends React.Component {
  state = {
    todos: [...todos],
    counter: 0,
    count: 0,
    filter: FILTERS.all,
    selectedAll: todos.length>0 && !todos.find(t => !t.completed),
  }
  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((el) => el.id !== id)
    });
  }

  addTodoItem = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  onClickCompleted = (todo) => {
    todo.completed = !todo.completed;
    const index = this.state.todos.findIndex((el) => el.id === todo.id);

    const newArray = [
      ...this.state.todos.slice(0, index),
      todo,
      ...this.state.todos.slice(index + 1)
    ];

    this.setState({
      todos: newArray,
      selectedAll: !newArray.find(t => !t.completed),
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
    const isTodosExist = todos.length > 0;
    return (
      <section className="todoapp">
        <Header
          isTodosExist={isTodosExist}
          addTodoItem={this.addTodoItem}
          toogleSelection={this.toggleSelectAll}
          selectedAll={this.state.selectedAll}
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
          isTodosExist={isTodosExist}
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


