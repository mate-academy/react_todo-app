import React from 'react';
import TodoList from './TodoList';
import Footer from './Footer';
import NewTodo from './NewTodo';
import './App.css';

class App extends React.Component {
  state = {
    todos: [],
    currentFilter: 'all',
    maxId: 0,
  };

  addTodo = (title) => {
    if (title.trim()) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          title: title.trim(),
          id: prevState.maxId + 1,
          completed: false,
        }],
        maxId: prevState.maxId + 1,
      }));
    }
  };

  setTodoCompleted = (id) => {
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
  };

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  setAllTodosCompleted = (checked) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        {
          ...todo,
          completed: checked,
        }
      )),
    }));
  };

  setFilter = (filter) => {
    this.setState(prevState => ({ currentFilter: filter }));
  };

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    const { currentFilter, todos } = this.state;
    let visibleTodos;

    switch (currentFilter) {
      case 'active':
        visibleTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = todos.filter(todo => todo.completed);
        break;
      default:
        visibleTodos = [...todos];
        break;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={event => this.setAllTodosCompleted(event.target.checked)}
            checked={
              todos.length && todos.every(todo => todo.completed)
            }
          />

          {todos.length !== 0
          && <label htmlFor="toggle-all">Mark all as completed</label>}
          <TodoList
            todos={visibleTodos}
            setTodoCompleted={this.setTodoCompleted}
            removeTodo={this.removeTodo}
          />
        </section>

        {todos.length !== 0
        && (
          <Footer
            allTodos={todos}
            filter={currentFilter}
            setFilter={this.setFilter}
            clearCompletedTodos={this.clearCompletedTodos}
          />
        )}
      </section>
    );
  }
}

export default App;
