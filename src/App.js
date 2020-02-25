import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './index.css';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

class App extends Component {
  state = {
    filter: 'all',
    items: [{
      text: 'sample todo',
      id: uuid(),
      completed: 1,
    }],
    title: '',
  };

  handleChange = ({ target }) => {
    const title = target.value;

    this.setState({
      title,
    });
  }

  handleAddTodo = (event) => {
    const { value } = event.target;

    if (event.keyCode !== 13 || value.trim() === '') {
      return;
    }

    const item = {
      text: value,
      completed: 1,
      id: uuid(),
    };

    this.setState(prevState => ({
      items: [...prevState.items, item],
      title: '',
    }));
  }

  handleToggleTodo = (index) => {
    const { items } = this.state;

    items[index].completed = items[index].completed ? 0 : 1;
    this.setState({ items });
  }

  handleRemoveTodo = (index) => {
    const { items } = this.state;

    items.splice(index, 1);
    this.setState({ items });
  }

  handleEditTodo = (index, text) => {
    const { items } = this.state;

    items[index].text = text;
    this.setState({ items });
  }

  handleToggleTab = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    const items = this.state.items.filter(({ completed }) => completed);

    this.setState({ items: [...items] });
  }

  handleToggleAll = (event) => {
    const completed = event.target.checked;

    this.setState(prevState => ({
      items: prevState.items.map(item => ({
        ...item,
        completed: +(!completed),
      })),
    }));
  }

  render() {
    const { filter, items, title } = this.state;

    return (
      <section className="todoapp">
        <TodoHeader
          handleAddTodo={this.handleAddTodo}
          handleChange={this.handleChange}
          inputValue={title}
        />
        <section className="main">
          <TodoList
            filter={filter}
            todos={items}
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
