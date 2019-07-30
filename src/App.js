import React from 'react';

const globalTodos = [
  { id: 1, title: 'todo1', done: false },
  { id: 2, title: 'todo2', done: true },
];

const getMaxId = todos => Math.max(...todos.map(todo => todo.id), 0);

class App extends React.Component {
  state = {
    newTitle: '',
    currentFilter: 'all',
    cachedTodos: [...globalTodos],
    visibleTodos: globalTodos,
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      newTitle: value,
    });
  }

  handleKeyPressed = (event) => {
    if (event.keyCode === 13) {
      this.handleAddTodo();
    }
  }

  handleAddTodo = () => {
    const { newTitle, currentFilter } = this.state;

    newTitle && this.setState((state) => {
      const newTodos = [
        ...state.cachedTodos,
        {
          id: getMaxId(state.cachedTodos) + 1,
          title: newTitle,
          done: false,
        },
      ];

      return ({
        newTitle: '',
        cachedTodos: newTodos,
        visibleTodos: this.filterByStatus(newTodos, currentFilter),
      });
    });
  }

  deleteTodo = (id) => {
    this.setState((state) => {
      const newTodos = [...state.cachedTodos].filter(todo => todo.id !== id);

      return ({
        cachedTodos: [...newTodos],
        visibleTodos: this.filterByStatus(newTodos, state.currentFilter),
      });
    });
  }

  handleFilter = filterValue => this.setState(state => ({
    currentFilter: filterValue,
    visibleTodos: this.filterByStatus(state.cachedTodos, filterValue),
  }));

  filterByStatus = (todos, filterValue) => {
    if (filterValue === 'all') {
      return [...todos];
    }

    if (filterValue === 'active') {
      return [...todos].filter(todo => (
        todo.done === false
      ));
    }

    return [...todos].filter(todo => (
      todo.done === true
    ));
  }

  toggleCompletion = () => this.setState((state) => {
    let toggledTodos;

    if (state.cachedTodos.every(todo => todo.done)) {
      toggledTodos = state.cachedTodos.map(todo => ({
        ...todo,
        done: false,
      }));
    } else {
      toggledTodos = state.cachedTodos.map(todo => ({
        ...todo,
        done: true,
      }));
    }

    return {
      cachedTodos: [...toggledTodos],
      visibleTodos: toggledTodos,
    };
  })

  toggleTodoStatus = (id) => {
    this.setState((state) => {
      const newTodos = state.cachedTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      });

      return ({
        cachedTodos: [...newTodos],
        visibleTodos: this.filterByStatus(newTodos, state.currentFilter),
      });
    });
  }

  render() {
    const { currentFilter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPressed}
            onBlur={this.handleAddTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.toggleCompletion}
          />
          {
            /* eslint-disable jsx-a11y/label-has-for */
            /* eslint-disable jsx-a11y/label-has-associated-control */
          }
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
          {
            /* eslint-enable jsx-a11y/label-has-for */
            /* eslint-enable jsx-a11y/label-has-associated-control */
          }

          <ul className="todo-list">
            {this.state.visibleTodos.map(todo => (
              <li
                className={todo.done ? 'completed' : ''}
                key={todo.id}
              >
                <div className="view">
                  <label htmlFor={`todo-${todo.id}`}>
                    <input
                      type="checkbox"
                      id={`todo-${todo.id}`}
                      className="toggle"
                      value={todo.done}
                      checked
                      onChange={() => this.toggleTodoStatus(todo.id)}
                    />
                    {todo.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => this.deleteTodo(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${[...this.state.cachedTodos]
              .filter(todo => todo.done === false)
              .length}
            items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={currentFilter === 'all' ? 'selected' : ''}
                onClick={() => this.handleFilter('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={currentFilter === 'active' ? 'selected' : ''}
                onClick={() => this.handleFilter('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={currentFilter === 'completed' ? 'selected' : ''}
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
          />
        </footer>
      </section>
    );
  }
}

export default App;
