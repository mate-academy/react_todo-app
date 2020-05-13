import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends React.Component {
  state = {
    editing: false,
  };

  handleTitleEditing = ({ target, key, type }) => {
    const { itemId, onEditTodo, deleteTodo } = this.props;
    const value = target.value.trim();
    const acceptEditing = (key === 'Enter' || type === 'blur');

    if (acceptEditing && value) {
      onEditTodo(itemId, value);
      this.setEditingMode(false);
    }

    if (acceptEditing && !value) {
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
          <label
            htmlFor={id}
            onDoubleClick={() => this.setEditingMode(true)}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTodo(id)}
          />
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
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
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  itemId: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};

export default TodoItem;
