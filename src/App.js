import React from 'react';
import TodoList from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    todosCopy: [],
    title: '',
    counter: 4,
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
        todosCopy: prevState.todos,
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
      todosCopy: prevState.todos,
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
      todosCopy: prevState.todos,
    }));
  }

  togleCompleted = () => {
    if (this.state.todos.filter(todo => !todo.completed).length > 0) {
      this.setState(prevState => ({
        todosCopy: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todosCopy: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    }
  }

  showAll = () => {
    this.setState(prevState => ({
      todosCopy: prevState.todos.filter(todo => true),
    }));
  }

  showActive = () => {
    this.setState(prevState => ({
      todosCopy: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  showCompleted = () => {
    this.setState(prevState => ({
      todosCopy: prevState.todos.filter(todo => todo.completed),
    }));
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
              todos={this.state.todosCopy}
              checkboxChange={this.checkboxChange}
              deleteTodo={this.deleteTodo}
            />

            {/* <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="todo-1" />
                <label htmlFor="todo-1">asdfghj</label>
                <button type="button" className="destroy" />
              </div>
              <input type="text" className="edit" />
            </li> */}

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
            {this.state.todos.filter(todo => !todo.completed).length}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={this.showAll}>
                All
              </a>
            </li>

            <li>
              <a href="#/active" onClick={this.showActive}>
                Active
              </a>
            </li>

            <li>
              <a href="#/completed" onClick={this.showCompleted}>
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
