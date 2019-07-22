/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

class App extends React.Component {
  state = {
    todos: [],
    activ: 0,
    completed: 0,
    filter: 'all',
    newTodo: '',
    toggleAll: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      const currentDate = new Date();

      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            id: currentDate.getTime(),
            text: prevState.newTodo,
            complete: 'activ',
          },
        ],
        newTodo: '',
        activ: prevState.activ + 1,
      }
      ));
    }
  }

  changeStatus = (id) => {
    const newTodos = [...this.state.todos];
    const { activ, toggleAll } = this.state;
    let newActiv = 0;
    let newCompleted = 0;
    let newToggleAll = false;
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];

    if (todo.complete === 'activ') {
      todo.complete = 'completed';
      newActiv = -1;
      newCompleted = 1;
    } else {
      todo.complete = 'activ';
      newActiv = 1;
      newCompleted = -1;
    }

    newTodos.splice(index, 1, todo);

    if (activ + newActiv === 0 && toggleAll === false) {
      newToggleAll = true;
    }

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: prevState.activ + newActiv,
      completed: prevState.completed + newCompleted,
      toggleAll: newToggleAll,
    }));
  }

  changeAllStatus = () => {
    let newTodos = [...this.state.todos];
    let newActiv = 0;
    let newCompleted = 0;

    if (!this.state.toggleAll) {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'completed',
      }));
      newActiv = 0;
      newCompleted = newTodos.length;
    } else {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'activ',
      }));
      newActiv = newTodos.length;
      newCompleted = 0;
    }

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: newActiv,
      completed: newCompleted,
      toggleAll: !prevState.toggleAll,
    }));
  }

  handleDestroy = (id) => {
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex(todo => todo.id === id);
    let newActiv = 0;
    let newCompleted = 0;

    if (newTodos[index].complete === 'activ') {
      newActiv = -1;
    } else {
      newCompleted = -1;
    }

    newTodos.splice(index, 1);

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: prevState.activ + newActiv,
      completed: prevState.completed + newCompleted,
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.complete === 'activ'),
      completed: 0,
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  render() {
    const {
      newTodo, todos, activ, completed, filter, toggleAll,
    } = this.state;
    const filtredTodos = {
      activ: todos.filter(todo => todo.complete === 'activ'),
      completed: todos.filter(todo => todo.complete === 'completed'),
      all: todos,
    };

    let styleList = '';

    (todos.length !== 0) ? styleList = 'block' : styleList = 'none';

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            name="newTodo"
            value={newTodo}
            onChange={this.handleChange}
            onKeyUp={this.handleSubmit}
          />
        </header>

        <section className="main" style={{ display: styleList }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAll}
            onChange={this.changeAllStatus}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {
              filtredTodos[filter].map(todo => (
                <li
                  className={
                    todo.complete === 'completed' ? 'completed' : undefined
                  }
                  key={todo.id}
                >
                  <div className="view">
                    <input
                      type="checkbox"
                      className="toggle"
                      id={`todo-${todo.id}`}
                      checked={todo.complete === 'completed'}
                      onChange={() => this.changeStatus(todo.id)}
                    />
                    <label htmlFor={`todo-${todo.id}`}>{todo.text}</label>
                    <button
                      type="button"
                      className="destroy"
                      onClick={() => this.handleDestroy(todo.id)}
                    />
                  </div>
                </li>
              ))
            }
          </ul>
        </section>

        <footer className="footer" style={{ display: styleList }}>
          <span className="todo-count">
            {`${activ} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === 'all' ? 'selected' : undefined}
                onClick={() => this.handleFilter('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={filter === 'activ' ? 'selected' : undefined}
                onClick={() => this.handleFilter('activ')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={filter === 'completed' ? 'selected' : undefined}
                onClick={() => this.handleFilter('completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.clearCompleted}
          >
            {completed > 0 && 'Clear completed'}
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
