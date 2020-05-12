import React from 'react';
import propTypes from 'prop-types';
import TodoItem from '../TaskItem/TaskItem';

class TodoList extends React.Component {
  state = {

  }

  render() {
    const { tasks, changeCondition, deleteTask } = this.props;

    return (
      <ul className="todo-list">
        {tasks.map(task => (
          <TodoItem
            task={task}
            changeCondition={changeCondition}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  changeCondition: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoList;
