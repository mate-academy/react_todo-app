import React, { Component } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends Component {
  state = {
    todos: ['drink coffee'],
  };

  render() {
    const { todos } = this.state;
    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList todos={todos} />
        </section>
        <Footer />
      </section>
    );
  }
}

export default App;
