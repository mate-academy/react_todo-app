import React from 'react';

import FormInput from './components/header/FormInput';
import TodoItem from './components/main/TodoItem';
import Footer from './components/footer/Footer';
import ItemsLeft from './components/footer/ItemsLeft';
import ClearCompleted from './components/footer/ClearCompleted';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

class App extends React.Component {
  state = {
    todos: [],
    filter: FILTERS.all,

    itemsMany: true,
    toggleActive: false,
  };

  addTodo = (title) => {
    this.setState((state) => {
      const inputedTodo = {
        id: +new Date(),
        title,
        status: false,
      };

      return {
        todos: [...state.todos, inputedTodo],
      };
    });
  };

  handleToggleAll = () => {
    this.setState(prevState => ({
      toggleActive: !prevState.toggleActive,
      todos: prevState.todos
        .map(todo => ({
          ...todo, status: !prevState.toggleActive,
        })),
    }));
  };

  setFilter = (type) => {
    this.setState(() => ({ filter: FILTERS[type] }));
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      toggleActive: false,
      todos: todos
        .filter(todo => (todo.status === false)),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }),);
  };

  changeStatus = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          status: !todo.status,
        };
      }),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <FormInput
            addTodo={this.addTodo}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.toggleActive}
            onClick={() => this.handleToggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoItem
              todos={this.state.todos}
              filter={this.state.filter}
              changeStatus={this.changeStatus}
              deleteTodo={this.deleteTodo}
            />
          </ul>
        </section>

        {!!this.state.todos.length
        && (
          <footer className="footer" styFormInputle={{ display: 'block' }}>
            <ItemsLeft
              todos={this.state.todos}
              itemsMany={this.state.itemsMany}
            />
            <Footer
              filter={this.state.filter}
              setFilter={this.setFilter}
            />
            <ClearCompleted
              todos={this.state.todos}
              clearCompleted={this.clearCompleted}
            />
          </footer>
        )}
      </section>
    );
  }
}

export default App;
