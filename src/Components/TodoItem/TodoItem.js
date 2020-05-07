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
    const { todo, allTasksSelected, handleTaskRemover } = this.props;
    const { isFinished } = this.state;

    return (
      <li className={cn({
        completed: isFinished || allTasksSelected,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
            checked={isFinished || allTasksSelected}
            onChange={this.taskStatusHandler}
          />
          <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
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
  }).isRequired,
  allTasksSelected: PropTypes.bool.isRequired,
  handleTaskRemover: PropTypes.func.isRequired,
};

export default TodoItem;
