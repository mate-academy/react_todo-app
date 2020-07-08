import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoList extends Component {
  state = {}

  render() {
    const { todosList } = this.props;

    return (
      <ul className="todo-list">
        {todosList.map(todo => (
          <li key={todo.id}>
            <div className="view">
              <input type="checkbox" className="toggle" id="todo-1" />
              <label htmlFor="todo-1">{todo.title}</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
