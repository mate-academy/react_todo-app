import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Footer } from './components/Footer';

const filters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class App extends React.Component {
  state = {
    todos: [],
    completed: false,
    filter: filters.all,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  checkSingleTodo = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.map(item => (
        item.id === todoId
          ? {
            ...item, completed: !item.completed,
          } : item)),
    }));

    this.setState(({ todos }) => (
      { completed: todos.every(item => item.completed) }
    ));
  };

  checkAllTodos = () => {
    this.setState(({ todos, completed }) => ({
      completed: !completed,
      todos: todos
        .map(item => ({
          ...item, completed: !completed,
        })),
    }));
  };

  deleteTodo = (todoId) => {
    this.setState(({ todos }) => (
      { todos: todos.filter(item => item.id !== todoId) }
    ));
  };

  clearCompletedTodos = () => {
    this.setState(({ todos }) => (
      { todos: todos.filter(item => !(item.completed)) }
    ));
  };

  setFilter = (filter) => {
    this.setState({ filter: filters[filter] });
  };

  render() {
    const { todos, completed, filter } = this.state;

    const filteredTodos = (filterType) => {
      switch (filterType) {
        case 'active':
          return todos.filter(todo => !todo.completed);
        case 'completed':
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    };

    const visibleTodos = filteredTodos(filter);

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <Main
          todos={visibleTodos}
          completed={completed}
          onCheck={this.checkSingleTodo}
          onDelete={this.deleteTodo}
          checkAll={this.checkAllTodos}
          todosLength={todos.length}
        />
        {todos.length > 0 && (
          <Footer
            todos={todos}
            currentFilter={filter}
            setFilter={this.setFilter}
            onClear={this.clearCompletedTodos}
          />
        )}
      </section>
    );
  }
}

export default App;
