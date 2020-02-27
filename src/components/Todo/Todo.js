import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';

export class Todo extends Component {
  state = {
    isEditing: false,
    editingTodoTitle: this.props.todo.title,
  }

  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  }

  stopEditHandler = () => {
    this.setState({
      isEditing: false,
    });
  }

  editTodoHandler = ({ target }) => {
    this.setState({
      editingTodoTitle: target.value,
    });
  }

  submitEditHandler = () => {
    const { editTodo, todo: { id }, removeTodo } = this.props;
    const { editingTodoTitle } = this.state;

    this.setState({
      isEditing: false,
    });

    if (editingTodoTitle !== '') {
      editTodo(editingTodoTitle, id);
    } else {
      removeTodo(id);
    }
  }

  render() {
    const {
      todo: { title, id, completed },
      setCompleted,
      removeTodo,
    } = this.props;

    const { isEditing, editingTodoTitle } = this.state;

    return (
      <li className={cx({
        completed,
        editing: isEditing,
      })}
      >
        {!isEditing
          ? (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={id}
                onChange={() => setCompleted(id)}
                checked={completed}
              />
              <label
                htmlFor={id}
                onDoubleClick={this.handleDoubleClick}
              >
                {title}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => removeTodo(id)}
              />
            </div>
          )
          : (
            <form onSubmit={this.submitEditHandler}>
              <input
                type="text"
                className="edit"
                value={editingTodoTitle}
                onBlur={this.stopEditHandler}
                onChange={event => this.editTodoHandler(event)}
              />
            </form>
          )
        }
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,

  setCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
