import React from 'react';
// import classNames from 'classnames/bind';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

const todosFromServer = [
  {
    title: 'Eat',
    id: '1',
    completed: false,
  },
  {
    title: 'Sleep',
    id: '2',
    completed: false,
  },
];

export class App extends React.Component {
  state = {
    todos: todosFromServer,
  };

  addTodo = (todo) => {
    this.setState(prevstate => ({
      todos: [...prevstate.todos, todo],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  toggleCheck = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
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

  checkAll = () => {
    const { todos } = this.state;

    if (todos.every(todo => todo.completed === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  clearCompleted = () => {
    this.setState(prevstate => ({
      todos: prevstate.todos.filter(todo => todo.completed === false),
    }));
  }

  render() {
    const { todos } = this.state;
    const unfinishedTodos = todos.filter(todo => todo.completed === false);

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
            onClick={this.checkAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            deleteTodo={this.deleteTodo}
            toggleCheck={this.toggleCheck}
          />

        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${unfinishedTodos.length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

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
