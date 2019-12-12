import React from 'react';
import cn from 'classnames';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

export const FILTERS = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export class App extends React.Component {
  state = {
    inputValue: '',
    currentFilter: FILTERS.all,
    todos: [],
  };

  addTodo = (e) => {
    e.preventDefault();

    this.state.inputValue.trim().length > 0 && this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: +new Date(),
          title: prevState.inputValue,
          completed: false,
        },
      ],
      inputValue: '',
      currentFilter: FILTERS.all,
    }));
  };

  checkTodo = (e, todoId) => {
    e.persist();

    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: e.target.checked,
        };
      }),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  clearCompletedTodos =() => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  toggleAllTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  setFilter = (filterValue) => {
    this.setState({
      currentFilter: filterValue,
    });
  };

  filterArray = () => {
    switch (this.state.currentFilter) {
      case FILTERS.completed:
        return this.state.todos.filter(todo => todo.completed);
      case FILTERS.active:
        return this.state.todos.filter(todo => !todo.completed);
      case FILTERS.all:
      default: return this.state.todos.filter(todo => todo);
    }
  };

  render() {
    const { todos, inputValue, currentFilter } = this.state;
    const visibleTodos = this.filterArray();

    return (
      <section className={cn('todoapp')}>
        <h1>todos</h1>
        <form
          onSubmit={this.addTodo}
          className={cn('header')}
        >
          <input
            onChange={this.handleInputChange}
            value={inputValue}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>

        <section
          className={cn('main')}
          style={{ display: 'block' }}
        >
          <input
            onClick={this.toggleAllTodos}
            type="checkbox"
            id="toggle-all"
            className={cn('toggle-all')}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            deleteTodo={this.deleteTodo}
            checkTodo={this.checkTodo}
          />
        </section>

        {this.state.todos.length > 0 && (
          <TodoFooter
            currentFilter={currentFilter}
            setFilter={this.setFilter}
            todosLeft={todos.filter(todo => !todo.completed).length}
            clearCompletedTodos={this.clearCompletedTodos}
            todos={visibleTodos}
          />
        )}
      </section>
    );
  }
}
