import React, { Component } from 'react';
import shortid from 'shortid';

import './App.scss';
import TodoNew from './components/TodoNew/TodoNew';
import TodoList from './components/TodoList/TodoList';

export default class App extends Component {
  state = {
    todoList: [],
    isFiltered: false,
    isFilerOnCompleted: false,
  };

  onNewTodoSubmit = title => this.setState(({ todoList }) => ({
    todoList: [
      ...todoList,
      {
        id: shortid.generate(),
        title,
        completed: false,
      },
    ],
  }));

  onRemoveTodoClick = id => this.setState(({ todoList }) => ({
    todoList: todoList.filter(todo => todo.id !== id),
  }));

  handleTodoTitleEdit = (id, title) => this.setState(({ todoList }) => ({
    todoList: todoList.map(todo => (todo.id === id
      ? { ...todo, title }
      : todo)),
  }));

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

          <TodoNew onSubmit={this.onNewTodoSubmit} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
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
