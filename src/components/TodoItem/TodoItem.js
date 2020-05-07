/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends Component {
  state = {
    isEditing: false,
    newTitle: '',
  }

  handleEditing = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  }

  handleEditingBlur = (e) => {
    const {
      id,
      setNewTitle,
    } = this.props;
    const newTitle = e.target.value;

    setNewTitle(id, newTitle);
    this.setState({ isEditing: false });
  }

  handleEditingKeyDown = (e) => {
    const {
      id,
      setNewTitle,
    } = this.props;

    const newTitle = e.target.value;

    if (e.key === 'Enter') {
      if (newTitle.trim().length === 0) {
        this.setState({ isEditing: false });

        return;
      }

      setNewTitle(id, newTitle);
      this.setState({ isEditing: false });
    }

    if (e.key === 'Escape') {
      this.setState({ isEditing: false });
    }
  }

  render() {
    const {
      id,
      title,
      completed,
      handleCompleteToggle,
      handleDeleteTodo,
    } = this.props;

    const {
      isEditing,
      newTitle,
    } = this.state;

    return (
      <li className={
        classNames({
          completed,
          editing: isEditing,
        })
      }
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => handleCompleteToggle(id)}
            checked={completed}
          />
          <label
            htmlFor={`todo-${id}`}
            onDoubleClick={() => this.setState({
              isEditing: true,
              newTitle: title,
            })}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleDeleteTodo(id)}
          />
        </div>
        {isEditing && (
          <input
            type="text"
            className="edit"
            value={newTitle}
            onBlur={this.handleEditingBlur}
            onChange={this.handleEditing}
            onKeyDown={this.handleEditingKeyDown}
            autoFocus
          />
        )}

      </li>
    );
  }
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  handleCompleteToggle: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
