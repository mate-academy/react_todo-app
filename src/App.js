import React from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (todo) => {
    const { todos } = this.state;

    this.setState(state => ({
      todos: [...todos, todo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoInput addTodo={this.addTodo} />
        </header>
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            // onChange={selectAllTodo}
            // checked={allChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList todos={todos} />
        </section>
        <Footer />
      </section>
    );
  }
}

export default App;
