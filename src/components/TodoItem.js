import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

class TodoItem extends React.Component {
  state = {}

  render() {
    const { task, toggleCompleteTask, deleteTask } = this.props;

    return (
      <li
        key={task.id}
        className={classnames({ completed: task.completed })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={task.completed}
            id={task.id}
            onClick={() => toggleCompleteTask(task.id)}
          />
          <label>{task.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}

TodoItem.propTypes = {
  task: propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  toggleCompleteTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoItem;
