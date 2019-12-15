import React, { Component } from 'react';
import Header from './components/Header/Haeder';
import Toogler from './components/Toogler/Toogler';
import TodoList from './components/Todolist/TodoList';
import Footer from './components/Footer/Footer';

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
    curentFilter: 'All',

  };

  addTodo = (label) => {
    this.setState((state) => {
      const todo = App.createTodo(label);

      return {
        todos: [...state.todos, todo],
      };
    });
  };

  setDoneStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
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
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  };

  showDone = () => this.state.todos.filter(todo => todo.done).length;

  setStateByEtargetValue = (e) => {
    if (e.target.value === 'toggle-all') {
      if (this.state.todos.some(todo => todo.done)) {
        this.setState(state => ({
          todos: state.todos.map(todo => ({
            ...todo,
            done: false,
          })),
        }));
      }

      if (this.state.todos.some(todo => !todo.done)) {
        this.setState(state => ({
          todos: state.todos.map(todo => ({
            ...todo,
            done: true,
          })),
        }));
      }
    }

    if (e.target.textContent === 'Clear completed') {
      this.setState(state => ({
        todos: state.todos.filter(todo => !todo.done),
      }));
    }

    this.setState({
      curentFilter: e.target.textContent,
    });
  };

  render() {
    const { todos, curentFilter } = this.state;
    const renderTodos = () => {
      switch (curentFilter) {
        case 'Active':
          return todos.filter(todo => !todo.done);
        case 'Completed':
          return todos.filter(todo => todo.done);
        default:
          return [...todos];
      }
    };

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Header addTodo={this.addTodo} />
        </header>

        <section className="main">

          <Toogler
            todos={renderTodos()}
            setStateByEtargetValue={this.setStateByEtargetValue}
          />

          <TodoList
            todos={renderTodos()}
            setDoneStatus={this.setDoneStatus}
            destroyTodo={this.destroyTodo}
          />

        </section>

        <Footer
          todos={todos}
          setStateByEtargetValue={this.setStateByEtargetValue}
          TodosDone={this.showDone}
        />

      </section>
    );
  }
}
