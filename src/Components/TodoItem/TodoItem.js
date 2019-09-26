import React from 'react';
import cx from 'classnames';
import { TodoItemProps } from '../PropTypes/PropTypes';

class TodoItem extends React.Component {
  // state = {
  //   isEditing: false,
  // }

  // handleDoubleClick = () => {
  //   this.setState({
  //     isEditing: true,
  //   });
  // }

  render() {
    const {
      todoTitle, todoStatus, todoId, handleTodoStatus, handleDeleteTodo,
    } = this.props;
    const liClassName = cx({
      // editing: this.state.isEditing,
      completed: todoStatus,
    });

    return (
      <li className={liClassName}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todoId}
            checked={todoStatus}
            onChange={() => handleTodoStatus(todoId)}
          />
          <label
            // onDoubleClick={this.handleDoubleClick}
            htmlFor={todoId}
          >
            {todoTitle}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleDeleteTodo(todoId)}
          />
        </div>
        {/* <form
          onSubmit={event => handleDoubleClickEditTitle(event, todoId)}
        >
          <input type="text" className="edit" />
        </form> */}
      </li>
    );
  }
}

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
