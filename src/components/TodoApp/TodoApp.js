import React, { Component } from 'react';
import AppFooter from '../AppFooter/AppFooter';
import TodoList from '../TodoList/TodoList';
import NewTodo from '../NewTodo/NewTodo';
import ToggleAll from '../ToggleAll/ToggleAll';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentId: 1,
    };
  }

  handleSubmit = (text) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.currentId,
          body: text,
          completed: false,
        },
      ],
      currentId: prevState.currentId + 1,
    }
    ));
  };

  handleDestroy = (event) => {
    const itemId = +event.target.dataset.buttonId;

    this.setState(prevState => ({
      todos: prevState.todos.filter(element => element.id !== itemId),
    }));
  };

  handleChecked = (event) => {
    const itemId = +event.target.id;

    this.setState(prevState => (
      {
        todos: prevState.todos.map((item) => {
          if (item.id === itemId) {
            // eslint-disable-next-line no-param-reassign
            item.completed = !item.completed;
          }

          return item;
        }),
      }
    ));
  };

  handleToggleAll = (flag) => {
    this.setState(prevState => (
      {
        todos: prevState.todos.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.completed = !flag;

          return item;
        }),
      }
    ));
  };

  handleClear = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(element => !element.completed),
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo handleSubmit={this.handleSubmit} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <ToggleAll handleToggleAll={this.handleToggleAll} />
          <TodoList
            items={this.state.todos}
            handleDestroy={this.handleDestroy}
            handleChecked={this.handleChecked}
          />
        </section>

        <AppFooter
          items={this.state.todos}
          handleClear={this.handleClear}
        />
      </section>
    );
  }
}

export default TodoApp;
