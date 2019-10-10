import React from 'react';
import cx from 'classnames';
import { TodoItemProps } from '../PropTypes/PropTypes';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    editedFilmTitle: this.props.todoTitle,
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

  onEditChange = ({ target }) => {
    this.setState({
      editedFilmTitle: target.value,
    });
  }

  handleEditSubmit = () => {
    const {
      handleDoubleClickEditTitle,
      todoId,
      handleDeleteTodo,
    } = this.props;
    const { editedFilmTitle } = this.state;

    this.setState({
      isEditing: false,
    });
    if (editedFilmTitle !== '') {
      handleDoubleClickEditTitle(editedFilmTitle, todoId);
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
    const { editedFilmTitle } = this.state;
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
                value={editedFilmTitle}
                onChange={e => this.onEditChange(e)}
                onBlur={this.handleChangeEdit}
                autoFocus
              />
            </form>
          )
        }
      </li>
    );
  }
}

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
