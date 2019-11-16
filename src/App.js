import React, { Component } from 'react';
import shortid from 'shortid';

import './App.scss';
import TodoList from './components/TodoList/TodoList';

export default class App extends Component {
  state = {
    todoTitle: '',
    todoList: [],
    isFiltered: false,
    isFilerOnCompleted: false,
  };

  onInputChange = (value) => {
    this.setState({ todoTitle: value });
  };

  onNewTodoSubmit = (e) => {
    e.preventDefault();

    const { todoTitle } = this.state;

    if (todoTitle) {
      this.setState(({ todoList }) => ({
        todoTitle: '',
        todoList: [
          ...todoList,
          {
            id: shortid.generate(),
            title: todoTitle,
            completed: false,
          },
        ],
      }));
    }
  };

  onRemoveTodoClick = id => this.setState(({ todoList }) => ({
    todoList: todoList.filter(todo => todo.id !== id),
  }));

  handleTodoTitleEdit = (id, title) => {
    if (title) {
      this.setState(({ todoList }) => ({
        todoList: todoList.map(todo => (todo.id === id
          ? { ...todo, title }
          : todo)),
      }));
    } else {
      this.onRemoveTodoClick(id);
    }
  };

  onCompletedSwitch = id => this.setState(({ todoList }) => {
    const currentTodo = todoList.find(todo => todo.id === id);

    return ({
      todoList: todoList.map(todo => (
        todo.id !== id
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
      isCompleted: currentTodo.completed && this.checkIsCompleted(),
    });
  });

  numberOfNotCompletedTodos = () => {
    const num = this.state.todoList
      .filter(todo => !todo.completed).length;

    return num ? `${num} items left` : '';
  };

  onFilterShowAll = () => this.setState({ isFiltered: false });

  onFilterShowActive = () => this.setState(
    {
      isFiltered: true,
      isFilerOnCompleted: false,
    }
  );

  onFilterShowCompleted = () => this.setState(
    {
      isFiltered: true,
      isFilerOnCompleted: true,
    }
  );

  onToggleCopmpeted = checked => this.setState(({ todoList }) => ({
    todoList: todoList.map(todo => ({ ...todo, completed: checked })),
  }));

  checkIsCompleted = () => this.state.todoList
    .findIndex(todo => todo.completed) !== -1;

  clearCompleted = () => this.setState(({ todoList }) => ({
    todoList: todoList.filter(todo => !todo.completed),
  }));

  render() {
    const { todoList, isFiltered, isFilerOnCompleted } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={e => this.onNewTodoSubmit(e)}>
            <input
              className="new-todo"
              type="text"
              placeholder="What needs to be done?"
              onChange={e => this.onInputChange(e.target.value)}
              value={this.state.todoTitle}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            value={this.state.todoTitle}
            onChange={e => this.onToggleCopmpeted(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todoList={isFiltered
              ? todoList.filter(todo => todo.completed === isFilerOnCompleted)
              : todoList}
            removeTodo={this.onRemoveTodoClick}
            switchCompleted={this.onCompletedSwitch}
            handleTodoTitleEdit={this.handleTodoTitleEdit}
          />
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {this.numberOfNotCompletedTodos()}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={isFiltered ? '' : 'selected'}
                onClick={this.onFilterShowAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={isFiltered && !isFilerOnCompleted
                  ? 'selected'
                  : ''}
                onClick={this.onFilterShowActive}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={isFiltered && isFilerOnCompleted
                  ? 'selected'
                  : ''}
                onClick={this.onFilterShowCompleted}
              >
                Completed
              </a>
            </li>
          </ul>
          {this.checkIsCompleted() && (
            <button
              type="button"
              className="clear-completed"
              style={{ display: 'block' }}
              onClick={this.clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      </section>
    );
  }
}
