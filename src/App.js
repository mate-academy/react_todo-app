import React from 'react';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    // todosCopy: [],
    title: '',
    counter: 4,
    filter: 'All',
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addTodo = (event) => {
    const newitem = {
      id: this.state.counter,
      title: this.state.title,
      completed: false,
    };

    if (event.key === 'Enter' && this.state.title) {
      this.setState(prevState => ({
        todos: [...prevState.todos, newitem],
        counter: prevState.counter + 1,
        title: '',
        // todosCopy: [...prevState.todos, newitem],
      }));
    }
  }

  checkboxChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (id !== todo.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
      // todosCopy: prevState.todos,
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
      // todosCopy: prevState.todos,
    }));
  }

  togleCompleted = () => {
    if (this.state.todos.filter(todo => !todo.completed).length > 0) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    }
  }

  // showAll = () => {
  //   this.setState(prevState => ({
  //     todosCopy: prevState.todos.filter(todo => true),
  //   }));
  // }

  // showActive = () => {
  //   this.setState(prevState => ({
  //     todosCopy: prevState.todos.filter(todo => !todo.completed),
  //   }));
  // }

  // showCompleted = () => {
  //   this.setState(prevState => ({
  //     todosCopy: prevState.todos.filter(todo => todo.completed),
  //   }));
  // }

  filterHandler = (paramtr) => {
    this.setState({
      filter: paramtr,
    });
  }

  todosFilter = (item) => {
    if (this.state.filter === 'Active') {
      return !item.completed;
    }

    if (this.state.filter === 'Completed') {
      return item.completed;
    }

    return true;
  }

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            onKeyDown={this.addTodo}
            value={this.state.title}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.togleCompleted}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            <TodoList
              todos={this.state.todos.filter(this.todosFilter)}
              checkboxChange={this.checkboxChange}
              deleteTodo={this.deleteTodo}
            />
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            {this.state.todos.filter(todo => !todo.completed).length}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={this.state.filter === 'All' ? 'selected' : ''}
                onClick={() => this.filterHandler('All')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={this.state.filter === 'Active' ? 'selected' : ''}
                onClick={() => this.filterHandler('Active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={this.state.filter === 'Completed' ? 'selected' : ''}
                onClick={() => this.filterHandler('Completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.removeCompleted}
          >
            {this.state.todos.find(todo => todo.completed)
              ? 'Clear completed' : ''}
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
