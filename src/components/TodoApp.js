import React from 'react';
import TodoList from './TodoList';
// import TodosFilter from './TodosFilter';

class TodoApp extends React.Component {
  state = {
    todos: [],
    newTodo: { title: '' },
    sortField: 'all',
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      todos: [...prevState.todos, prevState.newTodo],
      newTodo: { title: '' },
    }));
  }

  getTodo = (event) => {
    const title = event.target.value,
      id = Math.floor(Math.random() * Math.floor(1000)),
      newTodo = { id, title, completed: false };

    event.preventDefault();
    this.setState({
      newTodo,
    });
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleToggle = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )),
    }));
  };

  handleToggleAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        { ...todo, completed: !todo.completed }
      )),
    }));
  };

  handleFilter = (filterBy) => {
    this.setState({
      filterBy,
    });
  };

  setFilteredTodos = (filterBy) => {
    const { todos } = this.state;

    switch (filterBy) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  render() {
    console.log(this.state.todos)
    const filteredTodos = this.setFilteredTodos(this.state.filterBy);
    return (
      <form onSubmit={this.addTodo}>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.getTodo}
              value={this.state.newTodo.title}
            />
          </header>
          <section className="main" style={{ display: 'block' }}>
            <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.handleToggleAll} />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList todos={filteredTodos} handleToggle={this.handleToggle} deleteTodo={this.deleteTodo} />
          </section>
          <footer className="footer" style={{ display: 'block' }}>
            <span className="todo-count">
              {this.state.todos.filter(todo => !todo.completed).length} items left
            </span>
            <ul className="filters">
              <li>
                <a
                  className="selected"
                  onClick={() => this.handleFilter('active')}
                  href="#/"
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  className="selected"
                  onClick={() => this.handleFilter('all')}
                  href="#/active"
                >
                  All
                </a>
              </li>
              <li>
                <a
                  className="selected"
                  onClick={() => this.handleFilter('completed')}
                  href="#/completed"
                >
                  Completed
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="clear-completed"
              style={this.state.todos
                .some(todo => todo.completed)
                ? { display: 'block' }
                : { display: 'none' }}
              onClick={this.clearCompletedTodos}
            >
            Clear completed
            </button>
          </footer>
        </section>
      </form>
    );
  }
}

export default TodoApp;
