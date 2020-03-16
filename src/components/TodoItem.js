import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class TodoItem extends React.Component {
  state = {
    isEditing: false,
    todoTitle: this.props.todoTitle,
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
      todoTitle: value,
    });
  }

  handleEditSubmit = () => {
    const {
      handleDoubleClick,
      todoId,
      handleDeleteTodo,
    } = this.props;
    const { todoTitle } = this.state;

    this.setState({
      isEditing: false,
    });

    if (todoTitle !== '') {
      handleDoubleClick(todoTitle, todoId);
    } else {
      handleDeleteTodo(todoId);
    }
  }

  render() {
    const {
      todoStatus,
      todoId,
      handleTodoStatus,
      handleDeleteTodo,
    } = this.props;
    const { todoTitle } = this.state;
    const liClassName = cn({
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
                value={todoTitle}
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
  handleDoubleClick: PropTypes.func.isRequired,
};
