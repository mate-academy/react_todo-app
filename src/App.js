import React from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Form } from './components/Form/Form';

class App extends React.Component {
  state = {
    todos: [],
    originTodos: [],
    activeTab: false,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      originTodos: [...prevState.todos, todo],
      todos: [...prevState.todos, todo],
    }));
  };

  filteredTodos = ({ target }) => {
    const filter = target.getAttribute('href').slice(2) || 'all';

    if (filter === 'active') {
      this.setState(prevState => ({
        todos: [...prevState.originTodos].filter(elem => !elem.completed),
        activeTab: filter,
      }));
    }

    if (filter === 'completed') {
      this.setState(prevState => ({
        todos: [...prevState.originTodos].filter(elem => elem.completed),
        activeTab: filter,
      }));
    }
  };

  handleReset = () => {
    this.setState(prevState => ({
      todos: [...prevState.originTodos],
      activeTab: false,
    }));
  };

  handleDelete = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(elem => elem.id !== todo.id),
    }));
  };

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => !todo.completed),
      originTodos: prevState.originTodos.filter(todo => !todo.completed),
    }));
  };

  checkBoxClick = (index) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((elem, i) => {
        if (i === index) {
          return Object.assign(elem, {
            completed: !prevState.todos[i].completed,
          });
        }

        return elem;
      }),
    }));

    if (this.state.activeTab === 'active') {
      this.filteredActive();
    }

    if (this.state.activeTab === 'completed') {
      this.filteredCompleted();
    }
  };

  handleAllCompleted = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.every(item => item.completed)
        || prevState.todos.every(item => !item.completed)
          ? prevState.todos.map((elem, i) =>
            Object.assign(elem, { completed: !prevState.todos[i].completed }))
          : prevState.todos.map(elem =>
            Object.assign(elem, { completed: true })),
    }));
  };

  render() {
    const { todos, originTodos, activeTab } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <Form addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.handleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            checkBoxClick={this.checkBoxClick}
            handleDelete={this.handleDelete}
          />
        </section>

        {originTodos.length > 0 && (
          <Footer
            todos={todos}
            filteredTodos={this.filteredTodos}
            handleReset={this.handleReset}
            handleClearCompleted={this.handleClearCompleted}
            activeTab={activeTab}
          />
        )}
      </section>
    );
  }
}

export default App;
