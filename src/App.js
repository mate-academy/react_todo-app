import React, { Component } from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Filters } from './components/Filters/Filters';

class App extends Component {
  state = {
    filtersFlag: 1,
    count: localStorage.todos
      ? (JSON.parse(localStorage.getItem('todos'))).length
      : 0,
    visibleTodos: localStorage.todos
      ? JSON.parse(localStorage.getItem('todos'))
      : [],
  }

  filter = (flag) => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (flag === 1) {
      return [...todos];
    }

    if (flag === 2) {
      return [...todos.filter(item => !item.completed)];
    }

    if (flag === 3) {
      return [...todos.filter(item => item.completed)];
    }

    return undefined;
  }

  filtersHandler = (flagFilters) => {
    this.setState({
      filtersFlag: flagFilters,
      visibleTodos: this.filter(flagFilters),
    });
  }

  checkBoxHandler = (id) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const curentTodo = todos.find(todo => todo.id === id);

    curentTodo.completed = !curentTodo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState(prevState => ({
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  onClearButton = () => {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos = todos.filter(todo => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState(prevState => ({
      count: todos.length,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  destroyHandler = (id) => {
    let todos = JSON.parse(localStorage.getItem('todos'));

    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState(prevState => ({
      count: todos.length,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  editHandler = (id, title) => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    (todos.find(item => item.id === id)).title = title;
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState(prevState => ({
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  newTodoHandler = (title) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newId = +localStorage.getItem('todoLastId') + 1;

    todos.push({
      id: newId,
      title,
      completed: false,
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todoLastId', `${newId}`);
    this.setState(prevState => ({
      count: todos.length,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  render() {
    if (!localStorage.todos) {
      localStorage.setItem('todos', '[]');
      localStorage.setItem('todoLastId', '0');
    }

    return (
      <section className="todoapp">
        <NewTodo onNewTodo={this.newTodoHandler} />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            onEdit={this.editHandler}
            onDestroy={this.destroyHandler}
            onCheckBox={this.checkBoxHandler}
            todos={this.state.visibleTodos}
          />
        </section>
        <footer className="footer">
          <span className="todo-count">
            {`${this.state.count} items left`}
          </span>

          <Filters todos={this.todos} onFilters={this.filtersHandler} />

          <button
            type="button"
            className="clear-completed"
            onClick={this.onClearButton}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
