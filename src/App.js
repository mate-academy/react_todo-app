import React, { Component } from 'react';
import './index.css';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

class App extends Component {
  state = {
    filter: 'all',
    todos: [{
      text: 'sample todo',
      id: 1,
      completed: true,
    }],
  };

  handleAddTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  }

  handleToggleTodo = (isChecked, todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            completed: !isChecked,
          };
        }

        return item;
      }),
    }));
  }

  handleRemoveTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== todoId),
    }));
  }

  handleEditTodo = (todoId, text) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            text,
          };
        }

        return item;
      }),
    }));
  }

  handleToggleTab = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(({ completed }) => completed),
    }));
  }

  handleToggleAll = (event) => {
    const completed = event.target.checked;

    this.setState(prevState => ({
      todos: prevState.todos.map(item => ({
        ...item,
        completed: !completed,
      })),
    }));
  }

  filterTodos = (filter, todos) => {
    let filteredTodos = todos;

    if (filter === 'completed') {
      filteredTodos = todos.filter(({ completed }) => !completed);
    } else if (filter === 'active') {
      filteredTodos = todos.filter(({ completed }) => completed);
    }

    return filteredTodos;
  }

  render() {
    const { filter, todos } = this.state;

    return (
      <section className="todoapp">
        <TodoHeader
          handleAddTodo={this.handleAddTodo}
        />
        <section className="main">
          <TodoList
            todos={this.filterTodos(filter, todos)}
            handleEditTodo={this.handleEditTodo}
            handleToggleAll={this.handleToggleAll}
            handleToggleTodo={this.handleToggleTodo}
            handleRemoveTodo={this.handleRemoveTodo}
            isChecked={todos.every(todo => !(todo.completed))}
          />
        </section>
        <TodoFooter
          filter={filter}
          todos={todos}
          todosCount={todos.filter(({ completed }) => completed).length}
          handleTab={this.handleToggleTab}
          handleClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
