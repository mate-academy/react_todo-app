import React from 'react';
import NewTodo from './components/NewTodo/NewTodo';
import TodoItem from './components/TodoItem/TodoItem';

class App extends React.Component {
  state = {
    todos: [],
    IdCount: 0,
  }

  addTodoToData = (inputNewTodoValue) => {
    this.setState(prevState => {

      return ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.IdCount + 1,
            title: inputNewTodoValue,
            completed: false,
          },
        ],
        IdCount: ++prevState.IdCount,
      });
    })
  }

  render() {
    const { todos } = this.state;
    // console.log(this.state.todos);
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodoToData={this.addTodoToData} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
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

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>
      </section>
    );
  }
}

export default App;
