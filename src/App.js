import React from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    currentFilter: 'all',
    allTodos: [{
      id: 1,
      title: 'Hello',
      completed: false,
    }],
    visibleTodos: [],
  }

  componentDidMount() {
    this.setState(prevState => ({
      visibleTodos: [...prevState.allTodos],
    }));
  }

  setNewTodo = (id, title) => {
    this.setState(prevState => ({
      allTodos: [...prevState.allTodos, {
        id,
        title,
        completed: false,
      }],
    }));
    this.setFilter(this.state.currentFilter);
  }

  setFilter = (filter) => {
    this.setState({
      currentFilter: filter,
    });
    switch (filter) {
      case 'all':
        this.setState(prevState => ({
          visibleTodos: prevState.allTodos,
        }));
        break;
      case 'active':
        this.setState(prevState => ({
          visibleTodos: prevState.allTodos.filter(todo => (
            !todo.completed
          )),
        }));
        break;
      case 'completed':
        this.setState(prevState => ({
          visibleTodos: prevState.allTodos.filter(todo => (
            todo.completed
          )),
        }));
        break;
      default:
        break;
    }
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      prevState.allTodos.map((todo) => {
        if (todo.id === id) {
          // eslint-disable-next-line no-param-reassign
          todo.completed = !todo.completed;
        }

        return 0;
      });
    });
    this.setFilter(this.state.currentFilter);
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => id !== todo.id),
    }));
    this.setFilter(this.state.currentFilter);
  }

  removeCompleted = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => !todo.completed),
    }));
    this.setFilter(this.state.currentFilter);
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodo handleSubmit={this.setNewTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <TodoList
            todos={this.state.visibleTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.removeTodo}
          />
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {this.state.allTodos.filter(todo => (
              todo.completed === false
            )).length}
            {' '}
            items left
          </span>

          <Filters setFilter={this.setFilter} />

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.removeCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
