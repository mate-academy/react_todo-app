import React, { Component } from 'react';

import TodoList from './components/TodoList/TodoList';
import NewTodo from './components/NewTodo/NewTodo';
import Footer from './components/Footer/Footer';

class App extends Component {
  state = {
    todos: [],
    activeTab: 'all',
    toggleAllComplete: true,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  toggleComplete = id => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    }));
  }

  toggleAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.toggleAllComplete,
      })),
      toggleAllComplete: !prevState.toggleAllComplete,
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  removeAllCompleteTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  updateActiveTab = (string) => {
    this.setState({
      activeTab: string,
    });
  }

  render() {
    const { todos, activeTab } = this.state;

    let todosToShow = [];

    if (activeTab === 'all') {
      todosToShow = todos;
    } else if (activeTab === 'active') {
      todosToShow = todos.filter(todo => !todo.completed);
    } else if (activeTab === 'completed') {
      todosToShow = todos.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.toggleAllComplete}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todosToShow}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
          />
        </section>

        <Footer
          todos={todos}
          removeAllCompleteTodos={this.removeAllCompleteTodos}
          activeTab={activeTab}
          updateActiveTab={this.updateActiveTab}
        />
      </section>
    );
  }
}

export default App;
