import React from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { TodoCount } from './components/TodoCount';
import { TodosFilter } from './components/TodosFilter';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.todosBackUp = [];

    this.state = {
      todos: [],
      isAllSelected: true,
      isActiveSelected: false,
      isCompletedSelected: false,
    };
  }

  componentDidMount() {
    const todosFromStorage = localStorage.getItem('state') !== null
      ? JSON.parse(localStorage.getItem('state')).todos
      : [];

    this.todosBackUp = todosFromStorage;

    this.setState({
      todos: todosFromStorage,
    });
  }

  componentDidUpdate() {
    if (this.state.isCompletedSelected) {
      const currentState = {
        todos: [...this.todosBackUp],
        isAllSelected: this.state.isAllSelected,
        isActiveSelected: this.state.isActiveSelected,
        isCompletedSelected: this.state.isCompletedSelected,
      };

      localStorage.setItem('state', JSON.stringify(currentState));
    } else {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  backupTodos = () => {
    this.todosBackUp = [...this.state.todos];
  }

  addNewTodo = (newTodo) => {
    if (this.state.isCompletedSelected) {
      this.todosBackUp = [...this.todosBackUp, newTodo];
    } else {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
      }),
      () => this.backupTodos());
    }
  }

  handleCheck = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        const todoCopy = { ...todo };

        if (todo.id === id) {
          todoCopy.completed = !todo.completed;
        }

        return todoCopy;
      }),
    }),
    () => this.backupTodos());
  }

  handleDelete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }),
    () => this.backupTodos());
  }

  toggleAll = () => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          const todoCopy = { ...todo };

          todoCopy.completed = false;

          return todoCopy;
        }),
      }),
      () => this.backupTodos());
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map((todo) => {
          const todoCopy = { ...todo };

          if (!todoCopy.completed) {
            todoCopy.completed = true;
          }

          return todoCopy;
        }),
      }),
      () => this.backupTodos());
    }
  }

  clearCompleted = () => {
    if (this.state.isCompletedSelected) {
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => !todo.completed),
      }),
      () => {
        this.todosBackUp = this.todosBackUp.filter(todo => !todo.completed);
      });
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => !todo.completed),
      }),
      () => this.backupTodos());
    }
  }

  handleFilter = (callback, event) => {
    if (event.target.innerHTML === 'Active') {
      this.setState({
        todos: this.todosBackUp.filter(callback),
        isAllSelected: false,
        isActiveSelected: true,
        isCompletedSelected: false,
      });
    } else if (event.target.innerHTML === 'Completed') {
      this.setState({
        todos: this.todosBackUp.filter(callback),
        isAllSelected: false,
        isActiveSelected: false,
        isCompletedSelected: true,
      });
    }
  }

  handleFilterAll = () => {
    this.setState({
      todos: [...this.todosBackUp],
      isAllSelected: true,
      isActiveSelected: false,
      isCompletedSelected: false,
    });
  }

  saveEditedTodo = (editedTodo) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        let todoCopy = { ...todo };

        if (todoCopy.id === editedTodo.id) {
          todoCopy = { ...editedTodo };
        }

        return todoCopy;
      }),
    }),
    () => this.backupTodos());
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TodoList
            todos={this.state.todos}
            handleCheck={this.handleCheck}
            handleDelete={this.handleDelete}
            saveEditedTodo={this.saveEditedTodo}
          />
        </section>

        <footer className="footer">
          <TodoCount
            todoLength={
              this.state.isCompletedSelected
                ? this.todosBackUp.filter(todo => !todo.completed).length || 0
                : this.state.todos.filter(todo => !todo.completed).length || 0
            }
          />

          <TodosFilter
            handleFilter={this.handleFilter}
            handleFilterAll={this.handleFilterAll}
            isAllSelected={this.state.isAllSelected}
            isActiveSelected={this.state.isActiveSelected}
            isCompletedSelected={this.state.isCompletedSelected}
          />

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
