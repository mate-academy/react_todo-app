/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Todo extends React.Component {
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
      completed,
      todo,
      remove,
      toggleComplete,
    } = this.props;

    const { isEditing, newTitle } = this.state;

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
            checked={todo.completed}
            onClick={() => {
              toggleComplete(id);
            }}
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
          />
          <label
            onDoubleClick={() => this.setState({
              isEditing: true,
              newTitle: todo.content,
            })}
          >
            {todo.content}
          </label>
          <button
            onClick={() => {
              remove(id);
            }}
            type="button"
            className="destroy"
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

Todo.propTypes = {
  todo: PropTypes.objectOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  setNewTitle: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default Todo;
