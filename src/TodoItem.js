import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoItem extends React.PureComponent {
  render() {
    const { todo, completed, deleteItem } = this.props;

    return (
      <li
        className={classNames({ completed: todo.completed })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={() => completed(todo.id)}
            checked={todo.completed}
          />
          <label
            htmlFor={todo.id}
          >
            {todo.title}
          </label>
          <button
            type="button"
            id={todo.id}
            className="destroy"
            onClick={() => deleteItem(todo.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

export default TodoItem;

TodoItem.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    edited: PropTypes.bool,
  }).isRequired,
};
