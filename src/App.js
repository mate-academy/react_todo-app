import React from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Form } from './components/Form/Form';

class App extends React.Component {
  state = {
    todos: [],
    originTodos: [],
    indexTab: false,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      originTodos: [...prevState.todos, todo],
      todos: [...prevState.todos, todo],
    }));
  };

  filteredActive = () => {
    this.setState(prevState => ({
      todos: [...prevState.originTodos].filter(elem => elem.completed === false),
      indexTab: 'active',
    }));
  };

  filteredCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.originTodos].filter(elem => elem.completed === true),
      indexTab: 'completed',
    }));
  };

  handleReset = () => {
    this.setState(prevState => ({
      todos: [...prevState.originTodos],
      indexTab: false,
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
      todos: prevState.todos.map((elem, i) => (i === index
        ? Object.assign(elem, { completed: !prevState.todos[i].completed })
        : elem)),
    }));

    if (this.state.indexTab === 'active') {
      this.filteredActive();
    }

    if (this.state.indexTab === 'completed') {
      this.filteredCompleted();
    }
  };

  handleAllcompleted = () => {
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
    const { todos, originTodos, indexTab } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <Form
            addTodo={this.addTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.handleAllcompleted}
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
            filteredActive={this.filteredActive}
            filteredCompleted={this.filteredCompleted}
            handleReset={this.handleReset}
            handleClearCompleted={this.handleClearCompleted}
            indexTab={indexTab}
          />
        )}
      </section>
    );
  }
}

export default App;
