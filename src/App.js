import React, { Component } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Footer } from './components/Footer/Footer';

export class App extends Component {
  state = {
    todos: [],
    filteredTodos: [],
    isActiveFilter: 'all',
  }

  addTodo = (todo) => {
    if (todo.title) {
      this.setState(prevState => ({
        filteredTodos: [...prevState.filteredTodos, todo],
        todos: [...prevState.todos, todo],
      }));
    }
  }

  setCompleted = (id) => {
    const callback = (todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    };

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
      filteredTodos: prevState.filteredTodos.map(callback),
    }));
  }

  setAllCompleted = (checked) => {
    const callback = todo => (
      {
        ...todo,
        completed: checked,
      }
    );

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
      filteredTodos: prevState.filteredTodos.map(callback),
    }));
  }

  editTodo = (editTodoTitle, editTododId) => {
    const callback = (todo) => {
      if (todo.id === editTododId) {
        return {
          ...todo,
          title: editTodoTitle,
        };
      }

      return todo;
    };

    this.setState(prevState => ({
      todos: prevState.todos.map(callback),
      filteredTodos: prevState.filteredTodos.map(callback),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      filteredTodos: prevState.filteredTodos.filter(todo => todo.id !== id),
    }));
  }

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      filteredTodos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setFilteredTodos = (filter) => {
    switch (filter) {
      case 'active':
        this.setState(prevState => ({
          filteredTodos: prevState.todos.filter(todo => !todo.completed),
          isActiveFilter: 'active',
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          filteredTodos: prevState.todos.filter(todo => todo.completed),
          isActiveFilter: 'completed',
        }));
        break;
      default:
        this.setState(prevState => ({
          filteredTodos: prevState.todos,
          isActiveFilter: 'all',
        }));
    }
  }

  render() {
    const { todos, isActiveFilter, filteredTodos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm addTodo={this.addTodo} />
        </header>

        <section className="main">
          <TodoList
            todos={filteredTodos}
            setCompleted={this.setCompleted}
            setAllCompleted={this.setAllCompleted}
            removeTodo={this.removeTodo}
            completedTodos={this.completedTodos}
            editTodo={this.editTodo}
          />
        </section>

        {!todos.length
          || (
            <footer className="footer">
              <Footer
                todos={todos}
                clearCompletedTodos={this.clearCompletedTodos}
                isActiveFilter={isActiveFilter}
                setFilteredTodos={this.setFilteredTodos}
              />
            </footer>
          )}
      </section>
    );
  }
}
