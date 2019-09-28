/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AddTodo from './components/AddTodo/AddTodo';
// import { runInThisContext } from 'vm';

class App extends React.Component {
  state = {
    todoOriginal: [],
    sortedTodo: [],
    activeTab: 'all',
  }

  addTodo = (newTodo) => {
    if (this.state.activeTab !== 'complete') {
      this.setState(prevState => ({
        todoOriginal: [...prevState.todoOriginal, newTodo],
        sortedTodo: [...prevState.sortedTodo, newTodo],
      }));
    }

    if (this.state.activeTab === 'complete') {
      this.setState(prevState => ({
        todoOriginal: [...prevState.todoOriginal, newTodo],
      }));
    }
  }

  statusChange = (id) => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todoOriginal: prevState.todoOriginal.map(item => (item.id === id
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
    this.showTodo(activeTab);
  }

  markAll = () => {
    const {
      todoOriginal,
      activeTab,
    } = this.state;

    if (todoOriginal.every(todo => todo
      .status === (true || false))) {
      this.setState(prevState => ({
        todoOriginal: prevState.todoOriginal.map(item => ({
          title: item.title,
          id: item.id,
          status: !item.status,
        })),
        sortedTodo: prevState.sortedTodo.map(item => ({
          title: item.title,
          id: item.id,
          status: !item.status,
        })),
      }));
      this.showTodo(activeTab);
    } else {
      this.setState(prevState => ({
        todoOriginal: prevState.todoOriginal.map(item => ({
          title: item.title,
          id: item.id,
          status: true,
        })),
        sortedTodo: prevState.sortedTodo.map(item => ({
          title: item.title,
          id: item.id,
          status: true,
        })),
      }));
      this.showTodo(activeTab);
    }
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todoOriginal: prevState.todoOriginal.filter(item => item.id !== id),
      sortedTodo: prevState.sortedTodo.filter(item => item.id !== id),
    }));
  }

  removeCompleted = () => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todoOriginal: prevState.todoOriginal
        .filter(item => item.status === false),
      sortedTodo: prevState.todoOriginal.filter(item => item.status === false),
    }));
    this.showTodo(activeTab);
  }

  showTodo(activeTab) {
    if (activeTab === 'all') {
      this.setState(prevState => ({
        sortedTodo: [...prevState.todoOriginal],
        activeTab: 'all',
      }));
    }

    if (activeTab === 'active') {
      this.setState(prevState => ({
        sortedTodo: prevState.todoOriginal
          .filter(item => item.status === false),
        activeTab: 'active',
      }));
    }

    if (activeTab === 'complete') {
      this.setState(prevState => ({
        sortedTodo: prevState.todoOriginal.filter(item => item.status === true),
        activeTab: 'complete',
      }));
    }
  }

  render() {
    const {
      activeTab,
      sortedTodo,
      todoOriginal,
    } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo
            addTodo={this.addTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.markAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {sortedTodo.map(item => (
              <li className={item.status ? 'completed' : ''}>
                <div className="view">
                  <input
                    type="checkbox"
                    checked={item.status}
                    className="toggle"
                    id={item.id}
                    onClick={() => this.statusChange(item.id)}
                  />
                  <label
                    htmlFor={item.id}
                    style={{ display: 'block' }}
                  >
                    {item.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    id={item.id}
                    onClick={() => this.removeTodo(item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {todoOriginal
              .filter(item => item.status === false).length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={activeTab === 'all' ? 'selected' : 0}
                onClick={() => this.showTodo('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={activeTab === 'active' ? 'selected' : 0}
                onClick={() => this.showTodo('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={activeTab === 'complete' ? 'selected' : 0}
                onClick={() => this.showTodo('complete')}
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
            Delete completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
