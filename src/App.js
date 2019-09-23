import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    todos: [],
    todosOrigin: [],
    indexTab: '',
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      todosOrigin: [...prevState.todosOrigin, todo],
    }));
  };

  activeClick = () => {
    this.setState(prevState => ({
      todos: prevState.todosOrigin.filter(todo => !todo.completed),
      indexTab: 'active',
    }));
  };

  completedClick = () => {
    this.setState(prevState => ({
      todos: prevState.todosOrigin.filter(todo => todo.completed),
      indexTab: 'completed',
    }));
  };

  allTodosClick = () => {
    this.setState(prevState => ({
      todos: [...prevState.todosOrigin],
      indexTab: false,
    }));
  };

  checkBoxClick = (todo, index) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((elem, i) => (i === index
        ? Object.assign(elem, { completed: !prevState.todos[i].completed })
        : elem)),
    }));
    if (this.state.indexTab === 'active') {
      this.activeClick();
    }

    if (this.state.indexTab === 'completed') {
      this.completedClick();
    }
  };

  destroyClick = (todo) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(el => el.id !== todo.id),
      todosOrigin: prevState.todosOrigin.filter(el => el.id !== todo.id),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      todosOrigin: prevState.todosOrigin.filter(todo => !todo.completed),
    }));
  };

  allCompleted = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.every(todo => todo.completed)
        || prevState.todos.every(todo => !todo.completed)
          ? prevState.todos
            .map(elem => Object.assign(elem, { completed: !elem.completed }))
          : prevState.todos
            .map(elem => Object.assign(elem, { completed: true })),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.allCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={this.state.todos}
            checkBoxClick={this.checkBoxClick}
            destroyClick={this.destroyClick}
          />
        </section>

        {(this.state.todosOrigin.length > 0) && (
          <Footer
            todos={this.state.todos}
            activeClick={this.activeClick}
            allTodosClick={this.allTodosClick}
            completedClick={this.completedClick}
            clearCompleted={this.clearCompleted}
            indexTab={this.state.indexTab}
          />
        )}
      </section>
    );
  }
}

export default App;
