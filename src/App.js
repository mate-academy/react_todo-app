import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    filter: 'all',
    isAllBtnSelected: false,
    isActiveBtnSelected: false,
    isCompletedBtnSelected: false,
  }

  componentDidMount() {
    const cacheTodos = JSON.parse(localStorage.getItem('todos'));

    if (cacheTodos) {
      this.setState({ todos: cacheTodos });
    }
  }

  componentDidUpdate(prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      this.saveToLocalStorage();
    }
  }

  handleInputTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  addNewTodo = (event) => {
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

  editCurrentTitle = (id, newTitle) => {
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

  deleteTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  changeStatus = (id) => {
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

  filterAll = () => {
    this.setState({
      filter: 'all',
      isAllBtnSelected: true,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: false,
    });
  }

  filterActive = () => {
    this.setState({
      filter: 'active',
      isAllBtnSelected: false,
      isActiveBtnSelected: true,
      isCompletedBtnSelected: false,
    });
  }

  filterCompleted = () => {
    this.setState({
      filter: 'completed',
      isAllBtnSelected: false,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: true,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.completed === false),
    }));
  }

  selectAll = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  saveToLocalStorage() {
    const todos = JSON.stringify(this.state.todos);

    localStorage.setItem('todos', todos);
  }

  render() {
    const {
      todos,
      title,
      filter,
      isActiveBtnSelected,
      isAllBtnSelected,
      isCompletedBtnSelected,
    } = this.state;

    let currentTodos = [...todos];

    if (filter === 'active') {
      currentTodos = currentTodos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      currentTodos = currentTodos.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addNewTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleInputTitle}
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
                onChange={this.selectAll}
                checked={todos.every(todo => todo.completed)}
              />
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
            </>
          )}

          <TodoList
            todos={currentTodos}
            deleteTodo={this.deleteTodo}
            changeStatus={this.changeStatus}
            editCurrentTitle={this.editCurrentTitle}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={isAllBtnSelected ? 'selected' : ''}
                  onClick={this.filterAll}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={isActiveBtnSelected ? 'selected' : ''}
                  onClick={this.filterActive}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={isCompletedBtnSelected ? 'selected' : ''}
                  onClick={this.filterCompleted}
                >
                  Completed
                </a>
              </li>
            </ul>
            {todos.filter(todo => todo.completed).length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompleted}
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
