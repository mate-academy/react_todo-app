import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';

export class TodoItems extends Component {
  state = {}

  render() {
    const {
      todosList,
      onChangeCompleted,
      onDeleteTodo,
      onDoneAllTodo,
    } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={onDoneAllTodo}
        />
        <label
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>

        <TodoList
          todosList={todosList}
          onChangeCompleted={onChangeCompleted}
          onDeleteTodo={onDeleteTodo}
        />

      </section>
    );
  }
}

TodoItems.propTypes = {
  onChangeCompleted: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onDoneAllTodo: PropTypes.func.isRequired,
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
