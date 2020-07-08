import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';

export class TodoItems extends Component {
  state = {}

  render() {
    const { todosList } = this.props;

    return (
      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todosList={todosList} />

      </section>
    );
  }
}

TodoItems.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
