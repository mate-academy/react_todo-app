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
    const { currentFilter } = this.state;

    this.setState(prevState => ({
      allTodos: [...prevState.allTodos, {
        id,
        title,
        completed: false,
      }],
    }), () => this.setFilter(currentFilter));
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
    const { currentFilter } = this.state;

    if (!val) {
      this.setState(prevState => ({
        allTodos: prevState.allTodos.map(todo => (
          { ...todo, completed: false })),
      }), () => this.setFilter(currentFilter));
    } else {
      this.setState(prevState => ({
        allTodos: prevState.allTodos.map(todo => (
          { ...todo, completed: true })),
      }), () => this.setFilter(currentFilter));
    }
  }

  handleToggle = (id) => {
    const { currentFilter } = this.state;

    this.setState(prevState => ({
      allTodos: prevState.allTodos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, completed: !todo.completed })),
    }), () => this.setFilter(currentFilter));
  }

  removeTodo = (id) => {
    const { currentFilter } = this.state;

    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => id !== todo.id),
    }), () => this.setFilter(currentFilter));
  }

  removeCompleted = () => {
    const { currentFilter } = this.state;

    this.setState(prevState => ({
      allTodos: prevState.allTodos.filter(todo => !todo.completed),
    }), () => this.setFilter(currentFilter));
  }

  updateExciting = (id, title) => {
    const { currentFilter } = this.state;

    this.setState(prevState => ({
      allTodos: prevState.allTodos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, title })),
    }), () => this.setFilter(currentFilter));
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
            handleSubmit={this.updateExciting}
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
