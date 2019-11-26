import React, { Component } from 'react';
import AppFooter from '../AppFooter/AppFooter';
import TodoList from '../TodoList/TodoList';
import NewTodo from '../NewTodo/NewTodo';
import ToggleAll from '../ToggeleAll/ToggeleAll';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentId: 1,
      filterType: 'All',
    };
  }

  componentDidMount() {
    const storageToDoList = JSON.parse(localStorage.getItem('todos')) || [];
    const storageId = localStorage.getItem('currentId');

    this.setState(prevState => ({
      ...prevState,
      todos: [...storageToDoList],
      currentId: +storageId,
    }));
  }

  componentDidUpdate() {
    const toDoListToStorage = JSON.stringify(this.state.todos);

    localStorage.setItem('todos', toDoListToStorage);
    localStorage.setItem('currentId', this.state.currentId);
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
          const newItem = { ...item };

          if (item.id === itemId) {
            newItem.completed = !newItem.completed;
          }

          return newItem;
        }),
      }
    ));
  };

  handleToggleAll = (flag) => {
    this.setState(prevState => (
      {
        todos: prevState.todos.map((item) => {
          const newItem = { ...item };

          newItem.completed = !flag;

          return newItem;
        }),
      }
    ));
  };

  handleClear = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(element => !element.completed),
    }));
  };

  onFilterChange = (filterType) => {
    this.setState({ filterType });
  };

  filter = (items, filterType) => {
    switch (filterType) {
      case 'All':
        return items;
      case 'Active':
        return items.filter(item => !item.completed);
      case 'Completed':
        return items.filter(item => item.completed);
      default:
        return items;
    }
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
            items={this.filter(this.state.todos, this.state.filterType)}
            handleDestroy={this.handleDestroy}
            handleChecked={this.handleChecked}
          />
        </section>

        <AppFooter
          items={this.state.todos}
          handleClear={this.handleClear}
          onFilterChange={this.onFilterChange}
          filterState={this.state.filterType}
        />
      </section>
    );
  }
}

export default TodoApp;
