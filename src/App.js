import React from 'react';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export class App extends React.Component {
  state = {
    todos: [],
    initialTodos: [],
    buttonSelected: 'all',
  }

  handleAddNewTodo = (todo) => {
    if (todo.title) {
      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
        initialTodos: [...prevState.initialTodos, todo],
      }));
    }

    this.handleButtonChange(this.state.buttonSelected);
  };

  handlecompletedAll = () => {
    const filterFunc = todos => (
      todos.map(todo => ({
        ...todo,
        completed: !todos.every(({ completed }) => completed),
      }))
    );

    this.setState(prevState => ({
      todos: filterFunc(prevState.todos),
      initialTodos: filterFunc(prevState.initialTodos),
    }));
    this.handleButtonChange(this.state.buttonSelected);
  };

  handleTodoStatus = (todoId) => {
    const mapFuncStatusTodo = todo => (
      todo.id === todoId
        ? {
          ...todo, completed: !todo.completed,
        }
        : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(mapFuncStatusTodo),
      initialTodos: prevState.initialTodos.map(mapFuncStatusTodo),
    }));
  };

  handleDeleteTodo = (todoId) => {
    const todosFilter = todo => (
      todo.id !== todoId
    );

    this.setState(prevState => ({
      todos: prevState.todos.filter(todosFilter),
      initialTodos: prevState.initialTodos.filter(todosFilter),
    }));
  };

  handleDoubleClick = (todoTitle, todoId) => {
    const mapFuncEditTitle = todo => (
      todo.id === todoId
        ? {
          ...todo, title: todoTitle,
        }
        : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(mapFuncEditTitle),
    }));
  };

  handleButtonChange = (value) => {
    switch (value) {
      case 'active':
        this.setState(prevState => ({
          todos: prevState.initialTodos.filter(todo => !todo.completed),
          buttonSelected: 'active',
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          todos: prevState.initialTodos.filter(todo => todo.completed),
          buttonSelected: 'completed',
        }));
        break;
      case 'all':
      default:
        this.setState(prevState => ({
          todos: [...prevState.initialTodos],
          buttonSelected: 'all',
        }));
    }
  };

  handleDeleteAllCompleted = () => {
    const filterFunc = todos => (
      todos.filter(todo => !todo.completed)
    );

    this.setState(prevState => ({
      todos: filterFunc(prevState.todos),
      initialTodos: filterFunc(prevState.initialTodos),
    }));
  };

  render() {
    const {
      todos, initialTodos, buttonSelected,
    } = this.state;

    return (
      <div className="todoapp">
        <NewTodo addNewTodo={this.handleAddNewTodo} />

        <div className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.handlecompletedAll}
          />
          <label htmlFor="toggle-all">Mark all as completed</label>

          <TodoList
            todosList={todos}
            handleTodoStatus={this.handleTodoStatus}
            handleDeleteTodo={this.handleDeleteTodo}
            handleDoubleClick={this.handleDoubleClick}
          />
        </div>
        <TodosFilter
          todosList={todos}
          initialTodos={initialTodos}
          buttonSelected={buttonSelected}
          handleButtonChange={this.handleButtonChange}
          handleDeleteAllCompleted={this.handleDeleteAllCompleted}
        />
      </div>
    );
  }
}
