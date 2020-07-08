import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { TodoItems } from '../TodoItems/TodoItems';
import { Footer } from '../Footer/Footer';

export class TodoApp extends Component {
  state = {
    todosList: this.props.todosList,
  }

  onAddTodo = (todo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo],
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          onAddTodo={this.onAddTodo}
        />

        <TodoItems
          todosList={this.state.todosList}
        />

        <Footer />
      </section>
    );
  }
}

TodoApp.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
