import React from 'react';
// import classNames from 'classnames';
import { runInThisContext } from 'vm';

class App extends React.Component {
  state = {
    tempTitle: '',
    todo: [],
    sortedTodo: [],
    id: 0,
    all: 'selected',
    complete: '',
    active: '',
  }

  handleSubmit = (event) => {
    const { tempTitle } = this.state;

    event.preventDefault();
    this.setState(prevState => ({
      todo: [...prevState.todo,
        {
          title: tempTitle,
          id: prevState.id,
          status: false,
        }],
      tempTitle: '',
      id: prevState.id + 1,
    }));
    this.copyTodoForOperate();
  }

  addTodo = (event) => {
    this.setState({
      tempTitle: event.target.value,
    });
  };

  statusChange = (event) => {
    const id = Number(event.target.id);

    this.setState(prevState => ({
      todo: prevState.todo.map(item => (item.id === id
        ? {
          title: item.title,
          id: item.id,
          status: !item.status,
        }
        : item)),
      sortedTodo: prevState.sortedTodo.map(item => (item.id === id
        ? {
          title: item.title,
          id: item.id,
          status: !item.status,
        }
        : item)),
    }));
    if (this.state.active === 'selected') { this.activeTodo(); }

    if (this.state.complete === 'selected') { this.completeTodo(); }

    if (this.state.all === 'selected') { this.allTodo(); }
  }

  removeTodo = (event) => {
    const id = Number(event.target.id);

    this.setState(prevState => ({
      sortedTodo: prevState.sortedTodo.filter(item => item.id !== id),
      todo: prevState.todo.filter(item => item.id !== id),
    }));
  }

  copyTodoForOperate = () => {
    this.setState(prevState => ({
      sortedTodo: [...prevState.todo],
    }));
  }

  allTodo = () => {
    this.setState(prevState => ({
      sortedTodo: [...prevState.todo],
      all: 'selected',
      complete: '',
      active: '',
    }));
  }

  activeTodo = () => {
    this.setState(prevState => ({
      sortedTodo: [...prevState.todo].filter(item => item.status === false),
      all: '',
      complete: '',
      active: 'selected',
    }));
  }

  completedTodo = () => {
    this.setState(prevState => ({
      sortedTodo: [...prevState.todo].filter(item => item.status === true),
      all: '',
      complete: 'selected',
      active: '',
    }));
  }

  removeCompleted = () => {
    this.setState(prevState => ({
      todo: prevState.todo.filter(item => item.status === false),
      sortedTodo: prevState.sortedTodo.filter(item => item.status === false),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.addTodo}
              value={this.state.tempTitle}
            />
          </form>
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {this.state.sortedTodo.map(item => (
              <li className={item.status ? 'completed' : ''}>
                <div className="view">
                  <input type="checkbox" checked={item.status} className="toggle" id={item.id} onClick={this.statusChange}/>
                  <label htmlFor="" style={{ display: 'block' }}>{item.title}</label>
                  <button type="button" className="destroy" id={item.id} onClick={this.removeTodo}/>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {this.state.sortedTodo.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={this.state.all}
                onClick={this.allTodo}
              >
                All
              </a>
            </li>

            <li>
              <a href="#/active" className={this.state.active} onClick={this.activeTodo}>Active</a>
            </li>

            <li>
              <a href="#/completed" className={this.state.complete} onClick={this.completedTodo}>Completed</a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.removeCompleted}
          >
            Delete completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
