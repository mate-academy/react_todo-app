/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  render() {
    const {
      itemId,
      title,
      completed,
      statusToggle,
      deleteTodo,
    } = this.props;

    return (
      <li
        className={classNames({ completed })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            id={`todo-${itemId}`}
            onChange={() => statusToggle(itemId)}
          />
          <label>
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(itemId)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  statusToggle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
