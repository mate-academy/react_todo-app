import React from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

const todosFromServer = [
  {
    title: 'Eat',
    id: 1,
    completed: false,
  },
  {
    title: 'Sleep',
    id: 2,
    completed: false,
  },
];

export class App extends React.Component {
  state ={
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

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          {/* <input
            className="new-todo"
            placeholder="What needs to be done?"
          /> */}
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            deleteTodo={this.deleteTodo}
            toggleCheck={this.toggleCheck}
          />

        </section>

        <footer className="footer">
          <span className="todo-count">
            3 items left
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

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
