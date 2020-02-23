import React, { Component } from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Filters } from './components/Filters/Filters';

class App extends Component {
  todos = [];

  state = {
    filtersFlag: 1,
    count: 0,
    visibleTodos: this.todos,
    idItem: 0,
  }

  filter = (flag) => {
    if (flag === 1) {
      return [...this.todos];
    }

    if (flag === 2) {
      return [...this.todos.filter(item => !item.completed)];
    }

    if (flag === 3) {
      return [...this.todos.filter(item => item.completed)];
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
    const curentTodo = this.todos.find(todo => todo.id === id);

    curentTodo.completed = !curentTodo.completed;
    this.setState(prevState => ({
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  onClearButton = () => {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.setState(prevState => ({
      count: this.todos.length,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  destroyHandler = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.setState(prevState => ({
      count: this.todos.length,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  editHandler = (id, title) => {
    (this.todos.find(item => item.id === id)).title = title;
    this.setState(prevState => ({
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  newTodoHandler = (title) => {
    this.todos.push({
      id: this.state.idItem + 1, title, completed: false,
    });
    this.setState(prevState => ({
      idItem: prevState.idItem + 1,
      count: prevState.count + 1,
      visibleTodos: this.filter(prevState.filtersFlag),
    }));
  }

  render() {
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

/*
 <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-1" />
              <label htmlFor="todo-1">asdfghj</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-2" />
              <label htmlFor="todo-2">qwertyuio</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-3" />
              <label htmlFor="todo-3">zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-4" />
              <label htmlFor="todo-4">1234567890</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
    */
