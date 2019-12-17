import React from 'react';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    counter: 4,
    itemsLeft: 0,
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

    if (event.key === 'Enter') {
      this.setState(prevState => ({
        todos: [...prevState.todos, newitem],
        counter: prevState.counter + 1,
        title: '',
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
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
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
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">

            <TodoList
              todos={this.state.todos}
              checkboxChange={this.checkboxChange}
              deleteTodo={this.deleteTodo}
            />

            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-1" />
                <label htmlFor="todo-1">asdfghj</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            {/* <li className="completed">
              <div className="view">
                <input type="checkbox" checked className="toggle" id="todo-2" />
                <label htmlFor="todo-2">qwertyuio</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li className="editing">
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-3" />
                <label htmlFor="todo-3">zxcvbnm</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-4" />
                <label htmlFor="todo-4">1234567890</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li> */}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            {this.state.itemsLeft}
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
