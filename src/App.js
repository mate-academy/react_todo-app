import React, { Component } from 'react';
import Header from './components/Header/Haeder';
import Switcher from './components/Toogler/Switcher';
import TodoList from './components/Todolist/TodoList';
import Footer from './components/Footer/Footer';

const FILTER_TYPES = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',

};

export default class App extends Component {
  static createTodo(label) {
    return {
      id: new Date().getTime(),
      label,
      done: false,
    };
  }

  state = {
    todos: [],
    currentFilter: FILTER_TYPES.all,

  };

  addTodo = (label) => {
    this.setState((prevState) => {
      const todo = App.createTodo(label);

      return {
        todos: [...prevState.todos, todo],
      };
    });
  };

  setDoneStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      }),
    }));
  };

  destroyTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  ActiveTodoCounter = () => this.state.todos.filter(todo => todo.done).length;

  topToggle = () => {
    if (this.state.todos.some(todo => todo.done)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          done: false,
        })),
      }));
    }

    if (this.state.todos.some(todo => !todo.done)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          done: true,
        })),
      }));
    }
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.done),
    }));
  };

  setFilters = (item) => {
    switch (item) {
      case FILTER_TYPES.all:
        this.setState({
          currentFilter: FILTER_TYPES.all,
        });
        break;
      case FILTER_TYPES.active:
        this.setState({
          currentFilter: FILTER_TYPES.active,
        });
        break;
      case FILTER_TYPES.completed:
        this.setState({
          currentFilter: FILTER_TYPES.completed,
        });
        break;

      default:
    }
  };

  render() {
    const { todos, currentFilter } = this.state;

    const renderTodos = () => {
      switch (currentFilter) {
        case FILTER_TYPES.active:

          return todos.filter(todo => !todo.done);
        case FILTER_TYPES.completed:

          return todos.filter(todo => todo.done);

        default:
          return todos;
      }
    };

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Header addTodo={this.addTodo} />
        </header>

        <section className="main">

          <Switcher
            todos={todos}
            topToggle={this.topToggle}
          />

          <TodoList
            todos={renderTodos()}
            setDoneStatus={this.setDoneStatus}
            destroyTodo={this.destroyTodo}
          />

        </section>

        <Footer
          clearCompleted={this.clearCompleted}
          length={todos.length}
          filterTypes={FILTER_TYPES}
          setFilters={this.setFilters}
          TodosDone={this.ActiveTodoCounter}
        />

      </section>
    );
  }
}
