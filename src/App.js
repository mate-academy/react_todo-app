import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Footer } from './components/Footer/Footer';

export class App extends Component {
  state = {
    todos: [],
    currentFilter: 'all',
  }

  addTodo = (title) => {
    if (title.trim()) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          title: title.trim(),
          id: uuidv4(),
          completed: false,
        }],
      }));
    }
  }

  toggleSetCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return { ...todo };
        }),
    }));
  }

  toggleSetAllCompleted = (checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        {
          ...todo,
          completed: checked,
        }
      )),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setFilter = (filter) => {
    this.setState(prevState => ({
      currentFilter: filter,
    }));
  }

  render() {
    const { todos, currentFilter } = this.state;
    let filteredTodos;

    switch (currentFilter) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = [...todos].filter(todo => todo.completed);
        break;
      default:
        filteredTodos = [...todos];
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm addTodo={this.addTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={filteredTodos}
            toggleSetCompleted={this.toggleSetCompleted}
            toggleSetAllCompleted={this.toggleSetAllCompleted}
            removeTodo={this.removeTodo}
          />
        </section>

        {!todos.length
          || (
            <footer className="footer">
              <Footer
                todos={todos}
                clearCompletedTodos={this.clearCompletedTodos}
                currentFilter={currentFilter}
                setFilter={this.setFilter}
              />
            </footer>
          )}
      </section>
    );
  }
}
