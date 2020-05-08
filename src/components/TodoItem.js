/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state = {
    editing: false,
  };

  handleTitleEditing = ({ target, key, type }) => {
    const { value } = target;
    const { itemId, editTodo, deleteTodo } = this.props;

    if ((key === 'Enter' || type === 'blur') && value.trim()) {
      editTodo(itemId, value);
      this.setEditingMode(false);
    }

    if (type === 'blur' && !value.trim()) {
      deleteTodo(itemId);
      this.setEditingMode(false);
    }

    if (key === 'Escape') {
      this.setEditingMode(false);
    }
  }

  setEditingMode = (bool) => {
    this.setState({ editing: bool });
  }

  render() {
    const { itemId, title, completed, statusToggle, deleteTodo } = this.props;
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
            id={`todo-${itemId}`}
            onChange={() => statusToggle(itemId)}
          />
          <label
            onDoubleClick={() => this.setEditingMode(true)}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(itemId)}
          />
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
            autoFocus
            defaultValue={title}
            onBlur={this.handleTitleEditing}
            onKeyDown={this.handleTitleEditing}
          />
        )}
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
  editTodo: PropTypes.func.isRequired,
};
