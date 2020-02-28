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
    const filterFunc = arr => (
      arr.map(todo => ({
        ...todo,
        completed: !arr.every(({ completed }) => completed),
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
      todos: prevState.todos
        .map(mapFuncStatusTodo),
      initialTodos: prevState.initialTodos
        .map(mapFuncStatusTodo),
    }));
  };

  handleDeleteTodo = (todoId) => {
    const arrFilter = todo => (
      todo.id !== todoId
    );

    this.setState(prevState => ({
      todos: prevState.todos
        .filter(arrFilter),
      initialTodos: prevState.initialTodos
        .filter(arrFilter),
    }));
  };

  handleDoubleClickEditTitle = (editedTitle, todoId) => {
    const mapFuncEditTitle = todo => (
      todo.id === todoId
        ? {
          ...todo, title: editedTitle,
        }
        : todo
    );

    this.setState(prevState => ({
      todos: prevState.todos
        .map(mapFuncEditTitle),
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
    const filterFunc = arr => (
      arr.filter(todo => !todo.completed)
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
            handleDoubleClickEditTitle={this.handleDoubleClickEditTitle}
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
