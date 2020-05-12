import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';

class App extends React.Component {
  state = {
    filter: '',
    popper: '',
    title: '',
    todos: [],
  }

  componentDidMount() {
    const stockTodos = JSON.parse(localStorage.getItem('todos'));

    if (stockTodos) {
      this.setState({ todos: stockTodos });
    }
  }

  componentDidUpdate(prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      this.saveToStockTodos();
    }
  }

  addTodo = (event) => {
    if (this.state.title.trim() !== '') {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            title: state.title,
            completed: false,
          }],
        title: '',
      }));
    }

    event.preventDefault();
  }

  removeTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  filterTodo = ({ target: { name } }) => {
    this.setState({
      filter: name,
      popper: name,
    });
  }

  pickAll = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  changeInput = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  editTitle = (id, newTitle) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }),
    }));
  }

  changeComplete = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  clearComplete = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.completed === false),
    }));
  }

  saveToStockTodos() {
    const todos = JSON.stringify(this.state.todos);

    localStorage.setItem('todos', todos);
  }

  render() {
    const {
      filter,
      popper,
      title,
      todos,
    } = this.state;

    let tasks = [...todos];

    if (filter === 'active') {
      tasks = todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      tasks = todos.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.changeInput}
              value={title}
            />
          </form>
        </header>

        <section className="main">
          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={this.pickAll}
                checked={todos.every(todo => todo.completed)}
              />
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
            </>
          )}

          <TodoList
            todos={tasks}
            removeTodo={this.removeTodo}
            changeComplete={this.changeComplete}
            editTitle={this.editTitle}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {tasks.length === 1
                ? `${tasks.length} todo left`
                : `${tasks.length} todos left`
              }
            </span>

            <ul className="filters">
              <li>
                <a
                  name="all"
                  href="#/"
                  className={popper === 'all' ? 'selected' : ''}
                  onClick={this.filterTodo}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  name="active"
                  href="#/active"
                  className={popper === 'active' ? 'selected' : ''}
                  onClick={this.filterTodo}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  name="completed"
                  href="#/completed"
                  className={popper === 'completed' ? 'selected' : ''}
                  onClick={this.filterTodo}
                >
                  Completed
                </a>
              </li>
            </ul>
            {tasks.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearComplete}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>
    );
  }
}

export default App;
