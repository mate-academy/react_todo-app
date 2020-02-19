import React from 'react';
import uuidv4 from 'uuid/v4';
import { NewTodo } from './NewTodo';
import { ToggleAll } from './ToggleAll';
import { TodoList } from './TodoList';
import { LeftItems } from './LeftItems';
import { TodosFilter } from './TodosFilter';
import { ClearButton } from './ClearButton';

export class TodoApp extends React.Component {
  state = {
    todos: [],
    newTodoText: '',
    isToggleAll: false,
    activeFilter: 'all',
  };

  handleNewTodoChange = (evt) => {
    this.setState({ newTodoText: evt.target.value });
  };

  handleNewTodoKeyDown = () => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: uuidv4(),
          title: prevState.newTodoText,
          completed: false,
        },
      ],
      newTodoText: '',
    }));
  };

  toggleTodo = (todoId) => {
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

  handleToggleAllChange = () => {
    this.setState(prevState => ({
      isToggleAll: !prevState.isToggleAll,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !prevState.isToggleAll,
      })),
    }));
  };

  handleClearButtonClick = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleRemoveTodoButtonClick = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  handleTodoTextUpdate = (todoId, text) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          title: text,
        };
      }),
    }));
  };

  handleFilterClick = (activeFilter) => {
    this.setState({ activeFilter });
  };

  render() {
    const { todos, newTodoText, isToggleAll, activeFilter } = this.state;

    const leftItemsCount = todos.filter(todo => !todo.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo
            value={newTodoText}
            onChange={this.handleNewTodoChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
        </header>

        <section className="main">
          <ToggleAll
            value={isToggleAll}
            onToggleAllChange={this.handleToggleAllChange}
          />
          <TodoList
            todos={todos}
            onTodoToggle={this.toggleTodo}
            onTodoRemove={this.handleRemoveTodoButtonClick}
            onTodoTextUpdate={this.handleTodoTextUpdate}
          />
        </section>

        <footer className="footer">
          <LeftItems count={leftItemsCount} />
          <TodosFilter
            activeFilter={activeFilter}
            onFilterClick={this.handleFilterClick}
          />
          <ClearButton onClick={this.handleClearButtonClick} />
        </footer>
      </section>
    );
  }
}
