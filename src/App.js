import React from 'react';

import TodoList from './components/TodoList/TodoList';
import Form from './components/Form/Form';
import Filters from './components/Filters/Filters';

class App extends React.Component {
  state = {
    todos: [],
    completedAll: 0, // eslint-disable-line
    active: 1,
  }

  AddTodo = (inputFormValue) => {
    this.setState(({ todos }) => ({
      todos: [
        ...todos,
        inputFormValue,
      ],
    }));
  }

  destroyTodo = (idTodoToDestroy) => {
    this.setState(({ todos }) => ({
      todos: todos
        .filter(todo => todo.id !== idTodoToDestroy),
    }));
  }

  changeStatus = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => (
        todo.id !== id
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
    }));
  }

  changeStatusAll = () => {
    this.setState(({ todos, completedAll }) => (
      completedAll === 0
        ? {
          todos: todos.map(todo => (
            {
              ...todo,
              completed: true,
            }
          )),
          completedAll: 1,
        }
        : {
          todos: todos.map(todo => (
            {
              ...todo,
              completed: false,
            }
          )),
          completedAll: 0,
        }
    ));
  }

  nonCompletedCount = () => {
    const count = this.state.todos
      .filter(todo => !todo.completed);

    return count.length
      ? `${count.length} todos left`
      : false;
  }

  completedAppears = () => {
    const { todos } = this.state;

    return Boolean(todos.filter(todo => todo.completed === true).length);
  }

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos
        .filter(todo => todo.completed !== true),
    }));
  }

  handleTodoTitleEdit = (id, title) => {
    if (title) {
      this.setState(({ todos }) => ({
        todos: todos.map(todo => (todo.id === id
          ? { ...todo, todoTitle: title }
          : todo)),
      }));
    } else {
      this.destroyTodo(id);
    }
  };

  handleFieldChange = (active) => {
    this.setState({
      active,
    });
  }

  filterTodos = (todos, active) => {
    switch (active) {
      case 2:
        return todos.filter(todo => !todo.completed);
      case 3:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }

  render() {
    const { todos, active } = this.state;
    const filteredTodos = this.filterTodos(todos, active);

    localStorage.setItem('todos', JSON.stringify(todos));
    const listOfTodos = localStorage.getItem('todos');
    /* eslint-disable */
    let footerDisplay = '';
    listOfTodos !== "[]"
    ? footerDisplay = 'block'
    : footerDisplay = 'none';
    /* eslint-enable */

    return (
      <section className="todoapp">
        <Form AddTodo={this.AddTodo} />
        <TodoList
          footerDisplay={footerDisplay}
          handleTodoTitleEdit={this.handleTodoTitleEdit}
          changeStatusAll={this.changeStatusAll}
          changeStatus={this.changeStatus}
          destroyTodo={this.destroyTodo}
          todos={filteredTodos}
        />
        <Filters
          handleFieldChange={this.handleFieldChange}
          footerDisplay={footerDisplay}
          clearCompleted={this.clearCompleted}
          completedAppears={this.completedAppears}
          nonCompletedCount={this.nonCompletedCount}
        />
      </section>
    );
  }
}

export default App;
