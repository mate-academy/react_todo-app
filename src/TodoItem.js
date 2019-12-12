import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  handleTodoStatus = (event) => {
    this.props.changeTodoStatus(this.props.todo.id, event.target.checked);
  };

  handleClick = (todoId) => {
    this.props.deleteTodo(todoId);
  };

  render() {
    const { todo } = this.props;
    const { id, title, completed } = todo;

    return (
      <li key={id} className={completed && 'completed'}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={this.handleTodoStatus}
          />
          <label htmlFor="label">{title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => this.handleClick(id)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
