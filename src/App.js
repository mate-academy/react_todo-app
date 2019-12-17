import React from 'react';

import FormInput from './components/header/FormInput';
import TodoList from './components/main/TodoList';
import Footer from './components/footer/Footer';
import ItemsLeft from './components/footer/ItemsLeft';
import ClearCompleted from './components/footer/ClearCompleted';

const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

class App extends React.Component {
  state = {
    todos: [],
    filter: FILTERS.all,
    toggleActive: false,
  };

  addTodo = (title) => {
    this.setState((state) => {
      const inputedTodo = {
        id: +new Date(),
        title,
        completed: false,
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
          ...todo, completed: !prevState.toggleActive,
        })),
    }));
  };

  setFilter = (type) => {
    this.setState(() => ({ filter: type }));
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      toggleActive: false,
      todos: todos
        .filter(todo => (!todo.completed)),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }),);
  };

  changeCompleted = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
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

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.toggleActive}
            onClick={() => this.handleToggleAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoList
              todos={this.state.todos}
              filter={this.state.filter}
              changeCompleted={this.changeCompleted}
              deleteTodo={this.deleteTodo}
            />
          </ul>
        </section>

        {!!this.state.todos.length
        && (
          <footer className="footer" styFormInputle={{ display: 'block' }}>
            <ItemsLeft
              todosLeft={this.state.todos
                .filter(todo => !todo.completed).length}
            />
            <Footer
              filter={FILTERS}
              setFilter={this.setFilter}
            />
            <ClearCompleted
              couldClear={this.state.todos.some(todo => todo.completed)}
              clearCompleted={this.clearCompleted}
            />
          </footer>
        )}
      </section>
    );
  }
}

export default App;
