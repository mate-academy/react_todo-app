import React from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    currentFilter: 'all',
    allTodos: [],
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
    }), () => this.setFilter(this.state.currentFilter));
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

  toggleAll = (event) => {
    const val = event.target.checked;

    if (!val) {
      this.setState(prevState => ({
        allTodos: prevState.allTodos.map(todo => (
          { ...todo, completed: false })),
      }), () => this.setFilter(this.state.currentFilter));
    } else {
      this.setState(prevState => ({
        allTodos: prevState.allTodos.map(todo => (
          { ...todo, completed: true })),
      }), () => this.setFilter(this.state.currentFilter));
    }
  }

  handleToggle = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, completed: !todo.completed })),
    }), () => this.setFilter(this.state.currentFilter));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => id !== todo.id),
    }), () => this.setFilter(this.state.currentFilter));
  }

  removeCompleted = (id) => {
    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => !todo.completed),
    }), () => this.setFilter(this.state.currentFilter));
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
            handleToggleAll={this.toggleAll}
            handleRemove={this.removeTodo}
          />
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {this.state.allTodos.filter(todo => !todo.completed).length}
            {' '}
            items left
          </span>

          <Filters setFilter={this.setFilter} />

          <button
            type="button"
            className="clear-completed"
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
