import React from 'react';

import FormInput from './components/header/FormInput';
import TodoItem from './components/main/TodoItem';
import Footer from './components/footer/Footer';

const todosListArr = [
  {
    id: 1,
    title: 'NewTodo',
    status: false,
  },
];

class App extends React.Component {
  state = {
    todos: [...todosListArr],
    // eslint-disable-next-line react/no-unused-state
    visibleTodos: [...todosListArr],
    activeLink: 'all',
    itemsMany: true,
    // eslint-disable-next-line react/no-unused-state
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
    this.setState(({ todos, toggleActive }) => ({
      // eslint-disable-next-line react/no-unused-state
      toggleActive: !toggleActive,
      todos: todos
        .map(todo => ({
          ...todo, status: !toggleActive,
        })),
    }));
  };

  filterTodosAll = () => {
    this.setState(({ todos, showingTodos }) => ({
      activeLink: 'all',
      todos: [...todos],
    }));
  };

  filterTodosActive = () => {
    this.setState(({ todos }) => ({
      activeLink: 'active',
      todos: todos
        .filter(todo => (todo.status === false)),
    }));
  };

  filterTodosCompleted = () => {
    this.setState(({ todos, showingTodos }) => ({
      // eslint-disable-next-line react/no-unused-state
      showingTodos: [...todos],
      activeLink: 'completed',
      todos: todos
        .filter(todo => (todo.status === true)),
    }));
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
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
            onClick={() => this.handleToggleAll()}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            <TodoItem
              todos={this.state.todos}
              changeStatus={this.changeStatus}
              deleteTodo={this.deleteTodo}
            />
          </ul>
        </section>

        {!!this.state.todos.length
        && (
          <Footer
            todos={this.state.todos}
            itemsMany={this.state.itemsMany}
            activeLink={this.state.activeLink}
            filterTodosAll={this.filterTodosAll}
            filterTodosActive={this.filterTodosActive}
            filterTodosCompleted={this.filterTodosCompleted}
            clearCompleted={this.clearCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
