import React from 'react';
import { TodoList } from './components/TodoList/TodoList';

import todosFromServer from './api/todos';

class TodoApp extends React.Component {
  state = {
    todos: todosFromServer,
    id: todosFromServer.length,
    title: '',
    completed: false,
    filter: 'all',
    isAllSelected: false,
    isAllBtnSelected: false,
    isActiveBtnSelected: false,
    isCompletedBtnSelected: false,
  }

  handleInputTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  addNewTodo = (event) => {
    if (event.key === 'Enter'
    && this.state.title.trim() !== '') {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id: state.id + 1,
            title: state.title,
            completed: false,
          }],
        id: state.id + 1,
        title: '',
      }));
    }
  }

  deleteTodo = ({ target }) => {
    const todoId = this.state.todos.findIndex(item => item.id === +target.id);

    this.setState((state) => {
      const remainingTodos = [...state.todos];

      remainingTodos.splice(todoId, 1);

      return (
        {
          todos: [...remainingTodos],
        }
      );
    });
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  filterAll = () => {
    this.setState({
      filter: 'all',
      isAllBtnSelected: true,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: false,
    });
  }

  filterActive = () => {
    this.setState({
      filter: 'active',
      isAllBtnSelected: false,
      isActiveBtnSelected: true,
      isCompletedBtnSelected: false,
    });
  }

  filterCompleted = () => {
    this.setState({
      filter: 'completed',
      isAllBtnSelected: false,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: true,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.completed === false),
    }));
  }

  selectAll = () => {
    this.setState(state => ({
      isAllSelected: !state.isAllSelected,
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !state.isAllSelected,
      })),
    }));
  }

  render() {
    const { todos,
      title,
      filter,
      isAllSelected,
      isActiveBtnSelected,
      isAllBtnSelected,
      isCompletedBtnSelected } = this.state;

    let currentTodos = [...todos];

    const completedTodos = [];
    const activeTodos = [];

    todos.forEach((todo) => {
      if (todo.completed) {
        completedTodos.push(todo);
      } else {
        activeTodos.push(todo);
      }
    });

    if (filter === 'active') {
      currentTodos = activeTodos;
    }

    if (filter === 'completed') {
      currentTodos = completedTodos;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleInputTitle}
            onKeyDown={this.addNewTodo}
            value={title}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.selectAll}
            checked={isAllSelected}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TodoList
            todos={currentTodos}
            deleteTodo={this.deleteTodo}
            changeStatus={this.changeStatus}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={isAllBtnSelected ? 'selected' : ''}
                onClick={this.filterAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={isActiveBtnSelected ? 'selected' : ''}
                onClick={this.filterActive}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={isCompletedBtnSelected ? 'selected' : ''}
                onClick={this.filterCompleted}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default TodoApp;
