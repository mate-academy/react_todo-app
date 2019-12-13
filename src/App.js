import React from 'react';
import cn from 'classnames';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

export const FILTERS_TYPES = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export class App extends React.Component {
  state = {
    currentFilter: FILTERS_TYPES.all,
    todos: [],
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
      currentFilter: FILTERS_TYPES.all,
    }));
  };

  checkTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  editTodoTitle = (todoId, newTitle) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todoId !== todo.id || todo.title === newTitle) {
          return todo;
        }

        return {
          ...todo,
          title: newTitle,
        };
      }),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  toggleAllTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !this.isAllChecked(),
      })),
    }));
  };

  isAllChecked = () => this.state.todos.every(todo => todo.completed);

  setFilter = (filterValue) => {
    this.setState({
      currentFilter: filterValue,
    });
  };

  filterArray = () => {
    switch (this.state.currentFilter) {
      case FILTERS_TYPES.completed:
        return this.state.todos.filter(todo => todo.completed);
      case FILTERS_TYPES.active:
        return this.state.todos.filter(todo => !todo.completed);
      case FILTERS_TYPES.all:
      default: return this.state.todos.filter(todo => todo);
    }
  };

  render() {
    const { todos, currentFilter } = this.state;
    const visibleTodos = this.filterArray();
    const isAllChecked = this.isAllChecked();
    const todosLength = todos.length;

    return (
      <section className={cn('todoapp')}>
        <h1>todos</h1>
        <TodoHeader
          addTodo={this.addTodo}
          toggleAllTodos={this.toggleAllTodos}
          isAllChecked={isAllChecked}
          todosLength={todosLength}
        />
        <section
          className={cn('main')}
          style={{ display: 'block' }}
        >
          <TodoList
            todos={visibleTodos}
            deleteTodo={this.deleteTodo}
            checkTodo={this.checkTodo}
            editTodoTitle={this.editTodoTitle}
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
