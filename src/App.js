import React, { Component } from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';

export default class App extends Component {
  state = {
    todoList: [],
    isFiltered: false,
    isFilerOnCompleted: false,
  };

  onNewTodoSubmit = (title) => {
    if (title !== '') {
      this.setState(({ todoList }) => {
        const nextId = todoList.length === 0
          ? 1
          : Math.max(...todoList.map(todo => todo.id)) + 1;

        return (
          {
            todoList: [
              ...todoList,
              {
                id: nextId,
                title,
                completed: false,
              },
            ],
          }
        );
      });
    }
  };

  onRemoveTodoClick = id => this.setState(({ todoList }) => (
    {
      todoList: todoList.filter(todo => todo.id !== id),
    }));

  handleTodoTitleEdit = (id, title) => {

    // eslint-disable-next-line no-console
    console.log(id, title);

    this.setState(({ todoList }) => {
      const todoArr = [...todoList];
      const ind = todoList.findIndex(todo => todo.id === id);

      // eslint-disable-next-line no-console
      console.log(id, title);

      todoArr[ind].title = title;

      return (
        {
          todoList: [...todoArr],
        }
      );
    });
  };

  onCompletedSwitch = id => this.setState(({ todoList }) => {
    const arr = [...todoList];
    const ind = arr.findIndex(todo => todo.id === id);

    arr[ind].completed = !arr[ind].completed;

    return (
      {
        todoList: arr,
        isCompleted: arr[ind].completed && this.checkIsCompleted(),
      }
    );
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

  onToggleCopmpeted = checked => this.setState(({ todoList }) => (
    {
      todoList: todoList.map(todo => ({ ...todo, completed: checked })),
    }));

  checkIsCompleted = () => this.state.todoList
    .findIndex(todo => todo.completed) !== -1;

  clearCompleted = () => this.setState(({ todoList }) => (
    {
      todoList: todoList.filter(todo => !todo.completed),
    }));

  render() {
    const { todoList, isFiltered, isFilerOnCompleted } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp onSubmit={this.onNewTodoSubmit} />
        </header>

        <section className="main" style={{ display: 'block' }}>
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
                className="selected"
                onClick={this.onFilterShowAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={this.onFilterShowActive}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
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
