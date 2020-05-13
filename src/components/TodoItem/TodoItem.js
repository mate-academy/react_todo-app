import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends React.Component {
  state = {
    editing: false,
  };

  render() {
    const { todo, deleteTodo, changeStatus } = this.props;
    const { id, title, completed } = todo;
    const { editing } = this.state;

    return (
      <li
        className={classNames({
          completed,
          editing,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            id={id}
            onClick={() => changeStatus(id)}
          />
          <label htmlFor={id}>{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default TodoItem;
