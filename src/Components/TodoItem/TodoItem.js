import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodoItem extends React.Component {
  state = {
    isFinished: false,
  }

  taskStatusHandler = () => {
    this.setState(prev => ({
      isFinished: !prev.isFinished,
    }));
  }

  render() {
    const { todo, statusHandler, handleTaskRemover } = this.props;
    const { isFinished } = this.state;

    return (
      <li className={cn({ completed: todo.completed })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
            checked={isFinished || todo.completed}
            onChange={() => {
              this.taskStatusHandler();
              statusHandler(todo.id);
            }}
          />
          <label
            htmlFor={`todo-${todo.id}`}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleTaskRemover(todo.id)}
          />
        </div>
        <input type="text" className="edit" />
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
  handleTaskRemover: PropTypes.func.isRequired,
  statusHandler: PropTypes.func.isRequired,
};

export default TodoItem;
