import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  handleTodoStatus = () => {
    this.props.changeStatusTodo(this.props.todo.id);
  };

  handleDelete = (todoId) => {
    this.props.deleteTodo(todoId);
  };

  render() {
    const { todo } = this.props;
    const { id, title, completed } = todo;

    return (
      <li
        className={completed ? 'completed' : ''}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={this.handleTodoStatus}
            id={id}
          />
          <label
            htmlFor="label"
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => this.handleDelete(id)}
          />
        </div>
      </li>
    );
  }
}

export const todoTypes = {
  id: PropTypes.number,
  completed: PropTypes.bool,
  title: PropTypes.string,
};

Todo.propTypes = {
  todo: PropTypes.shape(todoTypes).isRequired,
  changeStatusTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
