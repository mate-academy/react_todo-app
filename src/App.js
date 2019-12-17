import React, { Component } from 'react';
import Header from './components/Header/Haeder';
import Switcher from './components/Toogler/Switcher';
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
    currentFilter: 'All',
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

  showDoneInFooter = () => this.state.todos.filter(todo => todo.done).length;

  topToggle = (statusChecked) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        done: statusChecked,
      })),
    }));
  };

  setStateByEvenTargetValue = (e) => {
    switch (e.target.textContent) {
      case 'Clear completed':
        this.setState(state => ({
          todos: state.todos.filter(todo => !todo.done),
        }));
        break;
      case 'Active':
        this.setState({
          currentFilter: 'Active',
        });
        break;
      case 'Completed':
        this.setState({
          currentFilter: 'Completed',
        });
        break;
      case 'All':
        this.setState({
          currentFilter: 'All',
        });
        break;

      default:
    }
  };

  render() {
    const { todos, currentFilter } = this.state;

    const renderTodos = () => {
      switch (currentFilter) {
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
          todos={todos}
          setStateByEvenTargetValue={this.setStateByEvenTargetValue}
          TodosDone={this.showDoneInFooter}
        />

      </section>
    );
  }
}
