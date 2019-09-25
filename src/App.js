import React from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Form } from './components/Form/Form';

class App extends React.Component {
  state = {
    todos: [],
    originTodos: [],
    isTabActive: false,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      originTodos: [...prevState.todos, todo],
      todos: [...prevState.todos, todo],
    }));
  };

  changeFilter = ({ target }) => {
    const filter = target.getAttribute('href').slice(2) || '';

    this.setState({
      isTabActive: filter,
    });
    this.filteredTodos();
  };

  filteredTodos = () => {
    this.setState((prevState) => {
      if (prevState.isTabActive === 'active') {
        return ({
          todos: [...prevState.originTodos].filter(elem => !elem.completed),
        });
      }

      if (prevState.isTabActive === 'completed') {
        return ({
          todos: [...prevState.originTodos].filter(elem => elem.completed),
        });
      }

      if (!prevState.isTabActive) {
        return ({
          todos: [...prevState.originTodos],
        });
      }
    });
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

    if (this.state.isTabActive === 'active') {
      this.filteredTodos();
    }

    if (this.state.isTabActive === 'completed') {
      this.filteredTodos();
    }
  };

  handleAllCompleted = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.every(item => item.completed)
        || prevState.todos.every(item => !item.completed)
          ? prevState.todos.map((elem, i) => Object.assign(elem, { completed: !prevState.todos[i].completed }))
          : prevState.todos.map(elem => Object.assign(elem, { completed: true })),
    }));
  };

  render() {
    const { todos, originTodos, isTabActive } = this.state;

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
            filteredTodos={this.changeFilter}
            handleClearCompleted={this.handleClearCompleted}
            isTabActive={isTabActive}
          />
        )}
      </section>
    );
  }
}

export default App;
