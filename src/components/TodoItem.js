import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export class TodoItem extends React.Component {
  state = {
    isEditing: false,
    editedTitle: this.props.todoTitle,
  }

  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  }

  handleChangeEdit = () => {
    this.setState({
      isEditing: false,
    });
  }

  onEditChange = ({ target: { value } }) => {
    this.setState({
      editedTitle: value,
    });
  }

  handleEditSubmit = () => {
    const {
      handleDoubleClickEditTitle,
      todoId,
      handleDeleteTodo,
    } = this.props;
    const { editedTitle } = this.state;

    this.setState({
      isEditing: false,
    });

    if (editedTitle !== '') {
      handleDoubleClickEditTitle(editedTitle, todoId);
    } else {
      handleDeleteTodo(todoId);
    }
  }

  render() {
    const {
      todoTitle,
      todoStatus,
      todoId,
      handleTodoStatus,
      handleDeleteTodo,
    } = this.props;
    const { editedTitle } = this.state;
    const liClassName = cx({
      editing: this.state.isEditing,
      completed: todoStatus,
    });

    return (
      <li className={liClassName}>
        { !this.state.isEditing
          ? (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={todoId}
                checked={todoStatus}
                onChange={() => handleTodoStatus(todoId)}
              />
              <p
                className="label"
                onDoubleClick={this.handleDoubleClick}
                htmlFor={todoId}
              >
                {todoTitle}
              </p>
              <button
                type="button"
                className="destroy"
                onClick={() => handleDeleteTodo(todoId)}
              />
            </div>
          )
          : (
            <form
              onSubmit={this.handleEditSubmit}
            >
              <input
                type="text"
                className="edit"
                value={editedTitle}
                onChange={this.onEditChange}
                onBlur={this.handleChangeEdit}
              />
            </form>
          )
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  todoStatus: PropTypes.bool.isRequired,
  todoId: PropTypes.string.isRequired,
  handleTodoStatus: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleDoubleClickEditTitle: PropTypes.func.isRequired,
};
