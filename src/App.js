import React, { Component } from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { Filters } from './components/Filters/Filters';

class App extends Component {
  state = {
    filtersFlag: 1,
    count: 0,
    rawTodos: [],
    visibleTodos: [],
    todoLastId: 0,
  }

  componentDidMount() {
    const todos = localStorage.todos
      ? JSON.parse(localStorage.getItem('todos'))
      : [];
    const lastId = localStorage.todoLastId
      ? +localStorage.getItem('todoLastId')
      : 0;

    this.setState({
      count: todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0),
      rawTodos: todos,
      visibleTodos: todos,
      todoLastId: lastId,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.rawTodos));
    localStorage.setItem('todoLastId', this.state.todoLastId);
  }

  checkBoxHandler = (id) => {
    const todos = [...this.state.rawTodos];
    const currentTodo = todos.find(todo => todo.id === id);

    currentTodo.completed = !currentTodo.completed;

    this.setState(prevState => ({
      rawTodos: [...todos],
      visibleTodos: this.filter(prevState.filtersFlag, todos),
      count: todos.reduce((acc, item) => (item.completed ? acc : acc + 1), 0),
    }));
  }

  onClearButton = () => {
    const todos = this.state.rawTodos.filter(todo => !todo.completed);

    this.setState(prevState => ({
      rawTodos: [...todos],
      visibleTodos: this.filter(prevState.filtersFlag, todos),
      count: todos.length,
    }));
  }

  destroyHandler = (id) => {
    const todos = this.state.rawTodos.filter(todo => todo.id !== id);

    this.setState(prevState => ({
      rawTodos: [...todos],
      count: todos.reduce((acc, item) => (item.completed ? acc : acc + 1), 0),
      visibleTodos: this.filter(prevState.filtersFlag, todos),
    }));
  }

  editHandler = (id, title) => {
    const todos = [...this.state.rawTodos];

    (todos.find(item => item.id === id)).title = title;
    this.setState(prevState => ({
      rawTodos: [...todos],
      visibleTodos: this.filter(prevState.filtersFlag, todos),
    }));
  }

  newTodoHandler = (title) => {
    const todos = [...this.state.rawTodos];
    const newId = this.state.todoLastId + 1;

    todos.push({
      id: newId,
      title,
      completed: false,
    });

    this.setState(prevState => ({
      count: todos.length,
      rawTodos: todos,
      visibleTodos: this.filter(prevState.filtersFlag, todos),
      todoLastId: newId,
    }));
  }

  filter = (flag, todos) => {
    if (flag === 1) {
      return [...todos];
    }

    if (flag === 2) {
      return todos.filter(item => !item.completed);
    }

    if (flag === 3) {
      return todos.filter(item => item.completed);
    }

    return undefined;
  }

  filtersHandler = (flagFilters) => {
    this.setState(prevState => ({
      filtersFlag: flagFilters,
      visibleTodos: this.filter(flagFilters, prevState.rawTodos),
    }));
  }

  handlerToggleAll = (event) => {
    let todos;
    let count;
    const { rawTodos } = this.state;

    if (event.target.checked) {
      todos = rawTodos.map((item) => {
        const newItem = {
          ...item,
          completed: true,
        };

        return newItem;
      });
      count = 0;
    } else {
      todos = rawTodos.map((item) => {
        const newItem = {
          ...item,
          completed: false,
        };

        return newItem;
      });
      count = todos.length;
    }

    this.setState(prevState => ({
      visibleTodos: this.filter(prevState.filtersFlag, todos),
      count,
      rawTodos: [...todos],
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <NewTodo onNewTodo={this.newTodoHandler} />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.handlerToggleAll}
          />
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
