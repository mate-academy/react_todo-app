import React, { Component } from 'react';
import './index.css';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

class App extends Component {
  state = {
    filter: 'all',
    items: [{
      text: 'sample todo',
      id: 1,
      completed: true,
    }],
    title: '',
  };

  handleChange = ({ target }) => {
    const title = target.value;

    this.setState({
      title,
    });
  }

  handleAddTodo = (newTodo) => {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        newTodo,
      ],
    }));
  }

  handleToggleTodo = (todoId) => {
    this.setState(prevState => ({
      items: prevState.items.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  }

  handleRemoveTodo = (todoId) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== todoId),
    }));
  }

  handleEditTodo = (index, text) => {
    this.setState(prevState => ({
      items: prevState.items.map((item, ind) => {
        if (ind === index) {
          return {
            ...item,
            text,
          };
        }

        return item;
      }),
    }));
  }

  handleToggleTab = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      items: prevState.items.filter(({ completed }) => completed),
    }));
  }

  handleToggleAll = (event) => {
    const completed = event.target.checked;

    this.setState(prevState => ({
      items: prevState.items.map(item => ({
        ...item,
        completed: !completed,
      })),
    }));
  }

  render() {
    const { filter, items, title } = this.state;

    let todos = items;

    if (filter === 'completed') {
      todos = items.filter(({ completed }) => !completed);
    } else if (filter === 'active') {
      todos = items.filter(({ completed }) => completed);
    }

    return (
      <section className="todoapp">
        <TodoHeader
          handleAddTodo={this.handleAddTodo}
          inputValue={title}
        />
        <section className="main">
          <TodoList
            todos={todos}
            handleEditTodo={this.handleEditTodo}
            handleToggleAll={this.handleToggleAll}
            handleToggleTodo={this.handleToggleTodo}
            handleRemoveTodo={this.handleRemoveTodo}
          />
        </section>
        <TodoFooter
          filter={filter}
          todos={items}
          counts={items.filter(({ completed }) => completed).length}
          handleToggleTab={this.handleToggleTab}
          handleClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
