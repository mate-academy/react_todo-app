import React from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';

class TodoApp extends React.Component {
  state = {
    todos: [],
    id: 0,
    view: 'all',
  };

  componentDidMount() {
    if (localStorage.todoApp) {
      this.setState({ ...JSON.parse(localStorage.todoApp) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('todoApp', JSON.stringify(this.state));
    }
  }

  onCheckboxChange = (event) => {
    const id = event.target.getAttribute('idnumber');

    this.setState(prev => ({ todos: [...prev.todos.map((todo) => {
      if (todo.id === +id) {
        return {
          ...todo, completed: !todo.completed,
        };
      }

      return todo;
    })] }));
  }

  onRemove = (event) => {
    const id = event.target.getAttribute('idnumber');

    this.setState(prev => ({
      todos: [...prev.todos.filter(todo => todo.id !== +id)],
    }));
  }

  onInputSubmit = (event) => {
    event.preventDefault();
    const { id } = this.state;
    const title = this.input.value.trim();
    const completed = false;

    if (title === '') {
      return;
    }

    this.setState(prev => ({
      todos: [...prev.todos, {
        title,
        id,
        completed,
      }],
      id: prev.id + 1,
    }));

    event.target.reset();
  }

  onClearSubmit = () => {
    this.setState(prev => ({
      todos: [...prev.todos.filter(todo => !todo.completed)],
    }));
  }

  status = (todo) => {
    switch (this.state.view) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  }

  onCompleteAll = (event) => {
    if (event.target.checked) {
      this.setState(prev => ({
        todos: [...prev.todos.map(todo => ({
          ...todo, completed: true,
        }))],
      }));
    } else {
      this.setState(prev => ({
        todos: [...prev.todos.map(todo => ({
          ...todo, completed: false,
        }))],
      }));
    }
  }

  onStatusClick = (event) => {
    const view = event.target.getAttribute('view');

    this.setState({ view });
  }

  onEdit = (id, title) => {
    if (title.trim() === '') {
      this.setState(prev => ({
        todos: [...prev.todos.filter(todo => todo.id !== +id)],
      }));
    }

    this.setState(prev => ({
      todos: [...prev.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, title: title.trim(),
          };
        }

        return todo;
      })],
    }));
  }

  render() {
    const { todos, view } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.onInputSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              ref={(e) => {
                this.input = e;
              }}
            />
          </form>
        </header>

        <section
          className={todos.length > 0 ? 'main' : 'main hide'}
        >
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.onCompleteAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos.filter(this.status)}
            onCheckboxChange={this.onCheckboxChange}
            onRemove={this.onRemove}
            onEdit={this.onEdit}
          />
        </section>

        <footer className={todos.length > 0 ? 'footer' : 'footer hide'}>
          <span className="todo-count">
            {todos.filter(todo => !todo.completed).length}
            {' '}
            items left
          </span>

          <TodosFilter
            view={view}
            onStatusClick={this.onStatusClick}
          />

          {todos.find(todo => todo.completed) !== undefined ? (
            <button
              type="button"
              className="clear-completed"
              onClick={this.onClearSubmit}
            >
              Clear completed
            </button>
          ) : ''}

        </footer>
      </section>
    );
  }
}

export default TodoApp;
